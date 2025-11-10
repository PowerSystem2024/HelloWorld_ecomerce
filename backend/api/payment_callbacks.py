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
    return RedirectResponse(get_frontend_url("success"))

@router.get("/failure")
async def payment_failure():
    return RedirectResponse(get_frontend_url("failure"))

@router.get("/pending")
async def payment_pending():
    return RedirectResponse(get_frontend_url("pending"))
