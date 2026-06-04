"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Traductor base <-> app.
// La base usa snake_case (paso_alcanzado, proximo_paso); el resto de la app
// usa los nombres de siempre (paso, proximoPaso). Convertimos solo acá adentro.
function rowToCall(row) {
  return {
    id: row.id,
    prospecto: row.prospecto,
    fecha: row.fecha,
    paso: row.paso_alcanzado,
    objecion: row.objecion,
    proximoPaso: row.proximo_paso,
    tags: row.tags || [],
  };
}

function formToRow(form) {
  const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
  return {
    prospecto: form.prospecto.trim(),
    fecha: form.fecha,
    paso_alcanzado: Number(form.paso),
    objecion: form.objecion.trim(),
    proximo_paso: form.proximoPaso.trim(),
    tags,
  };
}

export function useCalls() {
  const [calls, setCalls] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Carga inicial desde Supabase (las nuevas primero, por created_at).
  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("calls")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error al cargar llamadas:", error);
        alert("No se pudieron cargar las llamadas. Revisá la conexión.");
      } else {
        setCalls(data.map(rowToCall));
      }
      setHydrated(true);
    }
    load();
  }, []);

  // Devuelven true si la base confirmó, false si falló.
  async function addCall(form) {
    const { data, error } = await supabase
      .from("calls")
      .insert(formToRow(form))
      .select()
      .single();

    if (error) {
      console.error("Error al guardar la llamada:", error);
      alert("No se pudo guardar la llamada.");
      return false;
    }
    setCalls((prev) => [rowToCall(data), ...prev]);
    return true;
  }

  async function updateCall(id, form) {
    const { data, error } = await supabase
      .from("calls")
      .update(formToRow(form))
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error al actualizar la llamada:", error);
      alert("No se pudo actualizar la llamada.");
      return false;
    }
    setCalls((prev) => prev.map((c) => (c.id === id ? rowToCall(data) : c)));
    return true;
  }

  async function deleteCall(id) {
    const { error } = await supabase.from("calls").delete().eq("id", id);

    if (error) {
      console.error("Error al eliminar la llamada:", error);
      alert("No se pudo eliminar la llamada.");
      return false;
    }
    setCalls((prev) => prev.filter((c) => c.id !== id));
    return true;
  }

  return { calls, hydrated, addCall, updateCall, deleteCall };
}
