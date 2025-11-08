import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginView(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const submit = async () => {
    if (!email || !password) return alert("Completá email y contraseña");

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        return alert(data.detail || "Error de autenticación");
      }

      login(data.user, data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };


  return (
    <main className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <input value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="tu@correo.com" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded mb-4" placeholder="Contraseña" />
      <div className="flex gap-3">
        <button onClick={submit} className="px-4 py-2 rounded-md bg-black text-white">Ingresar</button>
        <button onClick={() => navigate('/')} className="px-4 py-2 rounded border">Volver</button>
        <button onClick={() => navigate("/register")} className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: '#ff6600' }}>Registrarse</button>

      </div>
    </main>
  )
}
