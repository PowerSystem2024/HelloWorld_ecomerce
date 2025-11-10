import os
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path)

WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET") # la clave secreta de tu app en Mercado Pago

if not WEBHOOK_SECRET:
    print("Warning: Mercado Pago Webhook no configurado. Revisa tu .env")