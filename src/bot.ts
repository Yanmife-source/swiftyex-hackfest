import { Bot, InlineKeyboard } from 'grammy'

let bot: Bot | null = null

export function registerBot(publicUrl: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token || token.trim() === '') {
    console.warn('TELEGRAM_BOT_TOKEN not set — bot not started')
    return
  }

  try {
    bot = new Bot(token)

    bot.api.setMyShortDescription('SwiftyEx Mini App — Yarn (AI chat) + Services (airtime, data, bills)').catch(() => {})
    bot.api.setMyDescription(
      'Buy airtime, data bundles, and pay bills with SwiftyEx. Chat with Yarn, your Pidgin AI assistant.'
    ).catch(() => {})

    bot.catch((err) => {
      console.error('Bot error:', err.message)
    })

    bot.command('start', async (ctx) => {
      const kb = new InlineKeyboard().webApp('🚀 Open SwiftyEx Mini App', publicUrl)
      await ctx.reply(
        `👋 *Welcome to SwiftyEx!*\n\n` +
        `Buy airtime, data bundles, and pay bills with your wallet.\n` +
        `Chat with *Yarn* — your Pidgin AI crypto assistant 🇳🇬\n\n` +
        `Tap below to launch the Mini App 👇`,
        { reply_markup: kb, parse_mode: 'Markdown' }
      )
    })

    bot.command('help', async (ctx) => {
      await ctx.reply(
        `*SwiftyEx Mini App*\n\n` +
        `• /start — Open Mini App\n` +
        `• /help — This message\n\n` +
        `Need support? DM @swiftyexbot support`,
        { parse_mode: 'Markdown' }
      )
    })

    bot.start({ drop_pending_updates: true }).catch((err) => {
      console.error('Bot polling failed:', err)
    })
    if (!publicUrl.startsWith('https')) {
      console.warn(`⚠ Mini App URL is HTTP (${publicUrl}). Telegram requires HTTPS. Use ngrok or deploy to test.`)
    }
    console.log(`Bot started — mini app URL: ${publicUrl}`)
  } catch (err) {
    console.error('Bot failed to start:', err)
  }
}
