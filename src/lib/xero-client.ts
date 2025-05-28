import { XeroClient } from 'xero-node'
import { supabaseAdmin } from './supabase'

export class XeroIntegration {
  private client: XeroClient

  constructor() {
    this.client = new XeroClient({
      clientId: process.env.XERO_CLIENT_ID!,
      clientSecret: process.env.XERO_CLIENT_SECRET!,
      redirectUris: [`${process.env.NEXTAUTH_URL}/api/integrations/xero/callback`],
      scopes: 'accounting.transactions accounting.contacts accounting.settings'
    })
  }

  getAuthUrl(organizationId: string) {
    return this.client.buildConsentUrl(organizationId)
  }

  async exchangeCodeForTokens(url: string) {
    return await this.client.apiCallback(url)
  }

  async createContact(vendorData: any, tenantId: string, tokens: any) {
    await this.client.setTokenSet(tokens)
    
    const contact = {
      name: vendorData.name,
      emailAddress: vendorData.email,
      phones: vendorData.phone ? [{
        phoneType: 'DEFAULT',
        phoneNumber: vendorData.phone
      }] : [],
      addresses: vendorData.address ? [{
        addressType: 'POBOX',
        addressLine1: vendorData.address,
        city: vendorData.city,
        region: vendorData.state,
        postalCode: vendorData.zip
      }] : [],
      isSupplier: true
    }

    try {
      const response = await this.client.accountingApi.createContacts(tenantId, {
        contacts: [contact]
      })
      return response.body.contacts?.[0]
    } catch (error) {
      console.error('Xero create contact error:', error)
      throw error
    }
  }

  async createBill(documentData: any, tenantId: string, tokens: any) {
    await this.client.setTokenSet(tokens)

    const bill = {
      type: 'ACCPAY',
      contact: {
        contactID: documentData.xero_contact_id || '00000000-0000-0000-0000-000000000000'
      },
      date: documentData.document_date || new Date().toISOString().split('T')[0],
      dueDate: documentData.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      reference: documentData.document_number,
      lineItems: documentData.line_items?.map((item: any) => ({
        description: item.description,
        quantity: item.quantity || 1,
        unitAmount: item.unit_price || item.amount,
        accountCode: this.getCategoryAccountCode(item.category?.name)
      })) || [{
        description: 'Imported expense',
        unitAmount: documentData.total_amount || 0,
        accountCode: '400' // Default expense account
      }]
    }

    try {
      const response = await this.client.accountingApi.createInvoices(tenantId, {
        invoices: [bill]
      })
      return response.body.invoices?.[0]
    } catch (error) {
      console.error('Xero create bill error:', error)
      throw error
    }
  }

  private getCategoryAccountCode(categoryName?: string): string {
    const categoryMapping: Record<string, string> = {
      'Materials': '300',
      'Labor': '400',
      'Equipment Rental': '500',
      'Tools': '520',
      'Office Expenses': '600',
      'Transportation': '700'
    }
    
    return categoryMapping[categoryName || ''] || '400'
  }

  async getAccounts(tenantId: string, tokens: any) {
    await this.client.setTokenSet(tokens)
    
    try {
      const response = await this.client.accountingApi.getAccounts(tenantId)
      return response.body.accounts || []
    } catch (error) {
      console.error('Xero get accounts error:', error)
      throw error
    }
  }
}