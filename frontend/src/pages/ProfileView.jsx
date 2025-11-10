import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function ProfileView() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="text-center py-6">
        <h3 className="text-xl font-semibold mb-4">No estás logueado.</h3>
        <Link
          to="/login"
          className="px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: '#ff6600' }}
        >
          Iniciar sesión
        </Link>
      </div>
    )
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold">Perfil</h2>
      <div className="mt-4 space-y-3">
        <div>
          <div className="text-sm text-gray-600">Nombre</div>
          <div className="font-medium text-black">{user.name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Apellido</div>
          <div className="font-medium text-black">{user.lastName}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Email</div>
          <div className="font-medium text-black">{user.email}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Teléfono</div>
          <div className="font-medium text-black">{user.phone || 'No proporcionado'}</div>
        </div>
      </div>
    </main>
  )
}
