export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string
            email: string
            full_name: string | null
            avatar_url: string | null
            phone: string | null
            created_at: string
            updated_at: string
          }
          Insert: {
            id: string
            email: string
            full_name?: string | null
            avatar_url?: string | null
            phone?: string | null
            created_at?: string
            updated_at?: string
          }
          Update: {
            id?: string
            email?: string
            full_name?: string | null
            avatar_url?: string | null
            phone?: string | null
            created_at?: string
            updated_at?: string
          }
        }
        organizations: {
          Row: {
            id: string
            name: string
            logo_url: string | null
            address: string | null
            city: string | null
            state: string | null
            zip: string | null
            country: string | null
            phone: string | null
            tax_id: string | null
            created_by: string
            created_at: string
            updated_at: string
          }
          Insert: {
            id?: string
            name: string
            logo_url?: string | null
            address?: string | null
            city?: string | null
            state?: string | null
            zip?: string | null
            country?: string | null
            phone?: string | null
            tax_id?: string | null
            created_by: string
            created_at?: string
            updated_at?: string
          }
          Update: {
            id?: string
            name?: string
            logo_url?: string | null
            address?: string | null
            city?: string | null
            state?: string | null
            zip?: string | null
            country?: string | null
            phone?: string | null
            tax_id?: string | null
            created_by?: string
            created_at?: string
            updated_at?: string
          }
        }
        documents: {
          Row: {
            id: string
            organization_id: string
            uploaded_by: string
            document_type: 'invoice' | 'receipt' | 'bill' | 'statement' | 'other'
            original_filename: string
            storage_path: string
            thumbnail_path: string | null
            file_size: number
            page_count: number | null
            ocr_status: 'pending' | 'processing' | 'completed' | 'failed'
            ocr_error: string | null
            vendor_id: string | null
            vendor_name: string | null
            document_date: string | null
            due_date: string | null
            document_number: string | null
            total_amount: number | null
            tax_amount: number | null
            currency: string | null
            notes: string | null
            is_verified: boolean | null
            created_at: string
            updated_at: string
          }
          Insert: {
            id?: string
            organization_id: string
            uploaded_by: string
            document_type: 'invoice' | 'receipt' | 'bill' | 'statement' | 'other'
            original_filename: string
            storage_path: string
            thumbnail_path?: string | null
            file_size: number
            page_count?: number | null
            ocr_status?: 'pending' | 'processing' | 'completed' | 'failed'
            ocr_error?: string | null
            vendor_id?: string | null
            vendor_name?: string | null
            document_date?: string | null
            due_date?: string | null
            document_number?: string | null
            total_amount?: number | null
            tax_amount?: number | null
            currency?: string | null
            notes?: string | null
            is_verified?: boolean | null
            created_at?: string
            updated_at?: string
          }
          Update: {
            id?: string
            organization_id?: string
            uploaded_by?: string
            document_type?: 'invoice' | 'receipt' | 'bill' | 'statement' | 'other'
            original_filename?: string
            storage_path?: string
            thumbnail_path?: string | null
            file_size?: number
            page_count?: number | null
            ocr_status?: 'pending' | 'processing' | 'completed' | 'failed'
            ocr_error?: string | null
            vendor_id?: string | null
            vendor_name?: string | null
            document_date?: string | null
            due_date?: string | null
            document_number?: string | null
            total_amount?: number | null
            tax_amount?: number | null
            currency?: string | null
            notes?: string | null
            is_verified?: boolean | null
            created_at?: string
            updated_at?: string
          }
        }
        // Add other table types as needed...
      }
    }
  }