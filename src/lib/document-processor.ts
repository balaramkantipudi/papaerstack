import { supabaseAdmin } from './supabase'
import { processDocumentWithAzure } from './azure-document-intelligence'
import { enhancedConstructionClassification } from './openai-classification'
import { VendorRecognitionEngine } from './vendor-recognition'
import { CacheManager } from './cache-manager'

export async function finalEnhancedDocumentProcessingPipeline(documentId: string) {
  console.log(`Starting final enhanced processing for document ${documentId}`)
  
  const cache = CacheManager.getInstance()
  const startTime = Date.now()
  
  try {
    // 1. Update status and record start time
    await updateDocumentStatus(documentId, 'processing')

    // 2. Get document with organization context
    const { data: document, error: docError } = await supabaseAdmin
      .from('documents')
      .select(`
        *,
        organization:organizations(
          id,
          name,
          projects(id, name, description)
        )
      `)
      .eq('id', documentId)
      .single()

    if (docError || !document) {
      throw new Error('Document not found')
    }

    // 3. Check if we've already processed a similar document recently
    const processingKey = `processing_${document.organization_id}_${document.original_filename}`
    const cachedProcessing = cache.get(processingKey)
    
    // 4. Download and process with Azure
    console.log('Downloading document...')
    const { data: fileData, error: downloadError } = await supabaseAdmin.storage
      .from('original-documents')
      .download(document.storage_path)

    if (downloadError || !fileData) {
      throw new Error('Failed to download document')
    }

    const buffer = Buffer.from(await fileData.arrayBuffer())

    // 5. Azure OCR Processing (with retry logic)
    console.log('Processing with Azure Document Intelligence...')
    const extractedData = await processDocumentWithRetry(buffer, document.document_type)

    // 6. Enhanced vendor recognition
    console.log('Recognizing vendor...')
    const vendorMatch = await VendorRecognitionEngine.recognizeVendor(
      document.organization_id,
      extractedData.vendor_name || '',
      extractedData
    )

    let vendorId = vendorMatch.vendor_id

    // Create vendor if it's a new one with high confidence
    if (!vendorId && vendorMatch.confidence > 0.8) {
      vendorId = await VendorRecognitionEngine.createVendorFromExtraction(
        document.organization_id,
        document.uploaded_by,
        vendorMatch,
        extractedData
      )
    }

    // 7. Enhanced AI Classification with context
    console.log('Enhancing with OpenAI classification...')
    const classification = await enhancedConstructionClassification(extractedData)

    // 8. Smart category assignment
    const categoryAssignments = await assignSmartCategories(
      document.organization_id,
      extractedData,
      classification
    )

    // 9. Update document with all extracted data
    const { error: updateError } = await supabaseAdmin
      .from('documents')
      .update({
        vendor_id: vendorId,
        vendor_name: vendorMatch.vendor_name,
        document_date: extractedData.document_date,
        due_date: extractedData.due_date,
        document_number: extractedData.document_number,
        total_amount: extractedData.total_amount,
        tax_amount: extractedData.tax_amount,
        currency: extractedData.currency,
        ocr_status: 'completed',
        notes: `Auto-processed with ${(classification.confidence * 100).toFixed(1)}% confidence. Potential tax savings: $${classification.potential_tax_savings.toFixed(2)}`
      })
      .eq('id', documentId)

    if (updateError) {
      throw updateError
    }

    // 10. Save enhanced line items with smart categorization
    if (categoryAssignments.length > 0) {
      const lineItems = categoryAssignments.map(assignment => ({
        document_id: documentId,
        description: assignment.description,
        quantity: assignment.quantity,
        unit_price: assignment.unit_price,
        amount: assignment.amount,
        category_id: assignment.category_id,
        tax_deductible: assignment.tax_deductible,
        notes: `AI Confidence: ${(assignment.confidence * 100).toFixed(1)}%`
      }))

      const { error: lineItemsError } = await supabaseAdmin
        .from('document_line_items')
        .insert(lineItems)

      if (lineItemsError) {
        console.error('Failed to save line items:', lineItemsError)
      }
    }

    // 11. Record comprehensive processing history
    const processingTime = Date.now() - startTime
    await supabaseAdmin
      .from('document_processing_history')
      .insert({
        document_id: documentId,
        status: 'completed',
        processor: 'final-enhanced-v1',
        confidence_score: classification.confidence,
        processing_time: processingTime,
        metadata: {
          azure_confidence: extractedData.confidence_scores,
          vendor_match: vendorMatch,
          classification_result: classification,
          category_assignments: categoryAssignments,
          performance_metrics: {
            processing_time_ms: processingTime,
            vendor_recognition_confidence: vendorMatch.confidence,
            classification_confidence: classification.confidence
          }
        }
      })

      // Add this to the end of your document processing pipeline
// After step 11 in your existing processor

// 12. Trigger auto-sync webhook if integrations are active
try {
  await fetch(`${process.env.NEXTAUTH_URL}/api/webhooks/document-processed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      document_id: documentId,
      organization_id: document.organization_id
    })
  })
} catch (error) {
  console.error('Auto-sync trigger failed:', error)
  // Don't fail the document processing if auto-sync fails
}
    // 12. Cache successful processing patterns
    cache.set(processingKey, {
      vendor_match: vendorMatch,
      classification: classification
    }, 30 * 60 * 1000) // 30 minutes

    // 13. Invalidate related cache entries
    cache.delete(`dashboard_metrics_${document.organization_id}`)
    cache.delete(`vendors_${document.organization_id}`)

    console.log(`Document ${documentId} processed successfully in ${processingTime}ms`)
    
    return { 
      success: true, 
      documentId, 
      classification,
      vendorMatch,
      processingTime,
      categoryAssignments
    }

  } catch (error) {
    console.error('Final enhanced document processing error:', error)
    
    await updateDocumentStatus(documentId, 'failed', error.message)
    
    const processingTime = Date.now() - startTime
    await supabaseAdmin
      .from('document_processing_history')
      .insert({
        document_id: documentId,
        status: 'failed',
        processor: 'final-enhanced-v1',
        error_message: error.message,
        processing_time: processingTime
      })

    throw error
  }
}

async function processDocumentWithRetry(buffer: Buffer, documentType: any, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await processDocumentWithAzure(buffer, documentType)
    } catch (error) {
      console.error(`Azure processing attempt ${attempt} failed:`, error)
      
      if (attempt === maxRetries) {
        throw error
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }
}

async function assignSmartCategories(
  organizationId: string,
  extractedData: any,
  classification: any
) {
  // Get organization's categories
  const { data: categories } = await supabaseAdmin
    .from('expense_categories')
    .select('id, name')
    .eq('organization_id', organizationId)

  const categoryMap = new Map(categories?.map(cat => [cat.name, cat.id]) || [])

  return classification.line_item_categories.map((item: any, index: number) => {
    const originalItem = extractedData.line_items[index] || {}
    return {
      description: item.description,
      quantity: originalItem.quantity || 1,
      unit_price: originalItem.unit_price || 0,
      amount: originalItem.amount || 0,
      category_id: categoryMap.get(item.suggested_category),
      tax_deductible: item.tax_deductible,
      confidence: item.confidence
    }
  })
}

async function updateDocumentStatus(
  documentId: string, 
  status: 'pending' | 'processing' | 'completed' | 'failed',
  errorMessage?: string
) {
  const updateData: any = { ocr_status: status, updated_at: new Date().toISOString() }
  if (errorMessage) {
    updateData.ocr_error = errorMessage
  }

  const { error } = await supabaseAdmin
    .from('documents')
    .update(updateData)
    .eq('id', documentId)

  if (error) {
    console.error('Failed to update document status:', error)
  }
}