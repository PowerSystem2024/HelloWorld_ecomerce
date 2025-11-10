import os
import mercadopago
from dotenv import load_dotenv
from pathlib import Path

dotenv_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path)

TEST_ACCESS_TOKEN = os.getenv("TEST_ACCESS_TOKEN")
sdk = mercadopago.SDK(TEST_ACCESS_TOKEN) if TEST_ACCESS_TOKEN else None

if not sdk:
    print("Warning: Mercado Pago SDK no configurado. Revisa tu .env")
