// src/pages/PaymentSuccessView.jsx
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function PaymentSuccessView() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <div className="bg-green-100 border border-green-300 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-green-700 mb-2">¡Pago exitoso!</h1>
        <p className="text-gray-700 mb-6">
          Tu compra fue procesada correctamente. Recibirás los detalles por correo electrónico.
        </p>
        <Link
          to="/"
          className="px-6 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
