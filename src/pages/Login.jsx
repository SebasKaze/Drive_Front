import { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';

export default function Login() {
  const backConection = import.meta.env.VITE_BACK_URL;

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${backConection}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'Error en el login');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#f3f4f6'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 400,
          width: '100%',
          p: 4,
          borderRadius: 3
        }}
      >
        <Typography variant="h4" align="center" fontWeight="bold" mb={1}>
          Iniciar Sesión
        </Typography>
        <Typography variant="body2" align="center" mb={3} color="text.secondary">
          Accede a tu espacio de trabajo
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Usuario"
            name="username"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.4,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1e40af, #7e22ce)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1e3a8a, #6b21a8)'
              }
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Entrar al Sistema'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
