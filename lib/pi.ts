// lib/pi.ts
// Wrapper that uses `pi-backend` if available, otherwise falls back to fetch against PI_API_BASE

const PI_API_BASE = process.env.PI_API_BASE || "https://sandbox-api.minepi.example"
const PI_API_KEY = process.env.PI_API_KEY || ""

let piClient: any = null
try {
  // try to require the official SDK
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const PiBackend = require('pi-backend')
  // Some SDKs expect (apiKey, walletSeed) or similar; adjust according to SDK docs.
  piClient = new PiBackend(PI_API_KEY)
} catch (e) {
  // SDK not available or failed to initialize — we'll use fetch fallback
  piClient = null
}

async function fetchApi(path: string, init: RequestInit = {}) {
  const url = `${PI_API_BASE}${path}`
  const headers: Record<string,string> = {
    'Content-Type': 'application/json',
    ...(PI_API_KEY ? { Authorization: `Bearer ${PI_API_KEY}` } : {}),
    ...(init.headers as Record<string,string> || {}),
  }
  const res = await fetch(url, { ...init, headers })
  const text = await res.text()
  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export async function createPayment({ amount, currency = 'PI', recipient, memo }: { amount: number, currency?: string, recipient: string, memo?: string }) {
  if (piClient && typeof piClient.createPayment === 'function') {
    return piClient.createPayment({ amount, currency, recipient, memo })
  }
  // Fallback: POST /payments
  return fetchApi('/v1/payments', { method: 'POST', body: JSON.stringify({ amount, currency, recipient, memo }) })
}

export async function getPayment(id: string) {
  if (piClient && typeof piClient.getPayment === 'function') {
    return piClient.getPayment(id)
  }
  return fetchApi(`/v1/payments/${encodeURIComponent(id)}`)
}
