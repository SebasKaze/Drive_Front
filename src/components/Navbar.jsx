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
      elevation={1}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        color: "black",
      }}
    >
      <Toolbar sx={{ maxWidth: "1400px", mx: "auto", width: "100%" }}>
        {/* Logo + Nombre */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            component={RouterLink}
            to="/"
            sx={{
              backgroundColor: "#2563eb",
              width: 40,
              height: 40,
              borderRadius: 2,
              "&:hover": { backgroundColor: "#1e40af" }
            }}
          >
            <Typography component="div" sx={{ color: "white", fontWeight: "bold" }}>
              C
            </Typography>
          </IconButton>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
              ml: 2,
              fontSize: "1.4rem"
            }}
          >
            CMB Drive
          </Typography>

          {/* Links */}
          {isDesktop && (
            <Box sx={{ display: "flex", ml: 5, gap: 4 }}>
            <Typography
              component={RouterLink}
              to={drivePath}
              sx={{
                textDecoration: "none",
                color: "gray",
                fontSize: "1rem",
                "&:hover": { color: "#2563eb" }
              }}
            >
              Mi Drive
            </Typography>

              <Typography
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: "none",
                  color: "gray",
                  fontSize: "1rem",
                  "&:hover": { color: "#2563eb" }
                }}
              >
                Inicio
              </Typography>
            </Box>
          )}
        </Box>

        {/* ===== OPCIONES ===== */}
        <Button
          onClick={handleOpenMenu}
          startIcon={
          <Avatar sx={{ width: 28, height: 28 }}>
            {user?.email?.[0]?.toUpperCase() || "U"}
          </Avatar>
          }
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            color: "black"
          }}
        >
          Opciones
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
        <MenuItem
          onClick={() => {
            navigate(drivePath)
            handleCloseMenu()
          }}>
          Mi Drive
        </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/perfil");
              handleCloseMenu();
            }}
          >
            Mi Perfil
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{ color: "error.main", fontWeight: "bold" }}
          >
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
