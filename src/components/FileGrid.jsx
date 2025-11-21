// components/FileGrid.jsx
import { FileText, Image, Video, File, Users, MoreVertical } from "lucide-react";

const FileGrid = ({ files }) => {
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="w-6 h-6 text-red-500" />;
      case 'image':
        return <Image className="w-6 h-6 text-green-500" />;
      case 'video':
        return <Video className="w-6 h-6 text-purple-500" />;
      case 'ppt':
        return <FileText className="w-6 h-6 text-orange-500" />;
      case 'sheet':
        return <FileText className="w-6 h-6 text-green-600" />;
      default:
        return <File className="w-6 h-6 text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay archivos</h3>
        <p className="text-gray-500">Comienza subiendo tu primer archivo</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getFileIcon(file.type)}
              <div>
                <h3 className="font-medium text-gray-900 text-sm truncate max-w-[150px]">
                  {file.name}
                </h3>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatDate(file.modified)}</span>
            <div className="flex items-center space-x-1">
              {file.shared && <Users className="w-3 h-3" />}
              <span>{file.owner}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileGrid;