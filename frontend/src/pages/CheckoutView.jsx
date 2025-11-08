import { useState } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// 1. INICIALIZA MERCADO PAGO (SOLO UNA VEZ)
// REEMPLAZA ESTO con tu CLAVE PÚBLICA (Public Key) de Mercado Pago
initMercadoPago('APP_USR-4b8dc1d0-f2db-4da1-80f9-93e9b20c0089', {
  locale: 'es-AR' // Opcional: define el idioma
});

export default function CheckoutView() {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- TODO: Reemplaza esto con los datos de tu carrito ---
  // Estos datos deberían venir de tu estado global (Context, Zustand, Redux)
  // o ser pasados desde la página del carrito (CartView).
  // Por ahora, usamos datos de prueba para verificar que la conexión funciona.
  const productData = {
    title: 'Mi Producto de Prueba',
    quantity: 1, // O la cantidad total de items
    price: 150.50  // Asegúrate que este sea el PRECIO TOTAL del carrito
  };
  // ---------------------------------------------------------

  /**
   * Esta función llama a tu backend (FastAPI) para crear la preferencia
   */
  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 2. Llama a tu backend (FastAPI)
      const response = await fetch('http://localhost:8000/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData) // Envía los datos del producto
      });

      const data = await response.json();

      if (!response.ok) {
         // Si FastAPI devuelve un error (ej. 500 o 400)
         throw new Error(data.detail || 'Error del servidor');
      }

      if (data.id) {
        // 3. Si todo sale bien, guardamos el ID de la preferencia
        setPreferenceId(data.id);
      } else {
         setError("No se pudo obtener el ID de la preferencia.");
      }

    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      setError(error.message || "Error al conectar con el backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Tailwind ya está en tu App.jsx, así que usamos sus clases
    <div className="container mx-auto max-w-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Finalizar Compra</h1>
      
      <div className="border p-4 rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-xl mb-2">Resumen del Pedido</h2>
        <p><span className="font-semibold">{productData.title}</span></p>
        <p>Cantidad: {productData.quantity}</p>
        <p className="font-bold text-lg mt-2">Total: ${productData.price}</p>

        <hr className="my-4" />

        {/* Aquí está la lógica:
          - Si NO hay preferenceId, muestra tu botón "Pagar".
          - Si SÍ hay preferenceId, muestra el botón de Mercado Pago.
        */}
        <div className="flex justify-center items-center h-20">
          {!preferenceId ? (
            <button 
              onClick={handleCheckout} 
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              {isLoading ? 'Generando...' : 'Pagar Ahora'}
            </button>
          ) : (
            <Wallet 
              initialization={{ preferenceId: preferenceId }} 
              customization={{ texts: { valueProp: 'smart_option' }}}
            />
          )}
        </div>
        
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}