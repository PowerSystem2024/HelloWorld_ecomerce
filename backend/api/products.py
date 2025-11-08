from fastapi import APIRouter

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("/")
def get_products():
    # Placeholder for fetching products from database
    return {"products": []}