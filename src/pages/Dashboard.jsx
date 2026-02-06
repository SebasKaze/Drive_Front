// pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";

import Sidebar from "../components/Sidebar";
import DashboardAdmin from "./DashboardAdmin";
import DashboardUsuario from "./DashboardUsuario";

export default function Dashboard() {
  
  const [userRole, setUserRole] = useState(null);
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/dashboard-info");
        const data = await res.json();

        setUserRole(data.role);
        setFolders(data.folders);
      } catch (err) {
        console.error("Error cargando datos desde el backend:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Pasamos carpetas y vista actual */}
      <Sidebar
        folders={folders}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <Box sx={{ flexGrow: 1, p: 4, ml: { xs: 0, md: "10px" } }}>
        <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
          {userRole === "admin" ? (
            <DashboardAdmin />
          ) : (
            <DashboardUsuario />
          )}
        </Box>
      </Box>
    </Box>
  );
}
