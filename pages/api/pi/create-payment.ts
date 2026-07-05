import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { createPayment } from '../../../lib/pi'
import { prisma } from '../../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const session = await getSession({ req })
  if (!session || !session.user) return res.status(401).json({ error: 'Authentication required' })

  const { amount, currency, recipient, memo } = req.body || {}
  if (!amount || !recipient) return res.status(400).json({ error: 'amount and recipient required' })

  try {
    const payment = await createPayment({ amount: Number(amount), currency, recipient, memo })

    // store a payment record in DB (if the SDK returns an id)
    const paymentId = payment?.id || payment?.paymentId || null
    const user = await prisma.user.findUnique({ where: { email: session.user.email || undefined } })
    if (user) {
      await prisma.transaction.create({ data: {
        userId: user.id,
        type: 'sent',
        amount: Number(amount),
        currency: currency || 'PI',
        reference: paymentId,
      }})
    }

    return res.status(201).json({ ok: true, payment })
  } catch (err: any) {
    console.error('createPayment error:', err)
    return res.status(err?.status || 500).json({ error: err?.body || String(err) })
  }
}
