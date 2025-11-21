// components/Navbar.jsx
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Avatar, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const isDesktop = useMediaQuery("(min-width:768px)");

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
            <Typography sx={{ color: "white", fontWeight: "bold" }}>C</Typography>
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
                to="/dashboard"
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

        {/* Botón derecho */}
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          sx={{
            background: "linear-gradient(45deg, #1e40af, #6d28d9)",
            px: 3,
            py: 1,
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": {
              background: "linear-gradient(45deg, #1e3a8a, #5b21b6)"
            }
          }}
        >
          Mi perfil
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
