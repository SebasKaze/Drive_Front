export default function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
          <img src="/drive-icon.png" alt="Drive" className="w-6 h-6 filter brightness-0 invert" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Drive</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg">
          + Nuevo Archivo
        </button>
        <div className="flex items-center space-x-3 bg-white/80 rounded-full pl-3 pr-1 py-1 border border-gray-200">
          <span className="text-sm font-medium text-gray-700">Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-white shadow"
          />
        </div>
      </div>
    </nav>
  );
}