import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'

export default function ProductView() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'

  if (loading) return <div className="p-6 text-center">Cargando producto...</div>

  const prod = products.find(p => p.id === Number(id))
  const imageUrl = prod?.imageUrl ? `${BASE_URL}${prod.imageUrl}` : null; // o un placeholder "/images/default.png"

  if (!prod) return <div className="p-6">Producto no encontrado</div>

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-100 w-full bg-gray-50 flex items-center justify-center overflow-hidden" /* se podria agregar un borde: border-4 border-black */>
          {imageUrl ? (
            <img src={imageUrl} alt={prod.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400">Sin imagen</span>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-black">{prod.name}</h2>
          <p className="text-gray-600 mt-2">{prod.desc}</p>
          <p className="text-3xl font-extrabold mt-6">${prod.price.toFixed(2)}</p>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={() => { addToCart(prod); navigate('/cart') }}className="px-4 py-2 rounded-md bg-black text-white font-medium">Comprar</button>
            <button onClick={() => addToCart(prod, 1)} className="px-4 py-2 rounded-md border border-black text-black">Añadir al carrito</button>
          </div>
        </div>
      </div>
    </main>
  )
}
