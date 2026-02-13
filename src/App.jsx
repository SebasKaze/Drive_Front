// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext'; // Importar el AuthProvider y el useAuth

import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUsuario from "./pages/DashboardUsuario";
import CrearEmpresa from "./pages/Admin/CrearEmpresa";
import AdminLayout from "./layout/AdminLayout";
import DriveView from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import CarpetaView from "./pages/CarpetaView";
import ResetPassword from "./pages/Admin/reset-pasword";
import Perfil from "./components/Perfil";

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


function App() {
    return (    
            <Router>
                <Routes>
                    {/* PUBLIC */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard/carpeta/:id" element={<CarpetaView />} />
                    {/* ADMIN (Rutas protegidas) */}
                    {/* 2. Usar ProtectedRoute para envolver el AdminLayout */}
                    <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
                        <Route index element={<DashboardAdmin />} />
                        <Route path="crear-empresa" element={<CrearEmpresa />} />
                        <Route path="empresa/:slug/*" element={<DriveView />} />    
                    </Route>
                    <Route path="/reset-password" element={< ResetPassword/>} />
                    {/* USER (Rutas protegidas) */}
                    {/* 3. Usar ProtectedRoute para envolver el UserLayout */}
                    <Route path="/user" element={<ProtectedRoute allowedRoles={['user']}><UserLayout /></ProtectedRoute>}>
                        <Route index element={<DashboardUsuario />} />
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