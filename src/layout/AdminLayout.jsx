import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function AdminLayout() {
  return (
    <Box sx={{ minHeight: "93vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <Box sx={{ display: "flex", flex: 1, bgcolor: "#f5f7fa" }}>
        <Sidebar userRole="admin" />

        <Box
          sx={{
            flexGrow: 1,
            px: 3,      // solo horizontal
            py: 2,      // vertical más pequeño
            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}