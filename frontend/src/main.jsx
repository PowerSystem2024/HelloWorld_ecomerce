import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ProductProvider } from './context/ProductContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <BrowserRouter>
          <App />
        </BrowserRouter>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
)
