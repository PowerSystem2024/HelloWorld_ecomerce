import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function RegisterView() {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000'

  const submit = async () => {
    if (!name || !lastName || !email || !password || !confirmPassword) 
      return alert("Completá todos los campos obligatorios");

    if (password !== confirmPassword) 
        return alert("Las contraseñas no coinciden")

    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastName, phone, email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        return alert(data.detail || "Error en el registro")
      }

      login(data.user, data.token)
      navigate("/")
    } catch (err) {
      console.error(err)
      alert("Error de conexión")
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
      <input value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="Nombre" />
      <input value={lastName} onChange={e => setLastName(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="Apellido" />
      <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="Teléfono (opcional)" />
      <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="tu@correo.com" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="Contraseña" />
      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="Confirmar Contraseña" />


      <div className="flex gap-3">
        <button onClick={submit} className="px-4 py-2 rounded-md bg-black text-white">Registrarse</button>
        <button onClick={() => navigate("/login")} className="px-4 py-2 rounded border">Volver al login</button>
      </div>
    </main>
  )
}
