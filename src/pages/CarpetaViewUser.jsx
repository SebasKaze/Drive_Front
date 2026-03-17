import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Breadcrumbs,
    Link,
    useTheme,
    alpha,
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Menu, 
    MenuItem, 
    ListItemIcon, 
    Divider, 
    IconButton,
} from "@mui/material";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';

import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';




import { supabase } from "../supabase";


// Vistas
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import RutaBreadcrumbs from "../components/RutaBreadcrumbs";
import { useRuta } from "../hooks/useRuta";
import { blueGrey, orange } from "@mui/material/colors";

export default function CarpetaView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

    const [subcarpetas, setSubcarpetas] = useState([]);
    const [ruta, setRuta] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [nombreCarpeta, setNombreCarpeta] = useState("");
    const [errorNombre, setErrorNombre] = useState("");

    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);

    const [archivos, setArchivos] = useState([]);
    const [loadingArchivos, setLoadingArchivos] = useState(false);


    const [folders, setFolders] = useState([]);
    const [uploading, setUploading] = useState(false);


    //MENU CARPETA
    const [anchorEl, setAnchorEl] = useState(null);
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const openMenu = Boolean(anchorEl);


    //EDITAR CARPETA
    const [openEditModal, setOpenEditModal] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState("");






    
    const fetchSubcarpetas = async () => {
        setLoading(true);

        if (!id) {
            setSubcarpetas([]);
            setLoading(false);
            return;
        }
        const carpetaId = id ? Number(id) : null;
        if (isNaN(carpetaId)) return;
        
        const { data, error } = await supabase
            .from("carpeta")
            .select("id_carpeta, nombre, fecha_creacion")
            .eq("padre", id)
            .order("nombre");

        if (error) {
            console.error("Error subcarpetas:", error);
            setSubcarpetas([]);
        } else {
            setSubcarpetas(data || []);
        }

        setLoading(false);
    };

    const fetchRuta = async () => {
        if (!id) {
            setRuta([]);
            return;
        }

        try {
            const session = await supabase.auth.getSession();
            const token = session.data.session?.access_token;

            const res = await fetch(
            `https://drivebacksup.onrender.com/empresa/ruta/${id}`,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            const data = await res.json();

            if (res.ok) {
            // Ordenamos desde raíz → actual
            const ordenada = data.reverse();
            setRuta(ordenada);
            }
        } catch (error) {
            console.error("Error ruta:", error);
        }
    };






    const handleOpenCarpeta = (id) => {
        navigate(`/dashboards/carpetas/${id}`);
    };

    const handleCreateCarpeta = async () => {

        if (!nombreCarpeta.trim()) {
            setErrorNombre("El nombre es obligatorio");
            return;
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            console.error("Usuario no autenticado");
            return;
        }

        const { data, error } = await supabase
            .from("carpeta")
            .insert({
                nombre: nombreCarpeta,
                padre: id,
                id_usuario_fk: user.id   // 👈 IMPORTANTE
            })
            .select()
            .single();

        if (error) {
            console.error(error);
            setErrorNombre("No se pudo crear la carpeta");
            return;
        }

        setSubcarpetas(prev => [...prev, data]);
        setNombreCarpeta("");
        setOpenModal(false);
    };



    const handleUploadArchivo = async (e) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            console.error("No hay usuario autenticado");
            return;
        }

        const file = e.target.files[0];
        if (!file) return;

        if (!id) {
            console.error("No hay carpeta seleccionada");
            return;
        }

        const filePath = `${id}/${Date.now()}_${file.name}`;

        setUploading(true);

        // Subir a storage
        const { error: uploadError } = await supabase.storage
            .from("files")
            .upload(filePath, file);

        if (uploadError) {
            console.error(uploadError);
            setUploading(false);
            return;
        }

        // Guardar metadata
        const { error: insertError } = await supabase
            .from("archivo")
            .insert({
                nombre: file.name,
                storage_path: filePath,
                tamano: file.size,
                id_carpeta_fk: id,
                id_usuario_fk: user.id
            });

        if (insertError) {
            console.error(insertError);
        }

        setUploading(false);
        fetchArchivos();
    };


    const fetchArchivos = async () => {
        if (!id) {
            setArchivos([]);
            return;
        }

        const carpetaId = Number(id);
        if (isNaN(carpetaId)) return;

        const { data, error } = await supabase
            .from("archivo")
            .select("id_archivo, nombre, tamano, fecha, storage_path")
            .eq("id_carpeta_fk", id)
            .order("fecha", { ascending: false });
        if (error) {
            console.error(error);
            setArchivos([]);
        } else {
            setArchivos(data || []);
        }

    };

    const downloadFile = async (storagePath, nombre) => {
        const { data, error } = await supabase.storage
            .from("files") // nombre del bucket
            .download(storagePath);

        if (error) {
            console.error("Error al descargar:", error);
            return;
        }

        const url = URL.createObjectURL(data);
        const a = document.createElement("a");
        a.href = url;
        a.download = nombre; // nombre real del archivo
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };



    //MENU DESPLEGABLE
    const handleOpenMenu = (event, item, tipo) => {
        event.stopPropagation(); // Evita que al hacer clic se abra la carpeta
        setAnchorEl(event.currentTarget);
        setItemSeleccionado({ tipo, datos: item });
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    // --- ELIMINAR CARPETA ---
    const handleDeleteCarpeta = async (carpetaId) => {
        const confirm = window.confirm("¿Deseas eliminar esta carpeta?");
        if (!confirm) return;

        const { error } = await supabase
            .from("carpeta")
            .delete()
            .eq("id_carpeta", carpetaId);

        if (error) {
            console.error("Error al eliminar:", error);
            return;
        }

        // Actualiza correctamente el estado
        setSubcarpetas(prev =>
            prev.filter(c => c.id_carpeta !== carpetaId)
        );
    };


    // --- ELIMINAR ARCHIVO ---
    const handleDeleteArchivo = async (archivo) => {
        const confirm = window.confirm(`¿Eliminar el archivo "${archivo.nombre}"?`);
        if (!confirm) return;

        // 1️⃣ Eliminar del storage
        const { error: storageError } = await supabase.storage
            .from("files")
            .remove([archivo.storage_path]);

        if (storageError) {
            console.error("Error al borrar del storage:", storageError);
            return;
        }

        // 2️⃣ Eliminar de la tabla
        const { error: dbError } = await supabase
            .from("archivo")
            .delete()
            .eq("id_archivo", archivo.id_archivo);

        if (dbError) {
            console.error("Error al borrar de la BD:", dbError);
            return;
        }

        // 3️⃣ Actualizar estado
        setArchivos(prev =>
            prev.filter(a => a.id_archivo !== archivo.id_archivo)
        );
    };



    // --- RENOMBRAR CARPETA ---

    const handleRenameCarpeta = async () => {
        if (!nuevoNombre.trim()) return;

        const carpetaId = itemSeleccionado?.datos?.id_carpeta;
        if (!carpetaId) return;

        const { data, error } = await supabase
            .from("carpeta")
            .update({ nombre: nuevoNombre })
            .eq("id_carpeta", carpetaId)
            .select()
            .single();

        if (error) {
            console.error("Error al renombrar:", error);
            return;
        }

        // Actualizar estado local
        setSubcarpetas(prev =>
            prev.map(c =>
                c.id_carpeta === carpetaId ? { ...c, nombre: nuevoNombre } : c
            )
        );

        setOpenEditModal(false);
    };

    // --- MANEJADOR DEL MENÚ ---
    const handleAccion = (accion) => {
        const { tipo, datos } = itemSeleccionado;
        
        if (accion === 'borrar') {
            if (tipo === 'carpeta') handleDeleteCarpeta(datos.id_carpeta);
            else handleDeleteArchivo(datos.id_archivo);
        } else if (accion === 'modificar') {
            setNuevoNombre(datos.nombre);
            setOpenEditModal(true);
        }
        handleCloseMenu();
    };

    //USES EFFECT
    useEffect(() => {
    fetchSubcarpetas();
    fetchArchivos();

    if (id) {
        fetchRuta();
    } else {
        setRuta([]);
    }
    }, [id]);


return (
    <Box >
        <Navbar />
        <Box sx={{ display: "flex", minHeight: "93vh", bgcolor: "#f5f7fa" }}>
            <Sidebar/>
            <Box 
                sx={{
                flexGrow: 1,
                p: 3,
                width: "100%",
                overflow: "hidden",
                }}>
                <Typography
                    variant="h5"
                    sx={{ mb: 2, fontWeight: "bold", color: theme.palette.text.primary }}>
                    Explorador de carpetas
                </Typography>
                
                {/* ===== RUTA DE NAVEGACIÓN (BREADCRUMBS) ===== */}
                <RutaBreadcrumbs ruta={ruta} onNavigate={handleOpenCarpeta}/>
                {/* ===== CUADRO PARA VISUALIZAR ===== */}
                <Paper
                    elevation={0}
                    sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                    border: `1px solid ${theme.palette.divider}`,
                    height: "calc(96vh - 180px)", // ajusta este número si quieres más/menos alto
                    display: "flex",
                    flexDirection: "column",
                    overflow: "auto",
                    }}>
                    {/*TITULO Y CONTENEDOR DE LOS BOTONES*/}
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 2 }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                        <FolderOpenIcon color="primary" />
                            Carpetas
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                variant="contained"
                                size="small"
                                startIcon={<CreateNewFolderIcon />}
                                onClick={() => setOpenModal(true)}
                            >
                                Nueva carpeta
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                component="label"
                            >
                                    Subir archivo
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleUploadArchivo}
                                />
                            </Button>
                        </Box>
                    </Stack>
                    {/* ===== VER CARPETAS ===== */}
                    <Box sx={{ flex: 1, overflowY: "auto", pr: 1, minHeight: 0, }}>
                        {loading && <Typography variant="body2">Cargando...</Typography>}
                        {!loading && subcarpetas.length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                            Esta carpeta no contiene subcarpetas
                            </Typography>
                    )}
                        <Grid container spacing={2}>
                            {subcarpetas.map((carpeta) => (
                                <Grid
                                    item
                                    xs={6}
                                    sm={4}
                                    md={3}
                                    lg={2}
                                    key={carpeta.id}
                                >
                                    <Box onClick={() => handleOpenCarpeta(carpeta.id_carpeta)}
                                        sx={{
                                            position: "relative",
                                            p: 2,
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 2,
                                            textAlign: "center",
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            "&:hover": {
                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                            borderColor: theme.palette.primary.main,
                                            },
                                        }}>
                                        {/* Botón de Menú para Carpeta */}
                                        <IconButton
                                            size="small"
                                            sx={{ position: "absolute", top: 5, right: 5 ,zIndex: 10}}
                                            onClick={(e) => handleOpenMenu(e, carpeta, 'carpeta')}
                                        >
                                            <MoreVertIcon fontSize="small" />
                                        </IconButton>
                                        <FolderIcon sx={{ fontSize: 40, color: "#FFCA28", mb: 1 }}/>
                                        <Typography variant="body2" fontWeight="600" noWrap>
                                            {carpeta.nombre}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {carpeta.fecha_creacion ? new Date(carpeta.fecha_creacion).toLocaleDateString() : 'Sin fecha'}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    {/* ===== VER ARCHIVOS ===== */}
                    <Box sx={{p:3,flex: 1, overflowY: "auto", mt: 2, minHeight: 0,  borderRadius:2,border: "1px solid", borderColor: "grey.300" }}>
                        <Typography
                            variant="subtitle1"
                            sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}
                        >
                            <InsertDriveFileIcon color="primary" />
                            Archivos
                        </Typography>
                        {loadingArchivos && (
                            <Typography variant="body2">Cargando archivos...</Typography>
                        )}
                        {!loadingArchivos && archivos.length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                            Esta carpeta no contiene archivos
                            </Typography>
                        )}
                        <Grid container spacing={2}>
                            {archivos.map((archivo) => (
                            <Grid item xs={12} sm={6} md={4} key={archivo.id}>
                                <Box
                                    sx={{
                                        p: 2,
                                        border: `1px solid ${theme.palette.divider}`,
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                    }}>
                                    <InsertDriveFileIcon color="action" />

                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="body2" fontWeight={600} noWrap>
                                        {archivo.nombre}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                        {(archivo.tamano / 1024).toFixed(2)} KB ·{" "}
                                        {archivo.fecha ? new Date(archivo.fecha).toLocaleDateString() : 'Sin fecha'}
                                        </Typography>
                                    </Box>
                                    <IconButton size="small" onClick={() => downloadFile(archivo.storage_path, archivo.nombre)}>
                                        <ArrowDownwardOutlinedIcon  sx={{ color: '#3988BD' }}  />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDeleteArchivo(archivo)}
                                    >
                                        <DeleteIcon sx={{ color: '#ff5733' }} />
                                    </IconButton>
                                </Box>
                            </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Paper>
                {/* ===== MODALES ===== */}
                {/* ===== NUEVA CARPETA MODAL===== */}
                <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                    <DialogTitle>Nueva carpeta</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nombre de la carpeta"
                            fullWidth
                            value={nombreCarpeta}
                            onChange={(e) => {
                                setNombreCarpeta(e.target.value);
                                setErrorNombre("");
                            }}
                            error={Boolean(errorNombre)}
                            helperText={errorNombre}
                        />
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
                        <Button variant="contained" onClick={handleCreateCarpeta}>
                            Crear
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* ===== MODAL MENU ===== */}
                <Menu
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    {itemSeleccionado?.tipo === 'carpeta' && [
                        <MenuItem key="modificar" onClick={() => handleAccion('modificar')}>
                            <ListItemIcon><EditIcon fontSize="small" /></ListItemIcon>
                            Modificar
                        </MenuItem>,
                        <Divider key="div" />
                    ]}
                    <MenuItem onClick={() => handleAccion('borrar')} sx={{ color: 'error.main' }}>
                        <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                        Borrar
                    </MenuItem>
                </Menu>
                {/* ===== MODAL EDITAR NOMBRE ===== */}
                <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                    <DialogTitle>Renombrar carpeta</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nuevo nombre"
                            fullWidth
                            value={nuevoNombre}
                            onChange={(e) => setNuevoNombre(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEditModal(false)}>Cancelar</Button>
                        <Button onClick={handleRenameCarpeta} variant="contained">Guardar</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    </Box>

    
);
}
