from handlers import start, help_cmd, rates, balance, history, handle_menu, refresh_rates,error
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackQueryHandler
import os
from dotenv import load_dotenv
import logging

load_dotenv()

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)
logging.getLogger("httpx").setLevel(logging.WARNING)

bot_api=os.getenv("BOT_API_TOKEN")
def main():
    app = Application.builder().token(bot_api).build()

    app.add_handler(CommandHandler("start", start))
    app.add_error_handler(error)
    app.add_handler(CommandHandler("help", help_cmd))
    app.add_handler(CommandHandler("rates", rates))
    app.add_handler(CommandHandler("balance", balance))
    app.add_handler(CommandHandler("history", history))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_menu))
    app.add_handler(CallbackQueryHandler(refresh_rates, pattern="refresh_rates"))

    print("Bot is running...")
    app.run_polling()

if __name__=="__main__":
    main()