import type { FastifyInstance } from 'fastify'
import axios from 'axios'

const SWIFTYEX_API = process.env.SWIFTYEX_API_URL || 'http://localhost:8000'

export function registerProxy(app: FastifyInstance) {
  app.post('/api/miniapp/me', async (req) => {
    const { initData } = req.body as { initData?: string }
    const { data } = await axios.post(`${SWIFTYEX_API}/miniapp/me`, { initData: initData ?? '' })
    return data
  })

  app.post('/api/miniapp/wallets', async (req) => {
    const { initData } = req.body as { initData?: string }
    const { data } = await axios.post(`${SWIFTYEX_API}/miniapp/wallets`, { initData: initData ?? '' })
    return data
  })

  app.post('/api/miniapp/transactions', async (req) => {
    const { initData, page, wallet_type } = req.body as { initData?: string; page?: number; wallet_type?: string }
    const { data } = await axios.post(`${SWIFTYEX_API}/miniapp/transactions`, {
      initData: initData ?? '',
      page: page ?? 1,
      wallet_type: wallet_type ?? '',
    })
    return data
  })

  app.get('/api/miniapp/rates', async () => {
    const { data } = await axios.get(`${SWIFTYEX_API}/miniapp/rates`)
    return data
  })

}
