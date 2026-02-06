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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";

import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import { supabase } from "../supabase";


export default function DashboardAdmin() {
  //INICIALIZACIONES
  const theme = useTheme();
  const navigate = useNavigate(); // 2. Inicializar navigate
  const [carpetasRaiz, setCarpetasRaiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const [nombreCarpeta, setNombreCarpeta] = useState("");
  const [openModal, setOpenModal] = useState(false);









  const fetchCarpetasRaiz = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("carpeta")
      .select("id_carpeta, nombre, fecha_creacion")
      .is("padre", null)
      .order("nombre");

    if (error) {
      console.error("Error cargando carpetas raíz:", error);
      setCarpetasRaiz([]);
    } else {
      setCarpetasRaiz(data || []);
    }

    setLoading(false);
  };


  useEffect(() => {
    fetchCarpetasRaiz();
  }, []);

  // ====== 3. ACTUALIZAR HANDLER ======
  const handleOpenCarpeta = (carpetaId) => {
    navigate(`/dashboard/carpeta/${carpetaId}`);
  };



  //Boton para crear carpeta
  const handleCreateCarpeta = async () => {
    if (!nombreCarpeta.trim()) return;

    const { data, error } = await supabase
      .from("carpetas")
      .insert({
        nombre: nombreCarpeta,
        padre_id: null, // raíz
      })
      .select()
      .single();

    if (error) {
      console.error("Error creando carpeta:", error);
      return;
    }

    setCarpetasRaiz(prev => [...prev, data]);
    setNombreCarpeta("");
  };

  return (
    <Box sx={{ animation: "fadeIn 0.5s ease-in" }}>carpeta.id
      <Typography
        component="div"
        variant="h5"
        sx={{ mb: 3, fontWeight: "bold", color: theme.palette.text.primary }}>
        Panel de Administrador
      </Typography>

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
          Carpetas raíz
        </Typography>

          <Button
            variant="contained"
            size="small"
            startIcon={<CreateNewFolderIcon />}
            onClick={() => setOpenModal(true)}
          >
            Nueva carpeta
          </Button>
        </Stack>

        <Box sx={{ maxHeight: "260px", overflowY: "auto", pr: 1 }}>
          <Grid container spacing={2}>
            {loading && (
              <Typography component="div" variant="body2">Cargando...</Typography>
            )}

            {!loading && carpetasRaiz.length === 0 && (
              <Typography component="div" variant="body2" color="text.secondary">
                No hay carpetas raíz registradas
              </Typography>
            )}

            {carpetasRaiz.map((carpeta) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={carpeta.id_carpeta}> {/* Cambié carpeta.id por carpeta.id_carpeta según tu select */}
                <Box
                  onClick={() => handleOpenCarpeta(carpeta.id_carpeta)}
                  sx={{
                    p: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",      // Aseguramos el layout
                    flexDirection: "column",
                    alignItems: "center",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <FolderIcon sx={{ fontSize: 40, color: "#FFCA28", mb: 1 }} />
                  
                  {/* Cambiamos a component="div" para que pueda contener estructuras complejas sin quejarse */}
                  <Typography variant="body2" fontWeight="600" noWrap component="div">
                    {carpeta.nombre}
                  </Typography>
                  
                  <Typography variant="caption" color="text.secondary" component="div">
                    {carpeta.fecha_creacion ? new Date(carpeta.fecha_creacion).toLocaleDateString() : 'Sin fecha'}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>

      {/*===MODAL NUEVA CARPETA===*/}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Nueva carpeta</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la carpeta"
            fullWidth
            value={nombreCarpeta}
            onChange={(e) => setNombreCarpeta(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleCreateCarpeta();
              setOpenModal(false);
            }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}