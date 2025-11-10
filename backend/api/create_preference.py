from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, HTTPException
from config.mercadopago_sdk import sdk
from config.urls import ENV, BACK_URL, PROD_FRONTEND_URL

class Item(BaseModel):
    title: str
    quantity: int
    price: float

class ItemsRequest(BaseModel):
    items: List[Item]

router = APIRouter(prefix="/api/create-preference", tags=["payments"])

def get_back_urls():
    if ENV == "development":
        base = BACK_URL
    else:
        base = PROD_FRONTEND_URL
    return {
        "success": f"{base}/success",
        "failure": f"{base}/failure",
        "pending": f"{base}/pending",
    }

@router.post("")
async def create_preference(request: ItemsRequest):
    if not sdk:
        raise HTTPException(status_code=500, detail="El SDK de Mercado Pago no está configurado")
    
    try:
        mp_items = [
            {
                "title": item.title,
                "quantity": item.quantity,
                "unit_price": item.price,
                "currency_id": "ARS",
            }
            for item in request.items
        ]


        preference_data = {
            "items": mp_items,
            "back_urls": get_back_urls(),
            "auto_return": "approved",
        }


        preference_response = sdk.preference().create(preference_data)
        print("Respuesta de Mercado Pago:", preference_response)

        if preference_response.get("status") in [200, 201]:
            preference_id = preference_response.get("response", {}).get("id")
            if not preference_id:
                raise HTTPException(status_code=500, detail="No se pudo obtener 'id' de la respuesta de MP")
            return {"id": preference_id}
        else:
            error_message = preference_response.get("response", {}).get("message", "Error desconocido de MP")
            raise HTTPException(status_code=preference_response.get("status", 400), detail=error_message)

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(f"Error detallado en create_preference: {e}") 
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {e}")
