import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const drivePath = profile?.tipo === "admin" ? "/admin" : "/user";

  return (
    <Box>
      <Navbar />
      <Box sx={{ display: "flex", minHeight: "500vh", bgcolor: "#ffffff" }}>
        <Sidebar />
        <Box sx={{flexGrow: 1, p: 3, width: "100%", overflow: "hidden",}}>
          
          <Box sx={{ p: 4 }}>
            {/* Bienvenida */}
            <Typography variant="h4" fontWeight="bold">
              Bienvenido a CMB Drive 👋
            </Typography>

            <Typography sx={{ mt: 1, color: "text.secondary" }}>
              Usuario: {user?.email} · Rol: {profile?.tipo}
            </Typography>

            {/* CTA */}
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate(drivePath)}
            >
              Ir a mi Drive
            </Button>

            {/* Cards */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography fontWeight="bold">📁 Organiza tus archivos</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Crea carpetas y mantén todo ordenado.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography fontWeight="bold">⏱️ Acceso rápido</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Encuentra tus documentos en segundos.
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 3 }}>
                  <Typography fontWeight="bold">🔒 Seguridad</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Tus archivos protegidos con Supabase.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
    
  );
};

export default Home;
