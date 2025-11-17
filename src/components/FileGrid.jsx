import { Folder, File } from "lucide-react";

export default function FileGrid({ folder }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {/* Carpetas */}
      {folder.subfolders?.map((subfolder, index) => (
        <div
          key={index}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors"
        >
          <Folder className="w-12 h-12 text-blue-500 mb-2" />
          <span className="text-sm font-medium text-gray-800 text-center truncate w-full">
            {subfolder.name}
          </span>
        </div>
      ))}
      
      {/* Archivos */}
      {folder.files?.map((file, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <File className="w-12 h-12 text-gray-500 mb-2" />
          <span className="text-sm font-medium text-gray-800 text-center truncate w-full">
            {file.name}
          </span>
        </div>
      ))}
    </div>
  );
}