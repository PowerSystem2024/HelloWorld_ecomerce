import os

ENV = os.getenv("ENV", "development").strip() # development or production
DEV_FRONTEND_URL = "http://localhost:5173"
PROD_FRONTEND_URL = "https://unveneered-looped-josephine.ngrok-free.dev"
BACK_URL = "https://unveneered-looped-josephine.ngrok-free.dev"