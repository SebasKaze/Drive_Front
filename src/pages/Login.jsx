// src/pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material'

import { supabase } from '../supabase'

export default function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.correo,
      password: formData.password
    })

    if (error) {
      setError('Credenciales incorrectas')
      setLoading(false)
      return
    }

    const { data: perfil, error: perfilError } = await supabase
      .from('usuario')
      .select('tipo')
      .eq('id_usuario', data.user.id)
      .single()

    if (perfilError || !perfil) {
      setError('No se pudo cargar el perfil del usuario')
      setLoading(false)
      return
    }

    if (perfil.tipo === 'admin') {
      navigate('/admin')
    } else {
      navigate('/user')
    }

    setLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#C7E1FF' // Fondo azul muy claro
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 3,
          borderTop: '4px solid #f57c00' // Detalle naranja en la parte superior
        }}
      >
        {/* Título principal CMB Drive en naranja */}
        <Typography
          variant="h4"
          align="center"
          sx={{ color: '#f57c00', fontWeight: 'bold' }}
        >
          CMB Drive
        </Typography>

        <Typography
          variant="h5"
          align="center"
          fontWeight="medium"
          mt={1}
        >
          Iniciar Sesión
        </Typography>

        <Typography
          variant="body2"
          align="center"
          mb={3}
          color="text.secondary"
        >
          Accede a tu espacio de trabajo
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo"
            name="correo"
            fullWidth
            margin="normal"
            value={formData.correo}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2' // Borde azul al enfocar
                }
              }
            }}
          />

          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2' // Borde azul al enfocar
                }
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 'bold',
              bgcolor: '#f57c00', // Naranja principal
              '&:hover': {
                bgcolor: '#e65100' // Naranja más oscuro al pasar el mouse
              }
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Entrar'
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}