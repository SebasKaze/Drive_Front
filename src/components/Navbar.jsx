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
  useMediaQuery,
  useTheme
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const drivePath =
    profile?.tipo === "admin"
      ? "/admin"
      : profile?.tipo === "user"
      ? "/user"
      : "/login";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = async () => {
    await signOut();
    handleCloseMenu();
    navigate("/login");
  };

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
      <Toolbar
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          width: "100%",
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: { xs: 56, sm: 64 }
        }}
      >
        {/* LOGO + NOMBRE */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>

          <IconButton
            component={RouterLink}
            to="/"
            sx={{
              backgroundColor: "#1B2A4A",
              width: { xs: 34, sm: 38, md: 42 },
              height: { xs: 34, sm: 38, md: 42 },
              borderRadius: 2,
              "&:hover": { backgroundColor: "#23395B" }
            }}
          >
            <CloudIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
          </IconButton>

          <Typography
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#F1F5F9",
              fontWeight: "bold",
              ml: 2,
              fontSize: "clamp(1rem, 1.4vw, 1.4rem)"
            }}
          >
            CMB Drive
          </Typography>

          {/* LINKS DESKTOP */}
          {isDesktop && (
            <Box
              sx={{
                display: "flex",
                ml: { md: 4, lg: 6 },
                gap: { md: 3, lg: 4 }
              }}
            >
              <Typography
                component={RouterLink}
                to="/home"
                sx={{
                  textDecoration: "none",
                  color: "#CBD5E1",
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
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
                  fontSize: "clamp(0.9rem, 1vw, 1rem)",
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
            gap: { xs: 1, md: 1.5 },
            pr: { xs: 1, md: 2 }
          }}
        >
          <Avatar
            sx={{
              width: { xs: 30, md: 34 },
              height: { xs: 30, md: 34 },
              backgroundColor: "#23395B",
              color: "#F1F5F9",
              fontSize: "clamp(0.8rem,1vw,1rem)"
            }}
          >
            {profile?.nombre?.[0]?.toUpperCase() ||
              user?.email?.[0]?.toUpperCase() ||
              "U"}
          </Avatar>

          {isDesktop && (
            <Box sx={{ textAlign: "left" }}>
              <Typography
                sx={{ fontWeight: "bold", fontSize: "clamp(0.85rem,1vw,0.95rem)" }}
              >
                {profile?.nombre || "Usuario"}
              </Typography>

              <Typography
                sx={{
                  fontSize: "clamp(0.7rem,0.9vw,0.8rem)",
                  color: "#CBD5E1"
                }}
              >
                {profile?.tipo}
              </Typography>
            </Box>
          )}
        </Button>

        {/* MENU */}
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