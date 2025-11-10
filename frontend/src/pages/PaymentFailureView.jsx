import { Link } from 'react-router-dom'

export default function PaymentFailureView() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <div className="bg-red-100 border border-red-300 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-red-700 mb-2">Pago fallido</h1>
        <p className="text-gray-700 mb-6">
          Hubo un problema al procesar tu pago. Intentá nuevamente o probá con otro método.
        </p>
        <Link
          to="/"
          className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
