from fastapi import APIRouter
from fastapi.responses import RedirectResponse, HTMLResponse
from config.urls import ENV, DEV_FRONTEND_URL

router = APIRouter(tags=["payment_callbacks"])

def get_frontend_url(path: str):
    if ENV == "development":
        return f"{DEV_FRONTEND_URL}/{path}"
    else:
        return f"/{path}"  # En producción, React Router se encarga

@router.get("/success")
async def payment_success():
    url = get_frontend_url("success")
    if ENV == "development":
        return RedirectResponse(url)
    else:
        return HTMLResponse(open("frontend/dist/index.html").read(), status_code=200)

@router.get("/failure")
async def payment_failure():
    url = get_frontend_url("failure")
    if ENV == "development":
        return RedirectResponse(url)
    else:
        return HTMLResponse(open("frontend/dist/index.html").read(), status_code=200)

@router.get("/pending")
async def payment_pending():
    url = get_frontend_url("pending")
    if ENV == "development":
        return RedirectResponse(url)
    else:
        return HTMLResponse(open("frontend/dist/index.html").read(), status_code=200)
