from fastapi import Request, Header, HTTPException, APIRouter
import hmac
import hashlib
import urllib.parse
from config.mercadopago_sdk import sdk
from config.mercadopago_webhook import WEBHOOK_SECRET


router = APIRouter(prefix="/api/webhook", tags=["webhook"])

@router.post("")
async def mp_webhook(request: Request):
    """
    Endpoint para recibir notificaciones de Mercado Pago.
    Valida la firma y consulta el estado del pago.
    """

    x_signature = request.headers.get("x-signature")
    x_request_id = request.headers.get("x-request-id")

    if not x_signature or not x_request_id:
        raise HTTPException(status_code=400, detail="Headers de firma faltantes")

    # Parsear query params
    query_params = urllib.parse.parse_qs(request.url.query)
    data_id = query_params.get("data.id", [""])[0]
    if not data_id:
        raise HTTPException(status_code=400, detail="data.id faltante en query params")

    # Separar x-signature
    ts = None
    v1_hash = None

    for part in x_signature.split(","):
        key, _, value = part.partition("=")
        if key.strip() == "ts":
            ts = value.strip()
        elif key.strip() == "v1":
            v1_hash = value.strip()

    if not ts or not v1_hash:
        raise HTTPException(status_code=400, detail="x-signature inválida")

    # Crear el template para HMAC
    manifest = f"id:{data_id};request-id:{x_request_id};ts:{ts};"

    hmac_obj = hmac.new(WEBHOOK_SECRET.encode(), msg=manifest.encode(), digestmod=hashlib.sha256)
    calculated_hash = hmac_obj.hexdigest()

    if calculated_hash != v1_hash:
        raise HTTPException(status_code=403, detail="Firma HMAC inválida")

    # Consultar el pago en Mercado Pago
    payment = sdk.payment().get(data_id)
    payment_status = payment["status"]  # approved, pending, rejected

    # Aquí podés actualizar tu frontend o estado del carrito
    print(f"Pago {data_id} actualizado. Estado: {payment_status}")

    # Responder a Mercado Pago
    return {"status": "ok", "payment_id": data_id, "payment_status": payment_status}
