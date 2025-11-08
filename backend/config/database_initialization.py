# ==========================================
# config/database_initialization.py - Inicialización del esquema de base de datos con SQLAlchemy
# ==========================================
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError
from .logging_config import logger
from .database_config import create_engine_and_session
from models.user import Base

def create_tables():
    """
    Crea todas las tablas definidas en los modelos SQLAlchemy
    """
    try:
        logger.info('🏗️ Creando tablas de base de datos...')

        engine, _ = create_engine_and_session()
        if not engine:
            logger.error("No se pudo crear engine de base de datos")
            return False

        # Crear todas las tablas
        Base.metadata.create_all(bind=engine)

        logger.info('✅ Tablas creadas exitosamente')
        return True

    except SQLAlchemyError as error:
        logger.error(f"❌ Error creando tablas: {error}", exc_info=True)
        return False

def initialize_database():
    """
    Inicializa la base de datos con las tablas necesarias
    """
    logger.info("🚀 Inicializando base de datos del sistema de ecommerce...")

    try:
        # Crear tablas
        if not create_tables():
            logger.error("❌ Falló la creación de las tablas")
            return False

        logger.info("🎉 Base de datos inicializada correctamente")
        logger.info("📋 Resumen de inicialización:")
        logger.info("   - ✅ Tabla 'users' creada (id, email, hashed_password)")
        logger.info("   - ✅ Restricciones de unicidad aplicadas")

        return True

    except Exception as error:
        logger.error(f"❌ Error en inicialización de base de datos: {error}", exc_info=True)
        return False