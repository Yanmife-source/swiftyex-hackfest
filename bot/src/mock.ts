import type { FastifyInstance } from 'fastify'

let refCounter = 0

export function registerMock(app: FastifyInstance) {
  app.post('/api/mock/sell', async (req, reply) => {
    const { asset, amount } = req.body as { asset?: string; amount?: number }

    if (!amount || amount <= 0) {
      return reply.status(400).send({ error: 'amount must be > 0' })
    }

    const rate = 1650
    const nairaAmount = amount * rate
    refCounter++

    return {
      success: true,
      reference: `SELL-${Date.now()}-${refCounter}`,
      asset: asset ?? 'USDC',
      amount_usdc: amount,
      rate_ngn: rate,
      amount_ngn: nairaAmount,
      status: 'completed',
      message: `Sold ${amount} USDC at ₦${rate}/USDC. ₦${nairaAmount.toLocaleString()} credited to your Naira wallet.`,
    }
  })

  app.post('/api/mock/buy-airtime', async (req, reply) => {
    const { network, phone, amount } = req.body as { network?: string; phone?: string; amount?: number }

    if (!network || !phone || !amount) {
      return reply.status(400).send({ error: 'network, phone, and amount are required' })
    }

    if (!/^\d{11}$/.test(phone)) {
      return reply.status(400).send({ error: 'phone must be a valid 11-digit Nigerian number' })
    }

    const validNetworks = ['mtn', 'glo', 'airtel', '9mobile']
    if (!validNetworks.includes(network.toLowerCase())) {
      return reply.status(400).send({ error: `network must be one of: ${validNetworks.join(', ')}` })
    }

    refCounter++

    return {
      success: true,
      reference: `VTU-${Date.now()}-${refCounter}`,
      network: network.toLowerCase(),
      phone,
      amount,
      status: 'completed',
      message: `₦${amount} airtime credited to ${phone} (${network.toUpperCase()}).`,
    }
  })

  app.post('/api/mock/buy-data', async (req, reply) => {
    const { network, phone, plan } = req.body as { network?: string; phone?: string; plan?: string }

    if (!network || !phone || !plan) {
      return reply.status(400).send({ error: 'network, phone, and plan are required' })
    }

    refCounter++

    return {
      success: true,
      reference: `DATA-${Date.now()}-${refCounter}`,
      network: network.toLowerCase(),
      phone,
      plan,
      status: 'completed',
      message: `${plan} data plan activated on ${phone} (${network.toUpperCase()}).`,
    }
  })

  app.get('/api/mock/data-plans', async () => {
    return {
      plans: [
        { label: '1GB — 1 Day', value: '1GB-1D', price: 300 },
        { label: '2GB — 7 Days', value: '2GB-7D', price: 500 },
        { label: '5GB — 30 Days', value: '5GB-30D', price: 1000 },
        { label: '10GB — 30 Days', value: '10GB-30D', price: 1500 },
        { label: '20GB — 30 Days', value: '20GB-30D', price: 2500 },
      ],
    }
  })
}
