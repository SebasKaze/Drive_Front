// pages/DashboardUsuario.jsx
import { 
  Box, Grid, Paper, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, useTheme, alpha 
} from "@mui/material";

import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// --- MOCK DATA (Mover del archivo principal) ---
// Define el ID del usuario actual. En producción, esto se pasa como prop.
const currentUserId = 1; 
const mockUserFolders = [ /* ... copia los datos de mockUserFolders ... */
  { id: 101, name: "Mis Facturas", date: "2024-01-20" },
  // ... más carpetas ...
];
const mockAllFiles = [ /* ... copia los datos de mockAllFiles ... */
  { id: 1, name: "Reporte_Mensual.pdf", type: "pdf", size: "2.4 MB", date: "2024-01-20", owner: "Juan Pérez", ownerId: 1 },
  // ... más archivos (asegúrate de incluir los del currentUserId) ...
];
// --------------------------------------------------

export default function DashboardUsuario() {
  const theme = useTheme();
  // Lógica de filtrado
  const myFiles = mockAllFiles.filter(f => f.ownerId === currentUserId);

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in' }}>
       <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: theme.palette.text.primary }}>
        Mi Unidad
      </Typography>

      {/* SECCIÓN 1: Mis Carpetas Recientes */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        {/* ... Copia aquí todo el código JSX de la SECCIÓN 1 (Grid de Carpetas) de UserView ... */}
        <Typography variant="subtitle1" sx={{ mb: 2 }}>Mis Carpetas</Typography>
        <Grid container spacing={2}>
          {mockUserFolders.map((folder) => (
            <Grid item xs={12} sm={6} md={3} key={folder.id}>
               <Box sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.04), borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.1) } }}>
                <FolderIcon color="primary" />
                <Box>
                  <Typography variant="body2" fontWeight="bold">{folder.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{folder.date}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* SECCIÓN 2: Mis Archivos Recientes */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}>
        {/* ... Copia aquí todo el código JSX de la SECCIÓN 2 (Tabla Personal) de UserView ... */}
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>Mis archivos recientes</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre / Formato</TableCell>
                <TableCell>Tamaño</TableCell>
                <TableCell>Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myFiles.length > 0 ? (
                myFiles.map((file) => (
                  <TableRow key={file.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <InsertDriveFileIcon color="action" fontSize="small" />
                        <Typography variant="body2" fontWeight="500">{file.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary' }}>{file.size}</TableCell>
                    <TableCell>
                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.875rem' }}>
                         <AccessTimeIcon fontSize="inherit"/> {file.date}
                       </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    <Typography color="text.secondary">No has subido archivos aún.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}