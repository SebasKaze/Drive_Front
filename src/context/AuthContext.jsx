import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from "../supabase";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getInitialSession()

    // Escuchar cambios
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  // Cargar perfil cuando user cambie
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setProfile(null)
        return
      }

      setLoading(true)

      const { data, error } = await supabase
        .from("usuario")
        .select("*")
        .eq("id_usuario", user.id)
        .single()

      if (!error) setProfile(data)
      setLoading(false)
    }

    loadProfile()
  }, [user])

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.tipo === "admin",
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
