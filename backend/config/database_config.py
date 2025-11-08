# ==========================================
# config/database_config.py - Configuración de base de datos con SQLAlchemy
# ==========================================
import os
import sys
from pydantic_settings import BaseSettings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from .logging_config import logger

class DatabaseSettings(BaseSettings):
    host: str = "127.0.0.1"
    database: str = "ecommerce_db"
    user: str = "postgres"
    password: str = ""
    port: int = 5432

    class Config:
        env_prefix = "DB_"
        env_file = "../.env"

def get_database_url():
    """
    Construye la URL de conexión para SQLAlchemy
    """
    try:
        settings = DatabaseSettings()
        # URL encode the password to handle special characters like @
        from urllib.parse import quote_plus
        encoded_password = quote_plus(settings.password)
        url = f"postgresql://{settings.user}:{encoded_password}@{settings.host}:{settings.port}/{settings.database}"

        # Validar que password esté presente
        if not settings.password:
            error_msg = "❌ DB_PASSWORD no está configurado"
            logger.error(error_msg)
            return False, error_msg

        logger.info("✅ URL de base de datos construida correctamente")
        return True, url

    except Exception as e:
        error_msg = f"❌ Error construyendo URL de base de datos: {e}"
        logger.error(error_msg)
        return False, error_msg

def create_engine_and_session():
    """
    Crea el engine de SQLAlchemy y la sesión
    """
    success, url = get_database_url()
    if not success:
        return None, None

    try:
        engine = create_engine(url, echo=False)  # echo=False para no mostrar queries en producción
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

        logger.info("✅ Engine y sesión de SQLAlchemy creados correctamente")
        return engine, SessionLocal

    except Exception as e:
        logger.error(f"❌ Error creando engine de SQLAlchemy: {e}")
        return None, None

def get_environment_info():
    """
    Información sobre el entorno actual
    """
    try:
        settings = DatabaseSettings()
        env_info = {
            'environment': os.getenv('ENVIRONMENT', 'development'),
            'db_host': settings.host,
            'db_name': settings.database,
            'db_user': settings.user,
            'db_port': settings.port,
            'password_configured': bool(settings.password),
            'python_version': sys.version,
            'working_directory': os.getcwd()
        }

        logger.info("🌍 Información del entorno:")
        for key, value in env_info.items():
            logger.info(f'  -{key}: {value}')

        return env_info

    except Exception as e:
        logger.error(f"Error obteniendo información del entorno: {e}")
        return None

def test_environment_setup():
    """
    Prueba la configuración del entorno
    """
    logger.info("🧪 Probando configuración del entorno...")

    success, url = get_database_url()

    if success:
        logger.info("✅ Configuración del entorno correcta")
        return True
    else:
        logger.error("❌ Problemas con la configuración del entorno")
        return False