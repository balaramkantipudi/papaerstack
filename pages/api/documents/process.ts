import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '@/lib/auth'
import { finalEnhancedDocumentProcessingPipeline } from '@/lib/document-processor'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const user = await requireAuth(req)
    const { documentId } = req.body

    if (!documentId) {
      return res.status(400).json({ error: 'Document ID required' })
    }

    // Trigger processing
    processDocumentPipeline(documentId)
      .then(() => {
        console.log(`Document ${documentId} processing completed`)
      })
      .catch(error => {
        console.error(`Document ${documentId} processing failed:`, error)
      })

    return res.status(200).json({
      success: true,
      message: 'Document processing started'
    })

  } catch (error) {
    console.error('Process API error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}