'use client'
import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api-client'
import { useAuth } from '@/lib/useAuth'

export default function DashboardMetrics() {
  const [metrics, setMetrics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      loadMetrics()
    }
  }, [user])

  const loadMetrics = async () => {
    try {
      const data = await apiClient.getDashboardMetrics()
      setMetrics(data)
    } catch (error) {
      console.error('Failed to load metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div>Please log in to view dashboard</div>
  }

  if (loading) {
    return <div>Loading metrics...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Documents This Month
        </h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          {metrics?.documents_count || 0}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Total Amount
        </h3>
        <p className="mt-2 text-3xl font-semibold text-gray-900">
          ${(metrics?.total_amount_processed || 0).toLocaleString()}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Completed
        </h3>
        <p className="mt-2 text-3xl font-semibold text-green-600">
          {metrics?.status_breakdown?.completed || 0}
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          Processing
        </h3>
        <p className="mt-2 text-3xl font-semibold text-blue-600">
          {metrics?.status_breakdown?.processing || 0}
        </p>
      </div>
    </div>
  )
}