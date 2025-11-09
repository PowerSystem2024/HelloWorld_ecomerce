import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useProducts } from '../context/ProductContext'

export default function Home() {
  const { addToCart } = useCart()
  const { visibleProducts, loading, currentPage, setCurrentPage, products, pageSize } = useProducts()

  if (loading) return <p className="p-6 text-center">Cargando productos...</p>

  const hasMore = products.length > currentPage * pageSize

  return (
    <main className="max-w-6xl mx-auto p-6">
      <section className="mb-8">
        <h2 className="text-3xl font-bold text-black">Catálogo</h2>
        <p className="text-gray-600">Productos destacados</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleProducts.map(p => {
           const imageUrl = p.imageUrl ? `${p.imageUrl}` : null
           console.log('Product:', p.name, 'Image URL:', imageUrl)

           return (
             <article key={p.id} className="border rounded-lg p-4 bg-white shadow-sm">
               <div className="h-80 w-full bg-gray-50 mb-4 flex items-center justify-center overflow-hidden">
                 {imageUrl ? (
                   <img src={imageUrl} alt={p.name} className="w-full h-full object-cover" onError={(e) => console.error('Image load error for', p.name, 'URL:', imageUrl)} />
                 ) : (
                   <span className="text-gray-400">Sin imagen</span>
                 )}
               </div>


              <h3 className="text-xl font-semibold text-black">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <strong className="text-lg">${p.price.toFixed(2)}</strong>
                <div className="flex gap-2">
                  <Link to={`/product/${p.id}`} className="px-3 py-1 border rounded-md text-black">Ver</Link>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-3 py-1 rounded-md text-white"
                    style={{ backgroundColor: '#ff6600' }}
                  >
                    Añadir
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 rounded-md bg-black text-white"
          >
            Cargar más
          </button>
        </div>
      )}
    </main>
  )
}
