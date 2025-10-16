import { File, Folder, MoreVertical } from "lucide-react";

export default function FileGrid({ folder }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {folder.subfolders?.map((sub) => (
        <div
          key={sub.name}
          className="bg-white group border border-gray-200 rounded-xl p-4 hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <Folder className="w-10 h-10 text-blue-500" />
            <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <p className="font-medium text-gray-800 truncate">{sub.name}</p>
          <p className="text-xs text-gray-500 mt-1">Carpeta</p>
        </div>
      ))}

      {folder.files?.map((file) => (
        <div
          key={file.name}
          className="bg-white group border border-gray-200 rounded-xl p-4 hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-3">
            <File className="w-10 h-10 text-green-500" />
            <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <p className="font-medium text-gray-800 truncate">{file.name}</p>
          <p className="text-xs text-gray-500 mt-1">Archivo</p>
        </div>
      ))}
    </div>
  );
}