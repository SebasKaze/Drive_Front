import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Alert,
} from "@mui/material";

import { supabase } from "../../supabase";

export default function CrearEmpresa() {
  const [form, setForm] = useState({
    empresa: "",
    nombre: "",
    correo: "",
    ruta: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) throw new Error("Usuario no autenticado");

      const res = await fetch(
        "https://drivebacksup.onrender.com/empresa/crear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            empresa_nombre: form.empresa,
            empresa_tipo: "empresa",
            usuario_nombre: form.nombre,
            usuario_email: form.correo,
            usuario_tipo: "user",
            carpeta_nombre: form.ruta,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al crear empresa");
      }

      setSuccess(true);
      setForm({
        empresa: "",
        nombre: "",
        correo: "",
        ruta: "",
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ p: 4 }}>
          <Paper sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Crear Empresa
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Empresa y usuario creados correctamente.  
                El usuario podrá establecer su contraseña desde su correo.
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Nombre de la empresa"
                  name="empresa"
                  value={form.empresa}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Nombre del responsable"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  value={form.correo}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Nombre de la carpeta raíz"
                  name="ruta"
                  value={form.ruta}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText="Ejemplo: Empresa ABC"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? "Creando..." : "Crear Empresa"}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
