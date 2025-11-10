import os

# Determina si se está ejecutando en desarrollo o producción
ENV = os.getenv("ENV", "development").strip()  # development or production

# URLs del frontend y backend según el entorno
DEV_FRONTEND_URL = os.getenv("DEV_FRONTEND_URL", "http://localhost:5173")
PROD_FRONTEND_URL = os.getenv("PROD_FRONTEND_URL", "https://unveneered-looped-josephine.ngrok-free.dev")
BACK_URL = "https://unveneered-looped-josephine.ngrok-free.dev"
