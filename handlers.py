import httpx
import os
from dotenv import load_dotenv
from telegram import Update, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo,ReplyKeyboardMarkup
from telegram.ext import ContextTypes
import logging
from groq import Groq

load_dotenv()

# call the groq api
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

base_url = os.getenv("BASE_URL")#Call the base url given by the organizers in the .env file
#call the miniapp url
webapp_url = os.getenv("WEBAPP_URL")
print(f"BASE_URL: {base_url}")#for debugging if the BASE_URL is correct and doesnt output None

# function to format the rates json data
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

    #Setup the keyboard menu at the bottom of the screen
    reply_keyboard = ReplyKeyboardMarkup([
        ["💰 Balance", "📈 Rates"],
        ["📋 History", "ℹ️ Help"],
        ["🏠 Home"]
    ], resize_keyboard=True)

     # Build your button matrix layout for the inline button
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
    
# Function for Error handler
async def error(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    logging.warning(f'Update {update} caused error {context.error}')
    if update and update.effective_message:
        await update.effective_message.reply_text(
            "⚠️ Something went wrong. Please try again later."
        )

#Function to get rates from the provided url using httpx
async def get_rates():
    try:
        async with httpx.AsyncClient() as client:
            response=await client.get(f"{base_url}/miniapp/rates")
            return response.json()
    except httpx.TimeoutException:
        raise Exception("Request timed out")
    except httpx.RequestError:
        raise Exception("Could not reach SwiftyEx server")

#Rates handler function
async def rates(update: Update, context: ContextTypes.DEFAULT_TYPE):
    data = await get_rates()
    # format rates nicely
    text = "📈 *Current Rates*\n\n" + format_rates(data)
    
    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton("🔄 Refresh", callback_data="refresh_rates")]
    ])
    
    await update.message.reply_text(text, reply_markup=keyboard, parse_mode="Markdown")

#Functionto refresh the message and edit if the rates changes
async def refresh_rates(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    await query.answer()
    data = await get_rates()
    text = "📈 *Current Rates*\n\n" + format_rates(data)
    keyboard = InlineKeyboardMarkup([
        [InlineKeyboardButton("🔄 Refresh", callback_data="refresh_rates")]
    ])
    await query.edit_message_text(text, reply_markup=keyboard, parse_mode="Markdown")

#Balance Handler Function
async def balance(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("⚠️ Balance feature coming soon.")#initData isnt working so i an implemetn this or history

#Transaction Handler function
async def history(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("⚠️ History feature coming soon.")

# Help handler function
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

# AI chat  handler function 
async def ai_chat(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text
    try:
        rates_data = await get_rates()
        wallet_data = await get_wallets()#placeholders cos the miniapp/me,miniapp/transactions and mniapp/wallets cant work without a valid initData object which wasnt porvided in the json file
        transaction_data = await get_transactions()
        response = groq_client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[
                {
                    "role": "system",
                    "content": f"""You are a helpful crypto assistant for SwiftyEx exchange.
                    Current USD/Naira rates: {rates_data}
                    User wallet balances: {wallet_data}
                    Recent transactions: {transaction_data}

                    Be brief, friendly and helpful. Answer crypto and finance questions.
                    You can help users understand their balances, explain transactions, 
                    calculate conversions, and give basic market insights."""
                },
                {
                    "role": "user", 
                    "content": user_message
                }
            ]
        )
        reply = response.choices[0].message.content
        await update.message.reply_text(reply)
    except Exception as e:
        print(str(e))
        await update.message.reply_text("⚠️ AI assistant unavailable right now. Try again later.")

# Conditionalt logic for the Menu at the bottom of the screen
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
    else:
        await ai_chat(update, context)
