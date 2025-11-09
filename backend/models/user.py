from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from passlib.context import CryptContext

Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    lastName = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

    @staticmethod
    def hash_password(password: str) -> str:
        return pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, str(self.hashed_password))