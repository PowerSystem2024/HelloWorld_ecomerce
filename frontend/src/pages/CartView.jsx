import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function CartView(){
  const { cart, updateQty, removeFromCart, cartTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const goCheckout = () => {
    if(!user) return navigate('/login')
    navigate('/checkout')
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Carrito</h2>
      {cart.length === 0 ? (
        <div className="text-center py-6">
          <h3 className="text-xl font-semibold mb-4">Tu carrito está vacío.</h3>
          <Link
            to="/"
            className="px-4 py-2 rounded-md text-white"
            style={{ backgroundColor: '#ff6600' }}
          >
            Volver al catálogo
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map(it => (
            <div key={it.id} className="flex items-center justify-between border rounded p-3">
              <div>
                <div className="font-semibold text-black">{it.name}</div>
                <div className="text-sm text-gray-500">${it.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-3">
                <input type="number" min={1} value={it.qty} onChange={(e) => updateQty(it.id, parseInt(e.target.value || 0))} className="w-16 p-1 border rounded" />
                <button onClick={() => removeFromCart(it.id)} className="px-3 py-1 border rounded">Eliminar</button>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between font-bold text-black">
            <div>Total</div>
            <div>${(cartTotal).toFixed(2)}</div>
          </div>

          <div className="flex gap-3">
            <Link to="/" className="px-4 py-2 border rounded">Seguir comprando</Link>
            <button onClick={goCheckout} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: '#ff6600' }}>Finalizar compra</button>
          </div>
        </div>
      )}
    </main>
  )
}
