import axios from "axios";
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Archivo subido correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al subir el archivo");
    }
  };

  return (
    <form onSubmit={handleUpload} className="bg-white p-4 rounded shadow max-w-md">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 w-full"
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Subir archivo
      </button>
    </form>
  );
}
