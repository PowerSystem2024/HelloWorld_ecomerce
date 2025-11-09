from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from pathlib import Path
import logging
import os
from api import products, login, register
from config.database import engine, Base
from config.database_initialization import initialize_database

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
    allow_origins=["http://localhost:5173"],  # Frontend URL
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

@app.get("/{path:path}")
def serve_spa(path: str):
    logging.info(f"Serving SPA for path: {path}")
    if path.startswith("images/"):
        file_path = os.path.join("uploads", path[len("images/"):])
        if Path(file_path).exists() and Path(file_path).is_file():
            return FileResponse(file_path)
    file_path = Path("../frontend/dist") / path
    logging.info(f"Checking file path: {file_path}")
    if file_path.exists() and file_path.is_file():
        logging.info(f"File exists, serving: {file_path}")
        return FileResponse(file_path)
    else:
        logging.info("File not found, serving index.html")
        index_path = Path("../frontend/dist/index.html")
        logging.info(f"Index path: {index_path}, exists: {index_path.exists()}")
        try:
            with open("../frontend/dist/index.html", "r") as f:
                html_content = f.read()
            return HTMLResponse(content=html_content)
        except FileNotFoundError as e:
            logging.error(f"FileNotFoundError: {e}")
            raise e