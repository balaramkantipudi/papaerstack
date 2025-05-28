import { NextApiRequest, NextApiResponse } from 'next'
import { requireAuth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'
import { CacheManager } from '@/lib/cache-manager'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const user = await requireAuth(req)
    const { period = '30d', comparison = false } = req.query
    const cache = CacheManager.getInstance()
    
    const cacheKey = `analytics_insights_${user.organization_id}_${period}_${comparison}`
    const cachedData = cache.get(cacheKey)
    
    if (cachedData) {
      return res.status(200).json(cachedData)
    }

    const insights = await generateBusinessInsights(user.organization_id, period as string)
    
    cache.set(cacheKey, insights, 15 * 60 * 1000) // 15 minutes cache
    
    return res.status(200).json(insights)

  } catch (error) {
    console.error('Analytics insights error:', error)
    //return res.status(500).json({ error: error.message || 'Internal server error' })
  }
}

async function generateBusinessInsights(organizationId: string, period: string) {
  const periodDays = parseInt(period.replace('d', ''))
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - periodDays)

  // 1. Document processing trends
  const { data: documents } = await supabaseAdmin
    .from('documents')
    .select('total_amount, document_date, created_at, ocr_status')
    .eq('organization_id', organizationId)
    .gte('created_at', startDate.toISOString())

  // 2. Category spending analysis
  const { data: categorySpending } = await supabaseAdmin
    .from('document_line_items')
    .select(`
      amount,
      category:expense_categories(name),
      document:documents!inner(
        organization_id,
        created_at,
        document_date
      )
    `)
    .eq('document.organization_id', organizationId)
    .gte('document.created_at', startDate.toISOString())

  // 3. Vendor analysis
  const { data: vendorSpending } = await supabaseAdmin
    .from('documents')
    .select('vendor_name, total_amount, document_date')
    .eq('organization_id', organizationId)
    .gte('created_at', startDate.toISOString())
    .not('total_amount', 'is', null)

  // 4. Processing efficiency metrics
  const { data: processingMetrics } = await supabaseAdmin
    .from('document_processing_history')
    .select(`
      processing_time,
      confidence_score,
      status,
      created_at,
      document:documents!inner(organization_id)
    `)
    .eq('document.organization_id', organizationId)
    .gte('created_at', startDate.toISOString())

//   // Generate insights
//   const insights = {
//     period: `${periodDays} days`,
//     summary: {
//       total_documents: documents?.length || 0,
//       total_amount: documents?.reduce((sum, doc) => sum + (doc.total_amount || 0), 0) || 0,
//       processing_success_rate: calculateSuccessRate(documents || []),
//       average_processing_time: calculateAverageProcessingTime(processingMetrics || [])
//     },
//     trends: {
//       daily_document_volume: generateDailyTrends(documents || [], periodDays),
//       spending_by_category: generateCategoryInsights(categorySpending || []),
//       top_vendors: generateVendorInsights(vendorSpending || []),
//       processing_efficiency: generateEfficiencyInsights(processingMetrics || [])
//     },
//     actionable_insights: generateActionableInsights(documents || [], categorySpending || [], vendorSpending || []),
//     tax_opportunities: calculateTaxOpportunities(categorySpending || [])
//   }

//   return insights
//}

function calculateSuccessRate(documents: any[]): number {
  if (documents.length === 0) return 0
  const successCount = documents.filter(doc => doc.ocr_status === 'completed').length
  return (successCount / documents.length) * 100
}

function calculateAverageProcessingTime(metrics: any[]): number {
  if (metrics.length === 0) return 0
  const totalTime = metrics.reduce((sum, metric) => sum + (metric.processing_time || 0), 0)
  return totalTime / metrics.length
}

// function generateDailyTrends(documents: any[], periodDays: number) {
//   const trends = []
//   for (let i = 0; i < periodDays; i++) {
//     const date = new Date()
//     date.setDate(date.getDate() - i)
//     const dayStart = new Date(date.setHours(0, 0, 0, 0))
//     const dayEnd = new Date(date.setHours(23, 59, 59, 999))
    
//     const dayDocuments = documents.filter(doc => {
//       const docDate = new Date(doc.created_at)
//       return docDate >= dayStart && docDate <= dayEnd
//     })
    
// //     trends.unshift({
// //       date: dayStart.toISOString().split('T')[0],
// //       document_count: dayDocuments.length,
// //       total_amount: dayDocuments.reduce((sum, doc) => sum + (doc.total_amount || 0), 0)
// //     })
// //   }
//   return trends
// }

function generateCategoryInsights(categorySpending: any[]) {
  const categoryTotals = new Map()
  
  categorySpending.forEach(item => {
    const category = item.category?.name || 'Uncategorized'
    const amount = item.amount || 0
    categoryTotals.set(category, (categoryTotals.get(category) || 0) + amount)
  })
  
  return Array.from(categoryTotals.entries()).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / categorySpending.reduce((sum, item) => sum + (item.amount || 0), 0)) * 100
  })).sort((a, b) => b.amount - a.amount)
}

function generateVendorInsights(vendorSpending: any[]) {
  const vendorTotals = new Map()
  
  vendorSpending.forEach(doc => {
    const vendor = doc.vendor_name || 'Unknown'
    const amount = doc.total_amount || 0
    vendorTotals.set(vendor, (vendorTotals.get(vendor) || 0) + amount)
  })
  
  return Array.from(vendorTotals.entries())
    .map(([vendor, amount]) => ({ vendor, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10)
}

function generateEfficiencyInsights(metrics: any[]) {
  const successfulMetrics = metrics.filter(m => m.status === 'completed')
  return {
    average_confidence: successfulMetrics.reduce((sum, m) => sum + (m.confidence_score || 0), 0) / successfulMetrics.length,
    processing_time_trend: successfulMetrics.map(m => ({
      date: m.created_at,
      processing_time: m.processing_time
    }))
  }
}

// function generateActionableInsights(documents: any[], categorySpending: any[], vendorSpending: any[]) {
//   const insights = []
  
//   // Processing efficiency insights
//   const failedDocs = documents.filter(doc => doc.ocr_status === 'failed')
//   if (failedDocs.length > 0) {
//     insights.push({
//       type: 'processing_issue',
//       severity: 'medium',
//       message: `${failedDocs.length} documents failed to process. Consider reviewing document quality or contacting support.`,
//       action: 'review_failed_documents'
//     })
//   }
  
//   // Spending pattern insights
//   const totalSpending = categorySpending.reduce((sum, item) => sum + (item.amount || 0), 0)
//   if (totalSpending > 0) {
//     const materialsSpending = categorySpending
//       .filter(item => item.category?.name === 'Materials')
//       .reduce((sum, item) => sum + (item.amount || 0), 0)
    
//     const materialsPercentage = (materialsSpending / totalSpending) * 100
    
//     if (materialsPercentage > 60) {
//       insights.push({
//         type: 'spending_pattern',
//         severity: 'low',
//         message: `Materials account for ${materialsPercentage.toFixed(1)}% of spending. Consider bulk purchasing for better rates.`,
//         action: 'optimize_material_purchasing'
//       })
//     }
//   }
  
//   return insights
// }

// function calculateTaxOpportunities(categorySpending: any[]) {
//   const deductibleAmount = categorySpending
//     .filter(item => item.tax_deductible !== false)
//     .reduce((sum, item) => sum + (item.amount || 0), 0)
  
//   const estimatedTaxSavings = deductibleAmount * 0.25 // 25% tax rate assumption
  
//   return {
//     total_deductible_amount: deductibleAmount,
//     estimated_tax_savings: estimatedTaxSavings,
//     optimization_suggestion: estimatedTaxSavings > 1000 
//       ? 'Consider quarterly tax planning with your accountant'
//       : 'Continue tracking deductible expenses'
//   }
 }