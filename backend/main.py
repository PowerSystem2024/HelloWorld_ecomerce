from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import products, login
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

# Include routers
app.include_router(products.router)
app.include_router(login.router)

@app.get("/")
def read_root():
    return {"message": "Hello World"}