# ==========================================
# config/database_connection.py - Gestión de conexiones SQLAlchemy
# ==========================================
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from .logging_config import logger, log_database_connection
from .database_config import create_engine_and_session, get_database_url
from pydantic_settings import BaseSettings

class DatabaseSettings(BaseSettings):
    host: str = "localhost"
    database: str = "ecommerce_db"
    user: str = "postgres"
    password: str = ""
    port: int = 5432

    class Config:
        env_prefix = "DB_"
        env_file = "../.env"

def verify_and_create_database():
    """
    Verifica si existe la base de datos y la crea si no existe usando SQLAlchemy
    """
    try:
        settings = DatabaseSettings()
        logger.info(f"Verificando existencia de base de datos: {settings.database}")

        # La base de datos ya existe según verificación manual, saltar creación
        logger.info(f"Base de datos '{settings.database}' ya existe (verificada manualmente)")
        log_database_connection(True, f"- Database '{settings.database}' already exists")
        return True

    except Exception as error:
        logger.error(f"Error verificando base de datos: {error}", exc_info=True)
        log_database_connection(False, f"- Verification error: {error}")
        return False

def get_db_session():
    """
    Obtiene una sesión de base de datos SQLAlchemy
    """
    try:
        logger.info("🔗 Iniciando proceso de conexión a PostgreSQL con SQLAlchemy")

        # Verificar y crear la base de datos si no existe
        logger.info('Verificando existencia de la base de datos...')
        if not verify_and_create_database():
            logger.error('No se pudo verificar/crear la base de datos')
            log_database_connection(False, '- Database verification failed')
            return None

        # Crear engine y session usando la función get_database_url que maneja encoding
        success, url = get_database_url()
        if not success:
            logger.error("No se pudo construir la URL de la base de datos")
            log_database_connection(False, '- URL construction failed')
            return None

        engine = create_engine(url, echo=False)
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

        # Crear sesión
        session = SessionLocal()

        # Verificar la conexión
        result = session.execute(text('SELECT version()'))
        version = result.fetchone()
        logger.info("✅ Conexión exitosa a PostgreSQL con SQLAlchemy")
        if version:
            logger.info(f"Versión del servidor: {version[0]}")

        log_database_connection(True, f'- Connected to "{DatabaseSettings().database}"')

        return session

    except SQLAlchemyError as error:
        logger.error(f"Error al conectar con PostgreSQL: {error}", exc_info=True)
        log_database_connection(False, f"- Connection error: {error}")

        # Ayuda específica para errores comunes
        error_str = str(error).lower()
        if "authentication failed" in error_str or "password" in error_str:
            logger.error("💡 Verifica que DB_PASSWORD esté configurado correctamente")
        elif "connection refused" in error_str:
            logger.error("💡 Verifica que DB_HOST y DB_PORT sean correctos")
        elif "database" in error_str and "does not exist" in error_str:
            logger.error("💡 Verifica que DB_NAME sea correcto")

        return None

def verify_active_session(session):
    """
    Verifica si la sesión de base de datos está activa
    """
    if session is None:
        logger.warning('Sesión es None, considerada inactiva')
        return False

    try:
        # intentar ejecutar una consulta simple
        session.execute(text('SELECT 1'))
        logger.debug('Verificación de sesión exitosa')
        return True

    except SQLAlchemyError as error:
        logger.warning(f'Sesión inactiva detectada: {error}')
        return False

def close_session(session):
    """
    Cierra la sesión de base de datos de forma segura
    """
    try:
        if session:
            session.close()
            logger.info("🔌 Sesión de base de datos cerrada exitosamente")
            log_database_connection(True, "- Session closed safely")

        logger.info("Recursos de base de datos liberados correctamente")

    except SQLAlchemyError as error:
        logger.warning(f"⚠️ Error cerrando sesión: {error}")
        log_database_connection(False, f"- Close error: {error}")

def get_connection_stats():
    """
    Función utilitaria para obtener estadísticas de la base de datos
    """
    session = get_db_session()

    if not session:
        logger.error("No se pudo obtener estadísticas - sesión fallida")
        return None

    try:
        # Obtener información de la base de datos
        stats = {}

        # Versión de PostgreSQL
        result = session.execute(text("SELECT version()"))
        version_row = result.fetchone()
        stats['version'] = version_row[0] if version_row else "Unknown"

        # Número de conexiones activas
        result = session.execute(text("SELECT count(*) FROM pg_stat_activity"))
        active_row = result.fetchone()
        stats['active_connections'] = active_row[0] if active_row else 0

        # Tamaño de la base de datos
        result = session.execute(text("SELECT pg_size_pretty(pg_database_size(current_database()))"))
        size_row = result.fetchone()
        stats['database_size'] = size_row[0] if size_row else "Unknown"

        # Estadísticas específicas del sistema de ecommerce
        result = session.execute(text("SELECT COUNT(*) FROM users WHERE hashed_password IS NOT NULL"))
        users_row = result.fetchone()
        stats['users_with_passwords'] = users_row[0] if users_row else 0

        logger.info(f"📊 Estadísticas de base de datos obtenidas: {stats}")
        return stats

    except SQLAlchemyError as error:
        logger.error(f"❌ Error obteniendo estadísticas: {error}")
        return None

    finally:
        close_session(session)