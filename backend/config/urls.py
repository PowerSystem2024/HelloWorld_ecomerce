import os

ENV = os.getenv("ENV", "development")
DEV_FRONTEND_URL = os.getenv("DEV_FRONTEND_URL")
PROD_FRONTEND_URL = os.getenv("PROD_FRONTEND_URL")
DEV_BACKTEND_URL = os.getenv("DEV_BACKTEND_URL")
PROD_BACKEND_URL = os.getenv("PROD_BACKEND_URL")
