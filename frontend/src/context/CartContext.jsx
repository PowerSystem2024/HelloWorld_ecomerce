import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }){
  const [cart, setCart] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('cart_v1')) || [] } catch (e){ return [] }
  })
  useEffect(()=> localStorage.setItem('cart_v1', JSON.stringify(cart)), [cart])

  const addToCart = (product, qty=1) => {
    setCart(c=> {
      const found = c.find(it => it.id === product.id)
      if (found) return c.map(it => it.id === product.id ? { ...it, qty: it.qty + qty } : it)
      return [...c, { ...product, qty }]
    })
  }

  const removeFromCart = id => setCart(c => c.filter(it => it.id !== id))
  const updateQty = (id, qty) => { if(qty <= 0) return removeFromCart(id); setCart(c => c.map(it => it.id === id ? { ...it, qty } : it)) }
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart_v1');
  };

  const cartTotal = cart.reduce((s, p) => s + p.price * p.qty, 0)
  const cartQty = cart.reduce((sum, item) => sum + item.qty, 0)
  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, cartTotal, cartQty, setCart }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
