import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-semibold">MiDrive</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Login</Link>
        <Link to="/home" className="hover:underline">Home</Link>
      </div>
    </nav>
  );
}
