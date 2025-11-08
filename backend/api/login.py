from fastapi import APIRouter, HTTPException, Depends, Form
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from config.database import get_db
from models.user import User

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

@router.post("/")
def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    import logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger(__name__)
    logger.info(f"Attempting login for email: {email}")
    try:
        user = db.query(User).filter(User.email == email).first()
        logger.info(f"User query completed for {email}")
        if user:
            if not user.verify_password(password):
                raise HTTPException(status_code=401, detail="Invalid credentials")
        else:
            logger.info(f"Creating new user for {email}")
            hashed_password = User.hash_password(password)
            user = User(email=email, hashed_password=hashed_password)
            db.add(user)
            logger.info(f"User added to session for {email}")
            db.commit()
            logger.info(f"Commit successful for {email}")
            db.refresh(user)
            logger.info(f"User refresh completed for {email}")
    except Exception as e:
        logger.error(f"Database error during login for {email}: {str(e)}")
        raise

    # For now, return simple response without JWT since settings are not available
    return {"user": {"id": user.id, "email": user.email}, "message": "Login successful"}