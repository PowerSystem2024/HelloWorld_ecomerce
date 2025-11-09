import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // cantidad de productos por página

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('Fetching products from /api/products');
        const res = await fetch('/api/products');
        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers);
        const data = await res.json();
        console.log('Fetched data:', data);

        if (data.error) throw new Error(data.error);

        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProducts([]); // Fallback por si hay error
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Productos visibles según la página actual
  const visibleProducts = products.slice(0, currentPage * pageSize);

  return (
    <ProductContext.Provider value={{
      products,
      setProducts,
      loading,
      currentPage,
      setCurrentPage,
      pageSize,
      setPageSize,
      visibleProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
