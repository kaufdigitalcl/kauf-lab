"use client";
import { useEffect, useState } from "react";

const STORAGE_KEY = "kauf-calls";

export function useCalls() {
  const [calls, setCalls] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCalls(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calls));
  }, [calls, hydrated]);

  function addCall(form) {
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    setCalls((prev) => [
      {
        id: Date.now(),
        prospecto: form.prospecto.trim(),
        fecha: form.fecha,
        paso: Number(form.paso),
        objecion: form.objecion.trim(),
        proximoPaso: form.proximoPaso.trim(),
        tags,
      },
      ...prev,
    ]);
  }

  function updateCall(id, form) {
    const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
    setCalls((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              prospecto: form.prospecto.trim(),
              fecha: form.fecha,
              paso: Number(form.paso),
              objecion: form.objecion.trim(),
              proximoPaso: form.proximoPaso.trim(),
              tags,
            }
          : c
      )
    );
  }

  function deleteCall(id) {
    setCalls((prev) => prev.filter((c) => c.id !== id));
  }

  return { calls, hydrated, addCall, updateCall, deleteCall };
}
