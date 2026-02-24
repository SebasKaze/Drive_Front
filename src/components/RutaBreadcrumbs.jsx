import {
    Breadcrumbs,
    Link,
    Typography,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function RutaBreadcrumbs({ ruta, onNavigate }) {
    const navigate = useNavigate();
    const drivePath = "/dashboard"; // Ruta raíz del drive

    return (
        <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
            mb: 3,
            bgcolor: "white",
            p: 1,
            borderRadius: 2,
        }}
        >
        {/* Inicio */}
        <Link
            underline="hover"
            sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            }}
            onClick={() => navigate(drivePath)}
        >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Inicio
        </Link>

        {ruta.map((paso, index) => {
            const isLast = index === ruta.length - 1;

            return isLast ? (
            <Typography
                key={paso.id_carpeta}
                sx={{ fontWeight: "bold" }}
            >
                {paso.nombre}
            </Typography>
            ) : (
            <Link
                key={paso.id_carpeta}
                underline="hover"
                sx={{ cursor: "pointer" }}
                onClick={() => onNavigate(paso.id_carpeta)}
            >
                {paso.nombre}
            </Link>
            );
        })}
        </Breadcrumbs>
    );
}