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
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffca3a",
        color: "#1e1e1e",
        borderRight: "2px solid #fcbf49",
        transition: "all 0.3s ease"
      }}
    >
      {/* ===== HEADER ===== */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          CMB Drive
        </Typography>

        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {isAdmin ? "Administrador" : "Usuario"}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(0,0,0,0.2)" }} />

      {/* ===== NAV PRINCIPAL ===== */}
      <List sx={{ px: 1, mt: 1 }}>
        {[
          { text: "Inicio", icon: <HomeIcon />, path: "/home" },
          { text: "Papelera", icon: <DeleteIcon />, path: "/" }
        ].map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              borderRadius: 2,
              mb: 1,
              transition: "all 0.25s ease",
              "&:hover": {
                bgcolor: "#fcbf49",
                transform: "translateX(6px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
              }
            }}
          >
            <ListItemIcon
              sx={{
                color: "#1e1e1e",
                minWidth: 36,
                transition: "0.3s"
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                fontWeight: 500
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(0,0,0,0.2)", my: 1 }} />

      {/* ===== CARPETAS ADMIN ===== */}
      {isAdmin && (
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Box sx={{ px: 3, py: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              CARPETAS
            </Typography>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress size={22} sx={{ color: "#1e1e1e" }} />
            </Box>
          ) : folders.length === 0 ? (
            <Typography variant="body2" sx={{ px: 3, opacity: 0.7 }}>
              No hay carpetas raíz
            </Typography>
          ) : (
            <List sx={{ px: 1 }}>
              {folders.map((folder) => (
                <ListItemButton
                  key={folder.id_carpeta}
                  onClick={() =>
                    navigate(`/dashboard/carpeta/${folder.id_carpeta}`)
                  }
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      bgcolor: "#fcbf49",
                      transform: "translateX(6px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "#1e1e1e",
                      minWidth: 36
                    }}
                  >
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={folder.nombre}
                    primaryTypographyProps={{
                      fontWeight: 500
                    }}
                  />
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
