import httpx
import os
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo,ReplyKeyboardMarkup
from telegram.ext import ContextTypes
import logging

load_dotenv()

base_url = os.getenv("BASE_URL")
webapp_url = os.getenv("WEBAPP_URL")
print(f"BASE_URL: {base_url}")

def format_rates(data):
    text = ""
    for rate in data["rates"]:
        symbol = rate["symbol"].upper()
        buy = rate["buy"]
        sell = rate["sell"]
        text += f"• {symbol}: Buy ₦{buy} | Sell ₦{sell}\n"
    return text

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    user = update.effective_user

    reply_keyboard = ReplyKeyboardMarkup([
        ["💰 Balance", "📈 Rates"],
        ["📋 History", "ℹ️ Help"],
        ["🏠 Home"]
    ], resize_keyboard=True)

     # Build your button matrix layout
    inline_keyboard = [
    [InlineKeyboardButton("💳 Open SwiftyEx App", 
        web_app=WebAppInfo(url="https://bot.cordialexchange.com")
        )]
    ]

    await update.message.reply_text(
        "Welcome to SwiftyEx! 👋\nManage your wallets and send payment requests.",
        reply_markup=InlineKeyboardMarkup(inline_keyboard)
    )
      # Send keyboard separately
    await update.message.reply_text(
        "Use the menu below to navigate:",
        reply_markup=reply_keyboard
    )
    

async def error(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Log errors caused by updates."""
    logging.warning(f'Update {update} caused error {context.error}')

async def get_rates():
    try:
        async with httpx.AsyncClient() as client:
            response=await client.get(f"{base_url}/miniapp/rates")
            return response.json()
    except httpx.TimeoutException:
        raise Exception("Request timed out")
    except httpx.RequestError:
        raise Exception("Could not reach SwiftyEx server")

async def rates(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = await get_rates()
    # format rates nicely
    text = "📈 *Current Rates*\n\n" + format_rates(data)
    
    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton("🔄 Refresh", callback_data="refresh_rates")]
    ])
    
    await update.message.reply_text(text, reply_markup=keyboard, parse_mode="Markdown")

async def refresh_rates(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    data = await get_rates()
    text = "📈 *Current Rates*\n\n" + format_rates(data)
    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton("🔄 Refresh", callback_data="refresh_rates")]
    ])
    await query.edit_message_text(text, reply_markup=keyboard, parse_mode="Markdown")

async def balance(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("⚠️ Balance feature coming soon.")

async def history(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("⚠️ History feature coming soon.")

async def help_cmd(update: Update, context: ContextTypes.DEFAULT_TYPE):
    help_text = """
👋 *Welcome to SwiftyEx Bot!*

Here's everything you can do:

💰 *Balance* — Check your wallet balances across BTC, ETH, USDT and Naira instantly

📈 *Rates* — View current USD/Naira buy & sell rates

📋 *History* — View your recent transaction history

💳 *Open App* — Launch the full SwiftyEx Mini App for P2P payment requests and your complete wallet dashboard

─────────────────
*Commands*
/start — Restart the bot
/help — Show this message
/balance — Check your balances
/rates — Get current rates

─────────────────
💡 *Tip:* Use the menu buttons below for quick access to everything.

Need support? Contact @SwiftyExSupport
    """
    await update.message.reply_text(help_text, parse_mode="Markdown")
    
async def handle_menu(update: Update, context: ContextTypes.DEFAULT_TYPE):
    text = update.message.text
    
    if text == "💰 Balance":
        await balance(update, context)
    elif text == "📈 Rates":
        await rates(update, context)
    elif text == "📋 History":
        await history(update, context)
    elif text == "ℹ️ Help":
        await help_cmd(update, context)
    elif text == "🏠 Home":
        await start(update, context)
