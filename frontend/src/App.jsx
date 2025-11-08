import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductView from './pages/ProductView'
import CartView from './pages/CartView'
import LoginView from './pages/LoginView'
import ProfileView from './pages/ProfileView'
import CheckoutView from './pages/CheckoutView'
import RegisterView from './pages/RegisterView'

export default function App(){
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <div className="pt-6">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product/:id' element={<ProductView/>} />
          <Route path='/cart' element={<CartView/>} />
          <Route path='/login' element={<LoginView/>} />
          <Route path='/profile' element={<ProfileView/>} />
          <Route path='/checkout' element={<CheckoutView/>} />
          <Route path='/register' element={<RegisterView/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
