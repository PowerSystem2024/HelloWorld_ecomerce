import { useAuth } from '../context/AuthContext'

export default function ProfileView(){
  const { user } = useAuth()
  if(!user) return <div className="p-6">No estás logueado</div>
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
