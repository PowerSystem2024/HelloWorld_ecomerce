from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel
from config.database import get_db
from models.user import User

router = APIRouter(prefix="/api/register", tags=["auth"])

class RegisterRequest(BaseModel):
    name: str
    lastName: str
    phone: str
    email: str
    password: str

@router.post("")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == request.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash the password
        hashed_password = User.hash_password(request.password)

        # Create new user
        user = User(
            name=request.name,
            lastName=request.lastName,
            phone=request.phone,
            email=request.email,
            hashed_password=hashed_password
        )

        # Save to database
        db.add(user)
        db.commit()
        db.refresh(user)

        # Return success response without password
        return {
            "message": "User registered successfully",
            "user": {
                "id": user.id,
                "name": user.name,
                "lastName": user.lastName,
                "phone": user.phone,
                "email": user.email
            }
        }

    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")
    except Exception as e:
        db.rollback()
        if "400" in str(e):
            raise HTTPException(status_code=400, detail="Email already registered")
        raise HTTPException(status_code=500, detail=f"Registration failed: {str(e)}")