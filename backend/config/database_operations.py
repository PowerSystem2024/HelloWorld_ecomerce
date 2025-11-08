# ==========================================
# config/database_operations.py - Operaciones CRUD de base de datos para usuarios con SQLAlchemy
# ==========================================
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy import text
from .logging_config import logger
from ..models.user import User

def create_user(session: Session, email: str, password: str):
    """
    Crea un nuevo usuario con email y contraseña hasheada
    """
    try:
        logger.info(f"Creando usuario con email: {email}")

        # Verificar si el email ya existe
        existing_user = session.query(User).filter(User.email == email).first()
        if existing_user:
            return {"error": "El email ya está registrado", "type": "duplicate_email"}

        # Hashear la contraseña
        hashed_password = User.hash_password(password)

        # Crear nuevo usuario
        new_user = User(email=email, hashed_password=hashed_password)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)

        logger.info(f"Usuario creado con ID: {new_user.id}")
        return {"user_id": new_user.id, "email": new_user.email}

    except IntegrityError as error:
        session.rollback()
        logger.error(f"Error de integridad creando usuario: {error}")
        if 'email' in str(error).lower():
            return {"error": "El email ya está registrado", "type": "duplicate_email"}
        else:
            return {"error": "Violación de restricción de unicidad", "type": "duplicate_constraint"}

    except SQLAlchemyError as error:
        session.rollback()
        logger.error(f"Error creando usuario: {error}")
        return {"error": "Error interno del servidor", "type": "internal_error"}

def authenticate_user(session: Session, email: str, password: str):
    """
    Autentica un usuario por email y contraseña
    """
    try:
        logger.info(f"Autenticando usuario: {email}")

        # Buscar usuario por email
        user = session.query(User).filter(User.email == email).first()
        if not user:
            logger.warning(f"No se encontró usuario con email: {email}")
            return None

        # Verificar contraseña
        if not user.verify_password(password):
            logger.warning(f"Contraseña incorrecta para email: {email}")
            return None

        # Usuario autenticado exitosamente
        user_data = {
            'id': user.id,
            'email': user.email,
            'created_at': user.created_at.isoformat() if user.created_at is not None else None
        }

        logger.info(f"Usuario autenticado exitosamente: {email}")
        return user_data

    except SQLAlchemyError as error:
        logger.error(f"Error autenticando usuario: {error}")
        return None

def get_user_by_email(session: Session, email: str):
    """
    Obtiene un usuario por email
    """
    try:
        logger.debug(f"Buscando usuario por email: {email}")

        user = session.query(User).filter(User.email == email).first()
        if not user:
            return None

        return {
            'id': user.id,
            'email': user.email,
            'created_at': user.created_at.isoformat() if user.created_at is not None else None
        }

    except SQLAlchemyError as error:
        logger.error(f"Error obteniendo usuario por email: {error}")
        return None

def get_user_by_id(session: Session, user_id: int):
    """
    Obtiene un usuario por ID
    """
    try:
        logger.debug(f"Buscando usuario por ID: {user_id}")

        user = session.query(User).filter(User.id == user_id).first()
        if not user:
            return None

        return {
            'id': user.id,
            'email': user.email,
            'created_at': user.created_at.isoformat() if user.created_at is not None else None
        }

    except SQLAlchemyError as error:
        logger.error(f"Error obteniendo usuario por ID: {error}")
        return None