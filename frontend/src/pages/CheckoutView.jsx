import { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useCart } from '../context/CartContext';

initMercadoPago('APP_USR-c275d43a-9e61-4b37-80f8-45a1f5aa9b77', {
  locale: 'es-AR'
});

export default function CheckoutView() {
  const { cart } = useCart();
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Mapear el carrito al formato esperado por el backend
      const itemsForMP = cart.map(p => ({
        title: p.name,
        quantity: p.qty,
        price: p.price
      }));

      const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'
      
      const response = await fetch(`${BASE_URL}/api/create-preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: itemsForMP })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || 'Error del servidor');

      if (data.id) setPreferenceId(data.id);
      else setError("No se pudo obtener el ID de la preferencia.");

    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      setError(error.message || "Error al conectar con el backend.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto max-w-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>

      <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-xl mb-2">Resumen del Pedido</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">No hay productos en el carrito.</p>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>
                  {item.qty} x ${item.price.toFixed(2)}
                </span>
              </div>
            ))}

            <hr className="my-2" />

            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>
                ${cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <div className="flex justify-center items-center h-20 mt-4">
          {!preferenceId ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading || cart.length === 0}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? 'Generando...' : 'Pagar Ahora'}
            </button>
          ) : (
            <Wallet
              initialization={{ preferenceId }}
              customization={{ texts: { valueProp: 'smart_option' } }}
            />
          )}
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );

}