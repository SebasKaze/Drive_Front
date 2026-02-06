import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)        // auth.users
  const [profile, setProfile] = useState(null)  // tabla usuario
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 1️⃣ Obtener sesión inicial
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    // 2️⃣ Escuchar cambios de auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // 3️⃣ Cargar perfil cuando haya user
  useEffect(() => {
    if (!user) {
      setProfile(null)
      return
    }

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('usuario')
        .select('*')
        .eq('id_usuario', user.id)
        .single()

      if (!error) setProfile(data)
    }

    loadProfile()
  }, [user])

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.tipo === 'admin',
    signOut: () => supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook cómodo
export const useAuth = () => useContext(AuthContext)
