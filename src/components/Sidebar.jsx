import { useState } from "react";
import { Folder, Home, Plus } from "lucide-react";

export default function Sidebar({ folders, onSelectFolder }) {
  const [selected, setSelected] = useState("root");

  const handleClick = (folder) => {
    setSelected(folder.name);
    onSelectFolder(folder);
  };

  return (
    <aside className="w-64 bg-white/90 backdrop-blur-sm shadow-lg border-r border-white/20 h-[calc(100vh-4rem)] p-6">
      <div className="mb-6">
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
          <Plus className="w-4 h-4" />
          <span>Nueva Carpeta</span>
        </button>
      </div>
      
      <div className="space-y-1">
        <button
          onClick={() => handleClick({ name: "Mi Unidad", subfolders: folders, files: [] })}
          className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
            selected === "root" 
              ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200" 
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
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200" 
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
  );
}