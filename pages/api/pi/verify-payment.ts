import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { getPayment } from '../../../lib/pi'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const session = await getSession({ req })
  if (!session || !session.user) return res.status(401).json({ error: 'Authentication required' })

  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
  if (!id) return res.status(400).json({ error: 'id required' })

  try {
    const payment = await getPayment(id)
    return res.status(200).json({ ok: true, payment })
  } catch (err: any) {
    console.error('getPayment error:', err)
    return res.status(err?.status || 500).json({ error: err?.body || String(err) })
  }
}
