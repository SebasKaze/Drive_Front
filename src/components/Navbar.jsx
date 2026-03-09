import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";





import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width:768px)");
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth()


  const drivePath =
    profile?.tipo === "admin"
      ? "/admin"
      : profile?.tipo === "user"
      ? "/user"
      : "/login";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut()
    handleCloseMenu()
    navigate("/login")
  }

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        backgroundColor: "#101935",
        borderBottom: "1px solid #1B2A4A",
        color: "#F1F5F9",
      }}
    >
      <Toolbar sx={{ maxWidth: "1400px", mx: "auto", width: "100%" }}>
        {/* Logo + Nombre */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            component={RouterLink}
            to="/"
            sx={{
              backgroundColor: "#1B2A4A",
              width: 40,
              height: 40,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#23395B" }
            }}
          >
            <CloudIcon sx={{ color: "#F1F5F9" }} />
          </IconButton>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#F1F5F9",
              fontWeight: "bold",
              ml: 2,
              fontSize: "1.4rem"
            }}
          >
            CMB Drive
          </Typography>

          {/* Links Desktop */}
          {isDesktop && (
            <Box sx={{ display: "flex", ml: 5, gap: 4 }}>
              <Typography
                component={RouterLink}
                to="/home"
                sx={{
                  textDecoration: "none",
                  color: "#CBD5E1",
                  fontSize: "1rem",
                  "&:hover": { color: "#ffffff" }
                }}
              >
                Inicio
              </Typography>

              <Typography
                component={RouterLink}
                to={drivePath}
                sx={{
                  textDecoration: "none",
                  color: "#CBD5E1",
                  fontSize: "1rem",
                  "&:hover": { color: "#ffffff" }
                }}
              >
                Mi Drive
              </Typography>
            </Box>
          )}
        </Box>

        {/* PERFIL */}
        <Button
          onClick={handleOpenMenu}
          sx={{
            textTransform: "none",
            fontWeight: 500,
            color: "#F1F5F9",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            paddingRight: 7
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "#23395B",
              color: "#F1F5F9"
            }}
          >
            {profile?.nombre?.[0]?.toUpperCase() ||
              user?.email?.[0]?.toUpperCase() ||
              "U"}
          </Avatar>

          {isDesktop && (
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="body2" fontWeight="bold">
                {profile?.nombre || "Usuario"}
              </Typography>
              <Typography variant="caption" sx={{ color: "#CBD5E1" }}>
                {profile?.tipo}
              </Typography>
            </Box>
          )}
        </Button>

        {/* MENÚ DESPLEGABLE */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: 220,
              p: 1,
              backgroundColor: "#162447",
              color: "#F1F5F9"
            }
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography fontWeight="bold">
              {profile?.nombre}
            </Typography>
            <Typography variant="caption" sx={{ color: "#CBD5E1" }}>
              {user?.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 1, borderColor: "#1B2A4A" }} />

          <MenuItem
            onClick={() => {
              navigate("/perfil");
              handleCloseMenu();
            }}
            sx={{
              borderRadius: 1,
              "&:hover": { backgroundColor: "#23395B" }
            }}
          >
            Mi Perfil
          </MenuItem>

          <Divider sx={{ my: 1, borderColor: "#1B2A4A" }} />

          <MenuItem
            onClick={handleLogout}
            sx={{
              color: "#F87171",
              fontWeight: 500,
              borderRadius: 1,
              "&:hover": { backgroundColor: "#23395B" }
            }}
          >
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
