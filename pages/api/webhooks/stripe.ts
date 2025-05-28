import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature']!
  let event: any

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return res.status(400).json({ error: 'Invalid signature' })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const organizationId = session.client_reference_id

    // Update organization subscription
    await supabaseAdmin
      .from('organization_subscriptions')
      .upsert({
        organization_id: organizationId,
        status: 'active',
        external_subscription_id: session.subscription,
        payment_method_id: session.payment_method,
        current_period_start: new Date(),
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      })
  }

  return res.status(200).json({ received: true })
}

export const config = { api: { bodyParser: { sizeLimit: '1mb' } } }