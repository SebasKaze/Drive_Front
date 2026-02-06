// components/Header.jsx
import { Search, Plus, Upload } from "lucide-react";

const Header = ({ searchQuery, onSearchChange, currentView }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi Drive</h1>
        <p className="text-gray-600">
          {currentView === "mi-unidad" && "Gestiona todos tus archivos"}
          {currentView === "compartidos" && "Archivos compartidos contigo"}
          {currentView === "recientes" && "Tus archivos recientes"}
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Buscador */}
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar en Drive..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
          />
        </div>

        {/* Botones de acción */}
        <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <span>Buscar</span>
        </button>

      </div>
    </div>
  );
};

export default Header;