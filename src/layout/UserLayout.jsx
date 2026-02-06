import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function UserLayout() {
  return (

    <Box>
      <Navbar />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
        <Sidebar userRole="user" />
        <Box sx={{ flexGrow: 1, p: 3, width: "100%", overflow: "hidden",}}>
          <Box sx={{ p: 4 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
    
  );
}
