# ==========================================
# config/database.py - Configuración de base de datos para FastAPI
# ==========================================
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .database_config import create_engine_and_session

# Crear engine y sessionmaker
engine, SessionLocal = create_engine_and_session()

# Base para modelos
Base = declarative_base()

def get_db():
    """
    Dependencia para obtener sesión de base de datos en FastAPI
    """
    if SessionLocal is None:
        raise RuntimeError("Database session not configured. Check database configuration.")
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()