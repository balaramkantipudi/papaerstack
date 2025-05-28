//import OAuthClient from 'intuit-oauth'
import { supabaseAdmin } from './supabase'

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_CLIENT_ID!,
  clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET!,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
  redirectUri: `${process.env.NEXTAUTH_URL}/api/integrations/quickbooks/callback`
})

export class QuickBooksClient {
  private token: any
  private companyId: string

  constructor(token: any, companyId: string) {
    this.token = token
    this.companyId = companyId
    oauthClient.setToken(token)
  }

  async createItem(documentData: any) {
    const itemData = {
      Name: documentData.vendor_name || 'Document Item',
      Description: documentData.document_number || 'Imported from Paperstack',
      UnitPrice: documentData.total_amount || 0,
      Type: 'Service',
      IncomeAccountRef: {
        value: '1', // Default income account
        name: 'Services'
      }
    }

    try {
      const response = await oauthClient.makeApiCall({
        url: `${oauthClient.environment.base_url}v3/company/${this.companyId}/item`,
        method: 'POST',
        body: itemData
      })
      return response.json
    } catch (error) {
      console.error('QuickBooks create item error:', error)
      throw error
    }
  }

  async createExpense(documentData: any, categoryMapping: Record<string, string>) {
    const expenseData = {
      AccountRef: {
        value: categoryMapping[documentData.category] || '1',
        name: documentData.category || 'Office Expenses'
      },
      PaymentType: 'Cash',
      TotalAmt: documentData.total_amount || 0,
      Line: [{
        Id: '1',
        Amount: documentData.total_amount || 0,
        DetailType: 'AccountBasedExpenseLineDetail',
        AccountBasedExpenseLineDetail: {
          AccountRef: {
            value: categoryMapping[documentData.category] || '1',
            name: documentData.category || 'Office Expenses'
          }
        }
      }],
      EntityRef: {
        value: documentData.vendor_id || '1',
        name: documentData.vendor_name || 'Unknown Vendor'
      }
    }

    try {
      const response = await oauthClient.makeApiCall({
        url: `${oauthClient.environment.base_url}v3/company/${this.companyId}/purchase`,
        method: 'POST',
        body: expenseData
      })
      return response.json
    } catch (error) {
      console.error('QuickBooks create expense error:', error)
      throw error
    }
  }

  async getAccounts() {
    try {
      const response = await oauthClient.makeApiCall({
        url: `${oauthClient.environment.base_url}v3/company/${this.companyId}/accounts`,
        method: 'GET'
      })
      return response.json.QueryResponse.Account || []
    } catch (error) {
      console.error('QuickBooks get accounts error:', error)
      throw error
    }
  }

  async createVendor(vendorData: any) {
    const vendor = {
      Name: vendorData.name,
      CompanyName: vendorData.name,
      BillAddr: {
        Line1: vendorData.address,
        City: vendorData.city,
        CountrySubDivisionCode: vendorData.state,
        PostalCode: vendorData.zip
      },
      PrimaryPhone: {
        FreeFormNumber: vendorData.phone
      },
      PrimaryEmailAddr: {
        Address: vendorData.email
      }
    }

    try {
      const response = await oauthClient.makeApiCall({
        url: `${oauthClient.environment.base_url}v3/company/${this.companyId}/vendor`,
        method: 'POST',
        body: vendor
      })
      return response.json
    } catch (error) {
      console.error('QuickBooks create vendor error:', error)
      throw error
    }
  }
}

export function getQuickBooksAuthUrl(organizationId: string) {
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: organizationId
  })
  return authUri
}