from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
from config.database import get_db
from models.user import User

class LoginRequest(BaseModel):
    email: str
    password: str

router = APIRouter(prefix="/api/login", tags=["auth"])

@router.get("/", response_class=HTMLResponse)
def get_login_form():
    html_content = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <h1>Login</h1>
        <form action="/api/login" method="post">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br><br>
            <button type="submit">Login</button>
        </form>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@router.post("")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    import logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    email = request.email
    password = request.password
    logger.info(f"Attempting login for email: {email}")
    try:
        user = db.query(User).filter(User.email == email).first()
        logger.info(f"User query completed for {email}")

        if not user or not user.verify_password(request.password):
            raise HTTPException(status_code=401, detail="Invalid credentials")
    
    except Exception as e:
        logger.error(f"Database error during login for {email}: {str(e)}")
        raise

    # Return success response without password
    user = {
            "id": user.id,
            "name": user.name,
            "lastName": user.lastName,
            "phone": user.phone,
            "email": user.email
        }

    # For now, return simple response without JWT since settings are not available
    return {"user": user, "message": "Login successful"}