import { useState } from "react";
import Sidebar from "../components/Sidebar";
import FileGrid from "../components/FileGrid";

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
      <Sidebar folders={folders} onSelectFolder={setSelectedFolder} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedFolder.name}</h2>
          <p className="text-gray-600 mb-6">
            {selectedFolder.subfolders?.length || 0} carpetas • {selectedFolder.files?.length || 0} archivos
          </p>
          <FileGrid folder={selectedFolder} />
        </div>
      </main>
    </div>
  );
}