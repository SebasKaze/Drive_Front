// components/Sidebar.jsx
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Avatar,
  LinearProgress,
} from "@mui/material";

import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

const Sidebar = ({ folders, currentView, onViewChange, onFolderSelect }) => {
  const menuItems = [
    { id: "mi-unidad", label: "Mi Unidad", icon: <StorageOutlinedIcon /> },
    { id: "compartidos", label: "Compartidos", icon: <GroupOutlinedIcon /> },
    { id: "recientes", label: "Recientes", icon: <AccessTimeOutlinedIcon /> },
    { id: "papelera", label: "Papelera", icon: <DeleteOutlineIcon /> },
  ];

  return (
    <Box
      sx={{
        width: 260,
        backgroundColor: "white",
        borderRight: "1px solid #e5e7eb",
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* MENU PRINCIPAL */}
      <List sx={{ mb: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => onViewChange(item.id)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              ...(currentView === item.id
                ? {
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    color: "#2563eb",
                  }
                : {
                    "&:hover": { backgroundColor: "#f8fafc" },
                  }),
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 36,
                color: currentView === item.id ? "#2563eb" : "gray",
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: currentView === item.id ? "bold" : "medium",
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* CARPETAS */}
      <Typography
        sx={{ color: "gray", fontSize: 13, fontWeight: "bold", px: 1, mb: 1 }}
      >
        Carpetas
      </Typography>

      <List>
        {folders.map((folder) => (
          <ListItemButton
            key={folder.id}
            onClick={() => onFolderSelect(folder)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&:hover": { backgroundColor: "#f8fafc" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <FolderOutlinedIcon />
            </ListItemIcon>

            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="medium">{folder.name}</Typography>
              <Typography variant="caption" color="gray">
                {folder.itemCount} elementos
              </Typography>
            </Box>
          </ListItemButton>
        ))}
      </List>

      {/* ESPACIO UTILIZADO */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "#f8fafc",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#dbeafe",
              width: 32,
              height: 32,
              mr: 1.5,
            }}
          >
            <StorageOutlinedIcon sx={{ color: "#2563eb", fontSize: 18 }} />
          </Avatar>

          <Box>
            <Typography fontSize={14} fontWeight="bold" color="gray.800">
              Almacenamiento
            </Typography>
            <Typography fontSize={12} color="gray.600">
              2.5 GB de 15 GB usados
            </Typography>
          </Box>
        </Box>

        <LinearProgress
          variant="determinate"
          value={16.6}
          sx={{
            height: 8,
            borderRadius: 4,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#2563eb",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Sidebar;
