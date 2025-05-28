import { NextApiRequest } from 'next'
import { supabaseAdmin } from './supabase'

export async function getUser(req: NextApiRequest) {
  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return { user: null, error: 'No token provided' }
  }

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
    
    if (error || !user) {
      return { user: null, error: 'Invalid token' }
    }

    // Get user's organization membership
    const { data: membership, error: membershipError } = await supabaseAdmin
      .from('organization_members')
      .select(`
        organization_id,
        role,
        organizations (
          id,
          name,
          subscription:organization_subscriptions (
            status,
            plan:subscription_plans (
              document_limit,
              user_limit
            )
          )
        )
      `)
      .eq('user_id', user.id)
      .single()

    if (membershipError || !membership) {
      return { user: null, error: 'User not associated with any organization' }
    }

    return {
      user: {
        ...user,
        organization_id: membership.organization_id,
        role: membership.role,
        organization: membership.organizations
      },
      error: null
    }
  } catch (error) {
    return { user: null, error: 'Authentication failed' }
  }
}

export async function requireAuth(req: NextApiRequest) {
  const { user, error } = await getUser(req)
  
  if (!user) {
    throw new Error(error || 'Authentication required')
  }
  
  return user
}