from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from pathlib import Path
import logging
import os
from api import products, login, register, create_preference, webhook
from config.database import engine, Base
from config.database_initialization import initialize_database
from api.payment_callbacks import router as callbacks_router
from config.urls import DEV_FRONTEND_URL, PROD_FRONTEND_URL

# Initialize database on startup
try:
    if engine:
        initialize_database()
except Exception as e:
    print(f"Warning: Could not initialize database: {e}")

app = FastAPI()


# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=[PROD_FRONTEND_URL, DEV_FRONTEND_URL],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads/images
app.mount("/uploads", StaticFiles(directory="uploads"), name="images")

# Include routers
app.include_router(products.router)
app.include_router(login.router)
app.include_router(register.router)
app.include_router(create_preference.router)
app.include_router(webhook.router)
app.include_router(callbacks_router)
