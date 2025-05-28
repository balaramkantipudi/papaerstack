import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid document ID' })
  }

  try {
    const user = await requireAuth(req)

    const { data: document, error } = await supabaseAdmin
      .from('documents')
      .select(`
        id,
        ocr_status,
        ocr_error,
        created_at,
        updated_at,
        processing_history:document_processing_history(
          status,
          confidence_score,
          processing_time,
          error_message,
          created_at
        )
      `)
      .eq('id', id)
      .eq('organization_id', user.organization_id)
      .single()

    if (error || !document) {
      return res.status(404).json({ error: 'Document not found' })
    }

    // Calculate processing progress
    let progress = 0
    switch (document.ocr_status) {
      case 'pending': progress = 10; break
      case 'processing': progress = 50; break
      case 'completed': progress = 100; break
      case 'failed': progress = 0; break
    }

    return res.status(200).json({
      status: document.ocr_status,
      progress,
      error: document.ocr_error,
      processing_history: document.processing_history,
      updated_at: document.updated_at
    })

  } catch (error) {
    console.error('Status API error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}