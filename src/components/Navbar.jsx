export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 p-2 rounded-lg">
          <img src="/drive-icon.png" alt="Drive" className="w-6 h-6 filter brightness-0 invert" />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Drive</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
          + Nuevo Archivo
        </button>
        <div className="flex items-center space-x-3 bg-gray-50 rounded-full pl-3 pr-1 py-1 border border-gray-300">
          <span className="text-sm font-medium text-gray-700">Admin</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          />
        </div>
      </div>
    </nav>
  );
}