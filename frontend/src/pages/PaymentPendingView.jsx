import { Link } from 'react-router-dom'

export default function PaymentPendingView() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <div className="bg-yellow-100 border border-yellow-300 rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-yellow-700 mb-2">Pago en proceso</h1>
        <p className="text-gray-700 mb-6">
          Tu pago está siendo verificado. Recibirás una notificación cuando se confirme.
        </p>
        <Link
          to="/"
          className="px-6 py-2 rounded-md text-white bg-yellow-600 hover:bg-yellow-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}
