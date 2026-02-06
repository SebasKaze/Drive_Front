import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { supabase } from "../../supabase"



export default function CrearEmpresa() {

  const [form, setForm] = useState({
    empresa: "",
    nombre: "",
    correo: "",
    password: "",
    ruta: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // 0️⃣ Usuario autenticado
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) throw userError

      // 1️⃣ Crear EMPRESA
      const { data: empresa, error: empresaError } = await supabase
        .from("empresa")
        .insert({
          nombre: form.empresa,
          tipo: "empresa", // o "cliente", o lo que definas
        })
        .select()
        .single()

      if (empresaError) throw empresaError

      // 3️⃣ Crear CARPETA RAÍZ
      const { error: carpetaError } = await supabase
        .from("carpeta")
        .insert({
          nombre: form.ruta,
          padre: null,
          id_usuario_fk: user.id,
          
        })

      if (carpetaError) throw carpetaError

      console.log("✅ Empresa, usuario y carpeta raíz creados correctamente")
    } catch (err) {
      console.error("❌ Error al crear empresa:", err)
    }
  }


  


  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
    
      {/* CONTENIDO PRINCIPAL */}
      <Box sx={{ flexGrow: 1 }}>
        

        <Box sx={{ p: 4 }}>
          <Paper sx={{ maxWidth: 600, mx: "auto", p: 4 }}>
            <Typography variant="h5" fontWeight="bold" mb={3}>
              Crear Empresa
            </Typography>

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
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  fullWidth
                  required
                />

                <TextField
                  label="Ruta raíz de la empresa"
                  name="ruta"
                  value={form.ruta}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText="Ejemplo: /empresa1raiz"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                >
                  Crear Empresa
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
