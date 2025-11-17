import { useState } from "react";
import Sidebar from "../components/Sidebar";
import FileGrid from "../components/FileGrid";
import { Search } from "lucide-react";

export default function Home() {
  const [folders] = useState([
    {
      name: "Proyectos",
      subfolders: [{ name: "React" }, { name: "Python" }],
      files: [{ name: "README.txt" }],
    },
    {
      name: "Fotos",
      subfolders: [{ name: "Vacaciones" }],
      files: [{ name: "familia.png" }, { name: "mascota.jpg" }],
    },
  ]);

  const [selectedFolder, setSelectedFolder] = useState({
    name: "Mi Unidad",
    subfolders: folders,
    files: [],
  });

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <Sidebar folders={folders} onSelectFolder={setSelectedFolder} />

      {/* Contenedor principal */}
      <main className="flex-1 p-6 flex justify-center items-start overflow-hidden">
        <div
          className="
            bg-white rounded-lg p-6 shadow-sm border border-gray-200
            w-[100%] max-w-6xl h-[650px]  /* tamaño fijo más grande */
            overflow-y-auto               /* scroll vertical si hay overflow */
          "
        >
          {/* Header con título y buscador */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedFolder.name}
              </h2>
              <p className="text-gray-600">
                {selectedFolder.subfolders?.length || 0} carpetas •{" "}
                {selectedFolder.files?.length || 0} archivos
              </p>
            </div>
            <div className="relative">
              <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 border border-gray-300">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-transparent outline-none text-gray-700 w-64"
                />
              </div>
            </div>
          </div>

          {/* Contenido con scroll si excede la altura */}
          <div className="overflow-y-auto">
            <FileGrid folder={selectedFolder} />
          </div>
        </div>
      </main>
    </div>
  );
}
