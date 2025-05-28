import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer"

const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT!
const apiKey = process.env.AZURE_FORM_RECOGNIZER_KEY!

const client = new DocumentAnalysisClient(
  endpoint,
  new AzureKeyCredential(apiKey)
)

export interface ExtractedDocumentData {
  vendor_name?: string
  document_date?: string
  due_date?: string
  document_number?: string
  total_amount?: number
  tax_amount?: number
  currency?: string
  line_items: Array<{
    description?: string
    quantity?: number
    unit_price?: number
    amount?: number
  }>
  confidence_scores: {
    vendor_name?: number
    total_amount?: number
    document_date?: number
  }
}

export async function processDocumentWithAzure(
  documentBuffer: Buffer,
  documentType: 'invoice' | 'receipt' = 'invoice'
): Promise<ExtractedDocumentData> {
  try {
    const modelId = documentType === 'invoice' ? 'prebuilt-invoice' : 'prebuilt-receipt'
    
    const poller = await client.beginAnalyzeDocument(modelId, documentBuffer)
    const result = await poller.pollUntilDone()

    return extractFieldsFromResult(result)
  } catch (error) {
    console.error('Azure Document Intelligence error:', error)
    throw new Error(`Document processing failed: ${error.message}`)
  }
}

function extractFieldsFromResult(result: any): ExtractedDocumentData {
  const document = result.documents?.[0]
  if (!document) {
    throw new Error('No document found in analysis result')
  }

  const fields = document.fields || {}
  const extracted: ExtractedDocumentData = {
    line_items: [],
    confidence_scores: {}
  }

  // Extract vendor information
  if (fields.VendorName) {
    extracted.vendor_name = fields.VendorName.value
    extracted.confidence_scores.vendor_name = fields.VendorName.confidence
  }

  // Extract dates
  if (fields.InvoiceDate) {
    extracted.document_date = fields.InvoiceDate.value
    extracted.confidence_scores.document_date = fields.InvoiceDate.confidence
  }

  if (fields.DueDate) {
    extracted.due_date = fields.DueDate.value
  }

  // Extract amounts
  if (fields.InvoiceTotal) {
    extracted.total_amount = fields.InvoiceTotal.value?.amount
    extracted.currency = fields.InvoiceTotal.value?.currencyCode || 'USD'
    extracted.confidence_scores.total_amount = fields.InvoiceTotal.confidence
  }

  if (fields.TotalTax) {
    extracted.tax_amount = fields.TotalTax.value?.amount
  }

  // Extract document number
  if (fields.InvoiceId) {
    extracted.document_number = fields.InvoiceId.value
  }

  // Extract line items
  if (fields.Items?.value) {
    extracted.line_items = fields.Items.value.map((item: any) => ({
      description: item.value?.Description?.value,
      quantity: item.value?.Quantity?.value,
      unit_price: item.value?.UnitPrice?.value?.amount,
      amount: item.value?.Amount?.value?.amount
    }))
  }

  return extracted
}