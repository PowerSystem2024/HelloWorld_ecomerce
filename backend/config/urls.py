import os

ENV = os.getenv("ENV", "development")
DEV_FRONTEND_URL = os.getenv("DEV_FRONTEND_URL")
PROD_FRONTEND_URL = os.getenv("PROD_FRONTEND_URL")
BACK_URL = os.getenv("BACK_URL")
