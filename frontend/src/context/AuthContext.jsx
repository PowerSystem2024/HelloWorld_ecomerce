import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('user_v1')) || null } catch(e){ return null }
  })
  useEffect(()=> localStorage.setItem('user_v1', JSON.stringify(user)), [user])

  const login = (userObj, token) => {
    const mockUser = { 
      id: userObj.id, 
      name: userObj.name || userObj.email.split('@')[0] || 'Cliente', 
      lastName: userObj.lastName,
      email: userObj.email,
      phone: userObj.phone,
      token
    };
    setUser(mockUser);
  }


  const logout = () => setUser(null)

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
