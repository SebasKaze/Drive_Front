import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const location = useLocation();

  // Rutas donde NO quieres que aparezca el Navbar
  const hideNavbarRoutes = ["/login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mostrar navbar solo si no estamos en login */}
      {!shouldHideNavbar && <Navbar />}

      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
