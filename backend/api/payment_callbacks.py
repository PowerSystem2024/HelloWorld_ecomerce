from fastapi import APIRouter
from fastapi.responses import RedirectResponse
from config.urls import ENV, DEV_FRONTEND_URL, PROD_FRONTEND_URL

router = APIRouter(tags=["payment_callbacks"])

def get_front_urls():
    if ENV == "development":
        base = DEV_FRONTEND_URL.rstrip("/") + "/"  # asegura la barra final
    else:
        base = PROD_FRONTEND_URL.rstrip("/") + "/"  # asegura la barra final
    # Usamos la raíz y query param, no /success literal
    return {
        "success": f"{base}?status=success",
        "failure": f"{base}?status=failure",
        "pending": f"{base}?status=pending",
    }

@router.get("/success")
async def payment_success():
    urls = get_front_urls()
    return RedirectResponse(urls["success"])

@router.get("/failure")
async def payment_failure():
    urls = get_front_urls()
    return RedirectResponse(urls["failure"])

@router.get("/pending")
async def payment_pending():
    urls = get_front_urls()
    return RedirectResponse(urls["pending"])