// components/QuickActions.jsx
import { FileText, Image, Video, Upload } from "lucide-react";

const QuickActions = () => {
  const actions = [
    { icon: Upload, label: "Subir archivo", color: "bg-blue-100 text-blue-600" },
    { icon: FileText, label: "Documento", color: "bg-green-100 text-green-600" },
    { icon: Image, label: "Imagen", color: "bg-purple-100 text-purple-600" },
    { icon: Video, label: "Video", color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {actions.map((action, index) => (
        <button
          key={index}
          className="flex items-center space-x-3 bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
            <action.icon className="w-5 h-5" />
          </div>
          <span className="font-medium text-gray-800">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;