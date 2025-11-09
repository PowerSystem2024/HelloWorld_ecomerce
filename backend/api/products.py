from fastapi import APIRouter

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("")
def get_products():
    # Placeholder for fetching products from database
    products = [
        {
            "id": 1,
            "name": "Auriculares Bluetooth",
            "price": 50.00,
            "description": "Auriculares inalámbricos con cancelación de ruido",
            "imageUrl": "/uploads/auriculares-bluetooth.jpg"
        },
        {
            "id": 2,
            "name": "Camiseta Minimal",
            "price": 25.00,
            "description": "Camiseta básica de algodón orgánico",
            "imageUrl": "/uploads/camiseta-minimal.jpg"
        },
        {
            "id": 3,
            "name": "Zapatillas Urbanas",
            "price": 80.00,
            "description": "Zapatillas cómodas para uso diario",
            "imageUrl": "/uploads/zapatillas-urbanas.jpg"
        }
    ]
    return {"products": products}