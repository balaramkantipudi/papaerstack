// Mock Stripe implementation for build compatibility
interface StripeSession {
  id: string
  url: string | null
  payment_status: string
}

interface StripeWebhook {
  constructEvent: (body: any, signature: string, secret: string) => any
}

class MockStripe {
  webhooks: StripeWebhook = {
    constructEvent: (body: any, signature: string, secret: string) => {
      // Mock webhook construction
      return {
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'mock_session_id',
            client_reference_id: 'mock_org_id',
            subscription: 'mock_subscription_id',
            payment_method: 'mock_payment_method'
          }
        }
      }
    }
  }

  checkout = {
    sessions: {
      create: async (params: any): Promise<StripeSession> => {
        // Mock session creation
        return {
          id: `mock_session_${Date.now()}`,
          url: `https://checkout.stripe.com/mock/${Date.now()}`,
          payment_status: 'unpaid'
        }
      }
    }
  }

  constructor(secretKey: string, options?: any) {
    console.log('Mock Stripe initialized')
  }
}

export const stripe = new MockStripe(process.env.STRIPE_SECRET_KEY || 'mock_key', {
  apiVersion: '2023-10-16'
})

export const getStripeSession = async (
  organizationId: string,
  priceId: string,
  userId: string
) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
    client_reference_id: organizationId,
    metadata: {
      organizationId,
      userId
    }
  })

  return session
}