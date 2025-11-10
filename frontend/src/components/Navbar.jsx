import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { usePayment } from '../context/PaymentContext'

export default function Navbar(){
  const { cart, cartQty, clearCart } = useCart()
  const { user, logout } = useAuth()
  const { setPaymentStatus } = usePayment()  // accedemos al contexto

  const handleHomeClick = () => {
    setPaymentStatus(null)  // limpia el estado para que PaymentHandler renderice Home
  }


  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#ff6600' }}>E</div>
          <Link to="/" className="text-black font-semibold text-lg" onClick={handleHomeClick}>MundoCommerce</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="flex items-center gap-2 px-3 py-2 rounded-md border border-black text-black" onClick={handleHomeClick}>🛒 {cartQty}</Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="px-3 py-2 rounded-md text-black" onClick={handleHomeClick}>{user.name}</Link>
              <button onClick={() => {logout(); clearCart();}} className="px-3 py-2 rounded-md bg-black text-white font-medium">Cerrar</button>
            </div>
          ) : (
            <Link to="/login" className="px-3 py-2 rounded-md bg-black text-white font-medium" onClick={handleHomeClick}>Ingresar</Link>
          )}
        </div>
      </div>
    </header>
  )
}
