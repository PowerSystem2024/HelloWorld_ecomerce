from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from config.urls import ENV, DEV_FRONTEND_URL, PROD_FRONTEND_URL

router = APIRouter(tags=["payment_callbacks"])

def get_frontend_url(path: str):
    if ENV == "development":
        return f"{DEV_FRONTEND_URL}/{path}"
    else:
        return f"{PROD_FRONTEND_URL}/{path}"  # URL del frontend desplegado

@router.get("/success")
async def payment_success():
    return RedirectResponse(get_frontend_url("success"))

@router.get("/failure")
async def payment_failure():
    return RedirectResponse(get_frontend_url("failure"))

@router.get("/pending")
async def payment_pending():
    return RedirectResponse(get_frontend_url("pending"))
