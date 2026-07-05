import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session || !session.user) return res.status(401).json({ error: 'Authentication required' })

  const userEmail = session.user.email || session.user.name || session.user.id
  const user = await prisma.user.findUnique({ where: { email: session.user.email || undefined } })
  if (!user) return res.status(404).json({ error: 'User not found in DB' })

  if (req.method === 'GET') {
    const txs = await prisma.transaction.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } })
    return res.status(200).json({ ok: true, transactions: txs })
  }

  if (req.method === 'POST') {
    const { type, amount, currency, reference } = req.body || {}
    if (!type || !amount) return res.status(400).json({ error: 'type and amount required' })

    const tx = await prisma.transaction.create({ data: {
      userId: user.id,
      type,
      amount: Number(amount),
      currency: currency || 'PI',
      reference: reference || null,
    }})

    return res.status(201).json({ ok: true, tx })
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).end('Method Not Allowed')
}
