import { useEffect, useState } from "react";
import {
Box,
Paper,
Typography,
Grid,
Divider,
Avatar,
Chip,
Button,
TextField,
Dialog,
DialogTitle,
DialogContent,
DialogActions,
} from "@mui/material";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function PerfilUsuario() {
const [usuario, setUsuario] = useState(null);
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(true);

const [openEdit, setOpenEdit] = useState(false);
const [nuevoNombre, setNuevoNombre] = useState("");

useEffect(() => {
    fetchPerfil();
}, []);

const fetchPerfil = async () => {
    setLoading(true);
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return;

    setEmail(user.email);

    // 1️⃣ Traer usuario
    const { data: usuario } = await supabase
    .from("usuario")
    .select("*")
    .eq("id_usuario", user.id)
    .single();

    // 2️⃣ Traer empresa
    let empresa = null;

    if (usuario?.id_empresa_fk) {
    const { data } = await supabase
        .from("empresa")
        .select("*")
        .eq("id_empresa", usuario.id_empresa_fk)
        .single();

    empresa = data;
    }

    setUsuario({ ...usuario, empresa });


    setLoading(false);
};

const handleActualizarNombre = async () => {
    const { error } = await supabase
    .from("usuario")
    .update({ nombre: nuevoNombre })
    .eq("id_usuario", usuario.id_usuario);

    if (!error) {
        setUsuario({ ...usuario, nombre: nuevoNombre });
        setOpenEdit(false);
    }
};

if (loading) return <Typography>Cargando...</Typography>;

if (!usuario) return <Typography>No se encontró información.</Typography>;

return (
    <Box>
    <Navbar />
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f7fa" }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 4 }}>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Mi Perfil
        </Typography>

        <Paper sx={{ p: 4, borderRadius: 3 }}>

            {/* Información principal */}
            <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
                <Avatar
                sx={{
                    width: 100,
                    height: 100,
                    fontSize: 36,
                    bgcolor: "primary.main",
                }}
                >
                {usuario.nombre?.charAt(0).toUpperCase()}
                </Avatar>
            </Grid>

            <Grid item xs={12} md={9}>
                <Typography variant="h6">
                {usuario.nombre}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                {email}
                </Typography>

                <Chip
                label={usuario.tipo.toUpperCase()}
                color={usuario.tipo === "admin" ? "primary" : "default"}
                sx={{ mt: 1 }}
                />

                <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                Miembro desde: {new Date(usuario.created_at).toLocaleDateString()}
                </Typography>

                <Button
                sx={{ mt: 2 }}
                variant="outlined"
                onClick={() => {
                    setNuevoNombre(usuario.nombre);
                    setOpenEdit(true);
                }}
                >
                Editar nombre
                </Button>
            </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Empresa */}
            <Typography variant="h6" sx={{ mb: 2 }}>
            Información de la Empresa
            </Typography>

            {usuario.empresa ? (
            <Box>
                <Typography variant="body1">
                <strong>Nombre:</strong> {usuario.empresa.nombre}
                </Typography>

                <Typography variant="body1">
                <strong>Tipo:</strong> {usuario.empresa.tipo}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                Empresa creada el: {new Date(usuario.empresa.created_at).toLocaleDateString()}
                </Typography>
            </Box>
            ) : (
            <Typography color="text.secondary">
                No pertenece a ninguna empresa.
            </Typography>
            )}
        </Paper>

        {/* Modal editar nombre */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
            <DialogTitle>Editar nombre</DialogTitle>
            <DialogContent>
            <TextField
                fullWidth
                margin="dense"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Cancelar</Button>
            <Button variant="contained" onClick={handleActualizarNombre}>
                Guardar
            </Button>
            </DialogActions>
        </Dialog>

        </Box>
    </Box>
    </Box>
);
}
