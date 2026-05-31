"use client";
import { useState } from "react";
import styles from "./CallForm.module.css";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function formFromCall(call) {
  if (!call) {
    return { prospecto: "", fecha: todayISO(), paso: "1", objecion: "", proximoPaso: "", tags: "" };
  }
  return {
    prospecto: call.prospecto,
    fecha: call.fecha,
    paso: String(call.paso),
    objecion: call.objecion,
    proximoPaso: call.proximoPaso,
    tags: call.tags.join(", "),
  };
}

export function CallForm({ existingCall, onSubmit, onClose }) {
  const isEditing = Boolean(existingCall);
  const [form, setForm] = useState(() => formFromCall(existingCall));

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={onClose}>
      <form className={styles.modal} onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{isEditing ? "Editar llamada" : "Nueva llamada"}</h2>

        <label className={styles.field}>
          <span>Prospecto</span>
          <input
            type="text"
            value={form.prospecto}
            onChange={handleChange("prospecto")}
            required
            autoFocus
          />
        </label>

        <label className={styles.field}>
          <span>Fecha</span>
          <input type="date" value={form.fecha} onChange={handleChange("fecha")} required />
        </label>

        <label className={styles.field}>
          <span>Paso alcanzado</span>
          <select value={form.paso} onChange={handleChange("paso")}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                Paso {n}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.field}>
          <span>Objeción principal</span>
          <input type="text" value={form.objecion} onChange={handleChange("objecion")} />
        </label>

        <label className={styles.field}>
          <span>Próximo paso</span>
          <input type="text" value={form.proximoPaso} onChange={handleChange("proximoPaso")} />
        </label>

        <label className={styles.field}>
          <span>Tags (separados por coma)</span>
          <input
            type="text"
            value={form.tags}
            onChange={handleChange("tags")}
            placeholder="ej: frío, b2b, urgente"
          />
        </label>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className={styles.saveBtn}>
            {isEditing ? "Guardar cambios" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
