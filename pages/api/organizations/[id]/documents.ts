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

  try {
    const user = await requireAuth(req)
    const { id: organizationId } = req.query
    const { 
      page = '1', 
      limit = '20', 
      status, 
      vendor, 
      project,
      date_from,
      date_to
    } = req.query

    // Validate organization access
    if (organizationId !== user.organization_id) {
      return res.status(403).json({ error: 'Access denied' })
    }

    const offset = (parseInt(page as string) - 1) * parseInt(limit as string)
    
    // Build query
    let query = supabaseAdmin
      .from('documents')
      .select(`
        id,
        original_filename,
        vendor_name,
        document_date,
        total_amount,
        ocr_status,
        is_verified,
        created_at,
        vendor:vendors(name),
        line_items:document_line_items(
          amount,
          category:expense_categories(name)
        )
      `)
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })
      .range(offset, offset + parseInt(limit as string) - 1)

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('ocr_status', status)
    }

    if (vendor) {
      query = query.eq('vendor_id', vendor)
    }

    if (date_from) {
      query = query.gte('document_date', date_from)
    }

    if (date_to) {
      query = query.lte('document_date', date_to)
    }

    const { data: documents, error } = await query

    if (error) {
      return res.status(500).json({ error: 'Failed to fetch documents' })
    }

    // Get total count for pagination
    let countQuery = supabaseAdmin
      .from('documents')
      .select('id', { count: 'exact' })
      .eq('organization_id', organizationId)

    // Apply same filters to count query
    if (status && status !== 'all') {
      countQuery = countQuery.eq('ocr_status', status)
    }
    if (vendor) {
      countQuery = countQuery.eq('vendor_id', vendor)
    }
    if (date_from) {
      countQuery = countQuery.gte('document_date', date_from)
    }
    if (date_to) {
      countQuery = countQuery.lte('document_date', date_to)
    }

    const { count } = await countQuery

    return res.status(200).json({
      documents: documents || [],
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: count || 0,
        pages: Math.ceil((count || 0) / parseInt(limit as string))
      }
    })

  } catch (error) {
    console.error('Documents list error:', error)
    return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}