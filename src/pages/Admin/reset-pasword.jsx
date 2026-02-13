import { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
            console.error("Error obteniendo sesión:", error.message);
            }

            if (!data.session) {
            console.error("No hay sesión activa");
            }
        };

        checkSession();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase.auth.updateUser({
        password,
        });

        if (error) {
        console.error(error.message);
        return;
        }

        setSuccess(true);

        // Opcional: redirigir al login después de 2 segundos
        setTimeout(() => {
        navigate("/login");
        }, 2000);
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <form onSubmit={handleSubmit}>
        <h2>Crear contraseña</h2>

        <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <button type="submit">Guardar contraseña</button>

        {success && <p>Contraseña creada correctamente.</p>}
        </form>
    );
}
