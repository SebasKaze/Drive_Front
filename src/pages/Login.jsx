export default function Login() {
  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
      <form>
        <input
          type="text"
          placeholder="Usuario"
          className="w-full border p-2 rounded mb-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full border p-2 rounded mb-3"
        />
        <button className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  );
}
