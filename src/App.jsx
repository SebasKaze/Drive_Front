// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext'; // Importar el AuthProvider y el useAuth

import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUsuario from "./pages/DashboardUsuario";
import AdminLayout from "./layout/AdminLayout";
import DriveView from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import CarpetaView from "./pages/CarpetaView";
import Perfil from "./components/Perfil";
import CarpetaViewUser from "./pages/CarpetaViewUser";

// Componente auxiliar para proteger rutas
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, loading, profile } = useAuth()

    if (loading) return <p>Cargando...</p>

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Si la ruta define roles permitidos
    if (allowedRoles && !allowedRoles.includes(profile?.tipo)) {
        return <Navigate to="/unauthorized" replace />
    }

    return children
}
const RootRedirect = () => {
    const { isAuthenticated, loading, profile } = useAuth()

    if (loading) return <p>Cargando...</p>

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    // Si está autenticado, redirige según rol
    if (profile?.tipo === "admin") {
        return <Navigate to="/admin" replace />
    }

    if (profile?.tipo === "user") {
        return <Navigate to="/user" replace />
    }

    return <Navigate to="/login" replace />
}


function App() {
    return (    
            <Router>
                <Routes>
                    {/* PUBLIC */}
                    <Route path="/" element={<RootRedirect />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard/carpeta/:id" element={<CarpetaView />} />
                    <Route path="/dashboard/carpetas/:id" element={<CarpetaViewUser />} />
                    <Route path="/home" element={<Home/>}/>
                    {/* ADMIN (Rutas protegidas) */}
                    
                    <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
                        <Route index element={<DashboardAdmin />} />
                        <Route path="empresa/:slug/*" element={<DriveView />} />    
                    </Route>
                    
                    {/* USER (Rutas protegidas) */}
                    
                    <Route path="/user" element={<ProtectedRoute allowedRoles={['user']}><UserLayout /></ProtectedRoute>}>
                        <Route index element={<CarpetaViewUser />} />
                        <Route path="empresa/:slug/*" element={<DriveView />} />
                    </Route>
                    <Route path="/perfil" element={<Perfil />}/>
                    {/* FALLBACK */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
    );
}

export default App;