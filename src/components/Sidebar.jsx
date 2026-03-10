import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from "@mui/icons-material/Home"
import DeleteIcon from "@mui/icons-material/Delete"
import FolderIcon from "@mui/icons-material/Folder"

import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../supabase"

const Sidebar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const { isAdmin } = useAuth()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [folders, setFolders] = useState([])
  const [loading, setLoading] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    if (isAdmin) fetchRootFolders()
  }, [isAdmin])

  const fetchRootFolders = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from("carpeta")
      .select("id_carpeta, nombre")
      .is("padre", null)
      .order("nombre")

    if (!error) setFolders(data || [])

    setLoading(false)
  }

  const navItems = [
    { text: "Inicio", icon: <HomeIcon />, path: "/home" },
    { text: "Papelera", icon: <DeleteIcon />, path: "/trash" }
  ]

  return (
    <Box
      sx={{
        width: collapsed ? 80 : 260,
        height: "93vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#ffca3a",
        color: "#1e1e1e",
        borderRight: "2px solid #fcbf49",
        transition: "width 0.3s ease",
        overflow: "hidden"
      }}
    >

      {/* HEADER */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between"
        }}
      >
        {!collapsed && (
          <Box>
            <Typography variant="h6" fontWeight="bold">
              CMB Drive
            </Typography>

            <Typography variant="caption" sx={{ opacity: 0.8 }}>
              {isAdmin ? "Administrador" : "Usuario"}
            </Typography>
          </Box>
        )}

        {!isMobile && (
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: "rgba(0,0,0,0.2)" }} />

      {/* NAV PRINCIPAL */}
      <List sx={{ px: 1, mt: 1 }}>

        {navItems.map((item) => {

          const active = location.pathname === item.path

          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                px: collapsed ? 1.5 : 2,
                justifyContent: collapsed ? "center" : "flex-start",

                bgcolor: active ? "#fcbf49" : "transparent",

                "&:hover": {
                  bgcolor: "#fcbf49",
                  transform: "translateX(4px)"
                }
              }}
            >

              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 0 : 2,
                  justifyContent: "center",
                  color: "#1e1e1e"
                }}
              >
                {item.icon}
              </ListItemIcon>

              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              )}

            </ListItemButton>
          )
        })}
      </List>

      <Divider sx={{ borderColor: "rgba(0,0,0,0.2)", my: 1 }} />

      {/* CARPETAS ADMIN */}
      {isAdmin && (

        <Box sx={{ flexGrow: 1, overflow: "auto" }}>

          {!collapsed && (
            <Box sx={{ px: 3, py: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                CARPETAS
              </Typography>
            </Box>
          )}

          {loading ? (

            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <CircularProgress size={22} sx={{ color: "#1e1e1e" }} />
            </Box>

          ) : folders.length === 0 ? (

            !collapsed && (
              <Typography variant="body2" sx={{ px: 3, opacity: 0.7 }}>
                No hay carpetas raíz
              </Typography>
            )

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
                    px: collapsed ? 1.5 : 2,
                    justifyContent: collapsed ? "center" : "flex-start",

                    "&:hover": {
                      bgcolor: "#fcbf49",
                      transform: "translateX(4px)"
                    }
                  }}
                >

                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 2,
                      justifyContent: "center",
                      color: "#1e1e1e"
                    }}
                  >
                    <FolderIcon />
                  </ListItemIcon>

                  {!collapsed && (
                    <ListItemText
                      primary={folder.nombre}
                      primaryTypographyProps={{
                        fontWeight: 500,
                        noWrap: true
                      }}
                    />
                  )}

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