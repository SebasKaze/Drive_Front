import UploadForm from "../components/UploadForm";

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Archivos</h2>
      <UploadForm />
      {/* Aquí después listaremos archivos */}
    </div>
  );
}
