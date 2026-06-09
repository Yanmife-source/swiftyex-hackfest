import Fastify from 'fastify'
import cors from '@fastify/cors'
import staticFiles from '@fastify/static'
import { config } from 'dotenv'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { registerBot } from './bot.ts'
import { registerProxy } from './proxy.ts'
import { registerMock } from './mock.js'
import { registerAI } from './ai.ts'

config()

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = Fastify({ logger: true })
const PORT = Number(process.env.PORT) || 3000
const HOST = process.env.HOST || '0.0.0.0'

await app.register(cors, { origin: true })

await app.register(staticFiles, {
  root: resolve(__dirname, '../public'),
  prefix: '/',
})

registerProxy(app)
registerMock(app)
registerAI(app)

app.get('/health', async () => ({ status: 'ok' }))

await app.listen({ port: PORT, host: HOST })

const publicUrl = process.env.PUBLIC_URL || `http://localhost:${PORT}`
registerBot(publicUrl)
