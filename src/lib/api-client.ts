'use client'
import { supabase } from './supabase'

class ApiClient {
  private async getAuthHeader(): Promise<Record<string, string>> {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token ? { 
      'Authorization': `Bearer ${session.access_token}` 
    } : {}
  }

  async uploadDocument(file: File): Promise<Record<string, unknown>> {
    const formData = new FormData()
    formData.append('file', file)

    const headers = await this.getAuthHeader()
    
    const response = await fetch('/api/documents/upload', {
      method: 'POST',
      headers,
      body: formData
    })
    
    return response.json()
  }

  async getDocuments(params: Record<string, string> = {}): Promise<Record<string, unknown>> {
    const headers = await this.getAuthHeader()
    const query = new URLSearchParams(params).toString()
    
    const response = await fetch(`/api/documents?${query}`, {
      headers
    })
    
    return response.json()
  }

  async getDocument(id: string): Promise<Record<string, unknown>> {
    const headers = await this.getAuthHeader()
    
    const response = await fetch(`/api/documents/${id}`, {
      headers
    })
    
    return response.json()
  }

  async getDashboardMetrics(): Promise<Record<string, unknown>> {
    const headers = await this.getAuthHeader()
    
    const response = await fetch('/api/dashboard/metrics', {
      headers
    })
    
    return response.json()
  }

  async updateDocument(id: string, updates: Record<string, unknown>): Promise<Record<string, unknown>> {
    const headers = await this.getAuthHeader()
    
    const response = await fetch(`/api/documents/${id}`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    })
    
    return response.json()
  }
}

export const apiClient = new ApiClient()
