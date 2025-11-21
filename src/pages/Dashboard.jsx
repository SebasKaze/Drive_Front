// pages/Dashboard.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import FileGrid from "../components/FileGrid";
import Header from "../components/Header";
import QuickActions from "../components/QuickActions";

import {
  Box,
  Grid,
  Paper,
  Typography,
  LinearProgress,
  Avatar,
  useTheme,
  alpha
} from "@mui/material";

import StorageIcon from "@mui/icons-material/Storage";
import DescriptionIcon from "@mui/icons-material/Description";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";

// ---------------- Mock data ------------------
const mockFiles = [
  {
    id: 1,
    name: "Proyecto React.pdf",
    type: "pdf",
    size: "2.4 MB",
    modified: "2024-01-15",
    owner: "Tú",
    shared: false
  },
  {
    id: 2,
    name: "Presentación Empresa.pptx",
    type: "ppt",
    size: "5.2 MB",
    modified: "2024-01-14",
    owner: "Tú",
    shared: true
  },
  {
    id: 3,
    name: "Logo Design.png",
    type: "image",
    size: "1.2 MB",
    modified: "2024-01-13",
    owner: "Tú",
    shared: false
  },
  {
    id: 4,
    name: "Video Tutorial.mp4",
    type: "video",
    size: "150 MB",
    modified: "2024-01-12",
    owner: "Tú",
    shared: true
  },
  {
    id: 5,
    name: "Budget 2024.xlsx",
    type: "sheet",
    size: "3.7 MB",
    modified: "2024-01-11",
    owner: "Tú",
    shared: false
  },
  {
    id: 6,
    name: "Documentación API.md",
    type: "document",
    size: "0.8 MB",
    modified: "2024-01-10",
    owner: "María García",
    shared: true
  }
];

const mockFolders = [
  { id: 1, name: "Proyectos", itemCount: 12, icon: "📁" },
  { id: 2, name: "Fotos", itemCount: 45, icon: "🖼️" },
  { id: 3, name: "Documentos", itemCount: 23, icon: "📄" },
  { id: 4, name: "Compartidos", itemCount: 8, icon: "👥" }
];

// ---------------- Dashboard ------------------
export default function Dashboard() {
  const [currentView, setCurrentView] = useState("mi-unidad");
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  const filteredFiles = mockFiles.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCurrentFiles = () => {
    switch (currentView) {
      case "mi-unidad":
        return filteredFiles;
      case "compartidos":
        return filteredFiles.filter((file) => file.shared);
      case "recientes":
        return [...filteredFiles].sort(
          (a, b) => new Date(b.modified) - new Date(a.modified)
        );
      default:
        return filteredFiles;
    }
  };

  // Colores mejorados para las tarjetas de estadísticas
  const statCards = [
    {
      title: "Espacio usado",
      value: "2.5 GB",
      subtitle: "de 15 GB",
      icon: <StorageIcon />,
      progress: 16.6,
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.1)
    },
    {
      title: "Archivos",
      value: mockFiles.length,
      icon: <DescriptionIcon />,
      color: theme.palette.success.main,
      bgColor: alpha(theme.palette.success.main, 0.1)
    },
    {
      title: "Compartidos",
      value: mockFiles.filter((f) => f.shared).length,
      icon: <GroupIcon />,
      color: theme.palette.info.main,
      bgColor: alpha(theme.palette.info.main, 0.1)
    },
    {
      title: "Carpetas",
      value: mockFolders.length,
      icon: <FolderIcon />,
      color: theme.palette.warning.main,
      bgColor: alpha(theme.palette.warning.main, 0.1)
    }
  ];

  return (
    <Box sx={{ 
      display: "flex", 
      minHeight: "90vh",
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.05)} 0%, ${alpha(theme.palette.background.default, 0.1)} 100%)`
    }}>
      {/* Sidebar */}
      <Sidebar
        folders={mockFolders}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {/* Main content */}
      <Box sx={{ 
        flexGrow: 1, 
        p: { xs: 2, sm: 3, md: 4 },
        ml: { xs: 0, md: '10px' }, // Ajuste para sidebar responsive
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })
      }}>
        <Box sx={{ 
          maxWidth: "1400px", 
          mx: "auto",
          animation: 'fadeIn 0.5s ease-in'
        }}>
          {/* Header (search bar) */}
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            currentView={currentView}
          />

          {/* Quick Actions */}
          <QuickActions />

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {statCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${card.bgColor} 0%, ${alpha(card.bgColor, 0.7)} 100%)`,
                    border: `1px solid ${alpha(card.color, 0.2)}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 25px ${alpha(card.color, 0.15)}`,
                    }
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
                        {card.title}
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" sx={{ color: card.color, mb: 0.5 }}>
                        {card.value}
                      </Typography>
                      {card.subtitle && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {card.subtitle}
                        </Typography>
                      )}
                    </Box>

                    <Avatar 
                      sx={{ 
                        bgcolor: alpha(card.color, 0.1),
                        color: card.color,
                        width: 48,
                        height: 48,
                        borderRadius: 2
                      }}
                    >
                      {card.icon}
                    </Avatar>
                  </Box>

                  {card.progress && (
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={card.progress}
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          backgroundColor: alpha(card.color, 0.2),
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: card.color,
                            borderRadius: 4
                          }
                        }}
                      />
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Files Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              background: theme.palette.background.paper,
              boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                  {currentView === "mi-unidad" && "Mi Unidad"}
                  {currentView === "compartidos" && "Compartidos conmigo"}
                  {currentView === "recientes" && "Recientes"}
                </Typography>
                <Typography color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>{getCurrentFiles().length} archivos</span>
                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.secondary' }} />
                  <span>Última actualización: hoy</span>
                </Typography>
              </Box>
            </Box>

            <FileGrid files={getCurrentFiles()} />
          </Paper>
        </Box>
      </Box>

      {/* Estilos globales para animaciones */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}