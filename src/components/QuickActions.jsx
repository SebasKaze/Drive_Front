// components/QuickActions.jsx
import { FileText, Image, Video, Upload } from "lucide-react";
import { Box } from "@mui/material"; // Opcional si quieres usar Box wrapper

const QuickActions = ({ onUploadClick }) => {
  const actions = [
    { 
      id: 'upload',
      icon: Upload, 
      label: "Subir archivo", 
      color: "bg-blue-100 text-blue-600",
      action: onUploadClick // Asignamos la función específica
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={action.id === 'upload' ? action.action : undefined}
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