import { useState } from "react";
import { Folder, Home, Plus, File, Upload } from "lucide-react";
import UploadModal from "./UploadModal";

export default function Sidebar({ folders, onSelectFolder }) {
  const [selected, setSelected] = useState("root");
  const [showMenu, setShowMenu] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleClick = (folder) => {
    setSelected(folder.name);
    onSelectFolder(folder);
  };

  const handleUpload = (fileData) => {
    // Aquí puedes manejar los datos del archivo subido
    console.log("Datos del archivo en JSON:", JSON.stringify(fileData, null, 2));
    
    // Aquí podrías agregar la lógica para guardar el archivo en tu estado
    // Por ejemplo, actualizar la lista de archivos en la carpeta actual
    alert(`Archivo subido:\n${JSON.stringify(fileData, null, 2)}`);
  };

  return (
    <>
      <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-[calc(100vh-4rem)] p-6">
        <div className="mb-6 relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-orange-600 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo</span>
          </button>
          
          {/* Menú desplegable */}
          {showMenu && (
            <div className="absolute top-12 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 text-gray-700 transition-colors">
                <Folder className="w-5 h-5 text-blue-500" />
                <span>Nueva Carpeta</span>
              </button>
              <button 
                onClick={() => {
                  setShowMenu(false);
                  setShowUploadModal(true);
                }}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 text-gray-700 transition-colors"
              >
                <File className="w-5 h-5 text-blue-500" />
                <span>Nuevo Archivo</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 text-gray-700 transition-colors">
                <Upload className="w-5 h-5 text-blue-500" />
                <span>Subir Archivo</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <button
            onClick={() => handleClick({ name: "Mi Unidad", subfolders: folders, files: [] })}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
              selected === "root" 
                ? "bg-blue-100 text-blue-700 border border-blue-300" 
                : "hover:bg-gray-50 text-gray-700"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Mi Unidad</span>
          </button>

          <div className="pt-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-3">
              Carpetas
            </h3>
            {folders.map((folder) => (
              <button
                key={folder.name}
                onClick={() => handleClick(folder)}
                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                  selected === folder.name 
                    ? "bg-blue-100 text-blue-700 border border-blue-300" 
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <Folder className="w-5 h-5" />
                <span className="font-medium">{folder.name}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Modal para subir archivos */}
      <UploadModal 
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />
    </>
  );
}