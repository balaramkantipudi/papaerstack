import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { finalEnhancedDocumentProcessingPipeline } from '@/lib/document-processor'
import formidable from 'formidable'
import { promises as fs } from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const user = await requireAuth(req)

    // Parse form data
    const form = formidable({
      maxFileSize: 20 * 1024 * 1024, // 20MB limit
      filter: ({ mimetype }) => {
        return mimetype && (
          mimetype.includes('pdf') ||
          mimetype.includes('image')
        )
      }
    })

    const [fields, files] = await form.parse(req)
    const file = Array.isArray(files.file) ? files.file[0] : files.file

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    // Check document limits
    const canUpload = await checkDocumentLimit(user.organization_id)
    if (!canUpload) {
      return res.status(429).json({ error: 'Document limit exceeded' })
    }

    // Read file
    const fileBuffer = await fs.readFile(file.filepath)
    const fileName = `${user.organization_id}/${Date.now()}-${file.originalFilename}`

    // pages/api/documents/upload.ts (continued)
   // Upload to Supabase storage
   const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
   .from('original-documents')
   .upload(fileName, fileBuffer, {
     contentType: file.mimetype || 'application/octet-stream',
     duplex: 'half'
   })

 if (uploadError) {
   console.error('Storage upload error:', uploadError)
   return res.status(500).json({ error: 'Failed to upload file' })
 }

 // Create document record
 const { data: document, error: docError } = await supabaseAdmin
   .from('documents')
   .insert({
     organization_id: user.organization_id,
     uploaded_by: user.id,
     document_type: detectDocumentType(file.originalFilename || ''),
     original_filename: file.originalFilename || 'unknown',
     storage_path: uploadData.path,
     file_size: file.size,
     ocr_status: 'pending'
   })
   .select()
   .single()

 if (docError) {
   console.error('Database insert error:', docError)
   return res.status(500).json({ error: 'Failed to create document record' })
 }

 // Trigger async processing
 processDocumentPipeline(document.id).catch(error => {
   console.error('Background processing error:', error)
 })

 return res.status(200).json({
   success: true,
   document: {
     id: document.id,
     filename: document.original_filename,
     status: document.ocr_status,
     uploaded_at: document.created_at
   }
 })

} catch (error) {
 console.error('Upload error:', error)
 return res.status(500).json({ error: error.message || 'Upload failed' })
}
}

async function checkDocumentLimit(organizationId: string): Promise<boolean> {
const { data: subscription } = await supabaseAdmin
 .from('organization_subscriptions')
 .select(`
   current_period_start,
   current_period_end,
   plan:subscription_plans(document_limit)
 `)
 .eq('organization_id', organizationId)
 .eq('status', 'active')
 .single()

if (!subscription) return false

const { count } = await supabaseAdmin
 .from('documents')
 .select('id', { count: 'exact' })
 .eq('organization_id', organizationId)
 .gte('created_at', subscription.current_period_start)
 .lte('created_at', subscription.current_period_end)

return (count || 0) < subscription.plan.document_limit
}

function detectDocumentType(filename: string): 'invoice' | 'receipt' | 'bill' | 'statement' | 'other' {
const lower = filename.toLowerCase()
if (lower.includes('invoice')) return 'invoice'
if (lower.includes('receipt')) return 'receipt'
if (lower.includes('bill')) return 'bill'
if (lower.includes('statement')) return 'statement'
return 'other'
}