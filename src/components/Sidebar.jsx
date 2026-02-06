import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  CircularProgress
} from "@mui/material"

import HomeIcon from "@mui/icons-material/Home"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import DeleteIcon from "@mui/icons-material/Delete"
import FolderIcon from "@mui/icons-material/Folder"
import BusinessIcon from "@mui/icons-material/Business"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../supabase"

const Sidebar = () => {
  const navigate = useNavigate()
  const { isAdmin } = useAuth()

  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(false)

  /* =========================
     CARGAR CARPETAS RAÍZ (ADMIN)
  ========================= */
  useEffect(() => {
    if (isAdmin) {
      fetchRootFolders()
    }
  }, [isAdmin])

  const fetchRootFolders = async () => {
    setLoading(true)

    const { data, error } = await supabase
      .from("carpeta")
      .select("id_carpeta, nombre")
      .is("padre", null)
      .order("nombre")

    if (error) {
      console.error("❌ Error cargando carpetas raíz:", error)
    } else {
      setFolders(data || [])
    }

    setLoading(false)
  }

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        borderRight: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper"
      }}
    >
      {/* ===== HEADER ===== */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" component="div">
          CMB Drive
        </Typography>

        <Typography variant="caption" color="text.secondary" component="div">
          {isAdmin ? "Administrador" : "Usuario"}
        </Typography>

        {isAdmin && (
          <Button
            fullWidth
            startIcon={<BusinessIcon />}
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate("/admin/crear-empresa")}
          >
            Crear empresa
          </Button>
        )}
      </Box>

      <Divider />

      {/* ===== NAV ===== */}
      <List>
        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Inicio" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon><AccessTimeIcon /></ListItemIcon>
          <ListItemText primary="Recientes" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon><DeleteIcon /></ListItemIcon>
          <ListItemText primary="Papelera" />
        </ListItemButton>
      </List>

      <Divider />

      {/* ===== CARPETAS RAÍZ (ADMIN) ===== */}
      {isAdmin && (
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography component="div" variant="subtitle2" fontWeight="bold">
              CARPETAS
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress size={22} />
            </Box>
          ) : folders.length === 0 ? (
            <Typography component="div" variant="body2" color="text.secondary" sx={{ px: 2 }}>
              No hay carpetas raíz
            </Typography>
          ) : (
            <List>
              {folders.map(folder => (
                <ListItemButton
                  key={folder.id_carpeta}
                  onClick={() =>
                    navigate(`/dashboard/carpeta/${folder.id_carpeta}`)
                  }
                >
                  <ListItemIcon><FolderIcon /></ListItemIcon>
                  <ListItemText primary={folder.nombre} />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      )}
    </Box>
  )
}

export default Sidebar
