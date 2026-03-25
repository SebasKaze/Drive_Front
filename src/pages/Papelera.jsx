import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function CargaMasiva() {
    return (
        <div className="h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Contenido debajo del navbar */}
            <div className="flex flex-1">
                
                {/* Sidebar */}
                <Sidebar />

                {/* Contenido principal */}
                <main className="flex-1 bg-gray-100 p-4 flex items-center justify-center">
                    <div className="text-center">
                        <img 
                            src="https://cdn-icons-png.flaticon.com/512/7486/7486690.png" 
                            alt="Página en mantenimiento" 
                            className="w-64 h-64 mb-6 animate-bounce" 
                        />
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            ¡Estamos en mantenimiento!
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Estamos trabajando para mejorar tu experiencia. Vuelve pronto.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CargaMasiva;