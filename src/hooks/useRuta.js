import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export function useRuta(id) {
  const [ruta, setRuta] = useState([]);

  useEffect(() => {
    if (!id) {
      setRuta([]);
      return;
    }

    const fetchRuta = async () => {
      try {
        const session = await supabase.auth.getSession();
        const token = session.data.session?.access_token;

        const res = await fetch(
          `https://drivebacksup.onrender.com/empresa/ruta/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setRuta(data.reverse());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRuta();
  }, [id]);

  return ruta;
}
