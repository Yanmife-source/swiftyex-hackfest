import type { FastifyInstance } from 'fastify'
import axios from 'axios'

const SYSTEM_PROMPT = `You are Yarn, a friendly Nigerian Pidgin English crypto assistant for SwiftyEx.
You help users with:
- Explaining crypto (BTC, ETH, USDC) in simple terms
- Current rates and trends (in Naira)
- How to buy/sell on SwiftyEx
- Nigerian market insights

Key rules:
- Mix Pidgin and English naturally. E.g. "Wetin dey happen? BTC don drop small o"
- Be helpful, warm, and never give financial advice
- Keep answers short (2-3 sentences max for chat)
- If asked about something outside crypto, gently redirect
- Use Nigerian references: "Hmm, e no easy for this current economy but crypto fit help"`

function createFallbackResponse(message: string): string {
  const msg = message.toLowerCase()

  if (msg.includes('btc') || msg.includes('bitcoin')) {
    return 'Ah, Bitcoin! Oga BTC dey around $85k now o. For Naira, na around ₦140M based on current rate. E don suffer small but steady steady.'
  }
  if (msg.includes('eth') || msg.includes('ethereum')) {
    return 'Ethereum dey o! ETH dey around $3.2k. For Naira, na about ₦5.3M. Still get better gas wey dey make am expensive small.'
  }
  if (msg.includes('usdc') || msg.includes('usdt')) {
    return 'Stablecoins like USDC na your best friend for hodling value. 1 USDC = 1 USD always. For SwiftyEx, you fit buy am with Naira.'
  }
  if (msg.includes('rate') || msg.includes('naira')) {
    return 'Rate wey SwiftyEx dey give: 1 USDC ≈ ₦1,650. But e fit change o, check the mini app for current price.'
  }
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('good')) {
    return 'Ah! Wetin dey happen bro? I be Yarn, your Pidgin crypto assistant. Ask me anything about crypto or SwiftyEx, I go help you! 🇳🇬'
  }
  if (msg.includes('buy') || msg.includes('sell') || msg.includes('swap')) {
    return 'For SwiftyEx, buying and selling dey smooth. Go to the Services tab for airtime, data, and more. For crypto to Naira, we go sort you out!'
  }
  if (msg.includes('airtime') || msg.includes('data')) {
    return 'You fit buy airtime and data cheap for SwiftyEx! Go to the Services tab, select your network, enter number, and pay with your wallet balance.'
  }
  if (msg.includes('thank') || msg.includes('thanks')) {
    return 'No wahala bro! Anytime you get question, yarn me. I dey here for you! 🇳🇬'
  }

  return 'Hmm, I no clear catch wetin you dey ask o. Try again abeg, or check the Services tab for airtime and data. We dey help! 🇳🇬'
}

export function registerAI(app: FastifyInstance) {
  const apiKey = process.env.OPENROUTER_API_KEY
  const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct'

  if (apiKey) {
    console.log(`OpenRouter AI enabled — model: ${model}`)
  } else {
    console.log('OPENROUTER_API_KEY not set — using fallback responses')
  }

  app.post('/api/chat', async (req, reply) => {
    const { message } = req.body as { message?: string }

    if (!message || !message.trim()) {
      return reply.status(400).send({ error: 'message is required' })
    }

    if (apiKey) {
      try {
        const { data } = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model,
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: message },
            ],
            max_tokens: 200,
            temperature: 0.7,
          },
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://swiftyex-mini.app',
              'X-Title': 'SwiftyEx Mini App',
            },
          }
        )
        const text = data.choices?.[0]?.message?.content
        if (text) return { reply: text.trim() }
      } catch (err) {
        console.warn('OpenRouter error, falling back to canned')
      }
    }

    return { reply: createFallbackResponse(message) }
  })
}
