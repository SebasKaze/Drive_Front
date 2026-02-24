// pages/DashboardAdmin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Importar useNavigate
import {
  Box,
  Grid,
  Paper,
  Typography,
  useTheme,
  alpha,
  Button,
  Stack,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";

import { supabase } from "../supabase";


export default function DashboardAdmin() {
  //INICIALIZACIONES
  const theme = useTheme();
  const navigate = useNavigate(); // 2. Inicializar navigate
  const [carpetaUsuario, setCarpetaUsuario] = useState(null);
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    const fetchCarpetaUsuario = async () => {
      setLoading(true);

      // 1️⃣ Obtener usuario logueado
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("No hay usuario autenticado");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("carpeta")
        .select("id_carpeta, nombre, fecha_creacion")
        .eq("id_usuario_fk", user.id)
        .is("padre", null)
        .maybeSingle();

      if (error) {
        console.error("Error cargando carpeta del usuario:", error);
        setLoading(false);
        return;
      }

      if (data) {
        setCarpetaUsuario(data);
      }

      setLoading(false);
    };

    fetchCarpetaUsuario();
  }, [navigate]);

  const handleOpenCarpeta = (carpetaId) => {
    navigate(`/dashboard/carpeta/${carpetaId}`);
  };

  return (
    <Box sx={{ animation: "fadeIn 0.5s ease-in" }}>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: `1px solid ${theme.palette.divider}`,
        }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <PersonIcon color="primary" />
            Carpeta raíz
          </Typography>
        </Stack>

        <Box sx={{ maxHeight: "260px", overflowY: "auto", pr: 1 }}>
          {loading && (
            <Typography variant="body2">Cargando...</Typography>
          )}

          {!loading && !carpetaUsuario && (
            <Typography variant="body2" color="text.secondary">
              No tienes carpeta asignada
            </Typography>
          )}

          {!loading && carpetaUsuario && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box
                  onClick={() => handleOpenCarpeta(carpetaUsuario.id_carpeta)}
                  sx={{
                    p: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <FolderIcon sx={{ fontSize: 40, color: "#FFCA28", mb: 1 }} />

                  <Typography variant="body2" fontWeight="600" noWrap>
                    {carpetaUsuario.nombre}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {carpetaUsuario.fecha_creacion
                      ? new Date(carpetaUsuario.fecha_creacion).toLocaleDateString()
                      : "Sin fecha"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>

      </Paper>
    </Box>
  );
}