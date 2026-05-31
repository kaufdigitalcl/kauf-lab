"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useCalls } from "./useCalls";
import { CallList } from "./CallList";
import { CallForm } from "./CallForm";

export default function HomePage() {
  const { calls, hydrated, addCall, updateCall, deleteCall } = useCalls();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCall, setEditingCall] = useState(null);

  function openNew() {
    setEditingCall(null);
    setIsFormOpen(true);
  }

  function openEdit(call) {
    setEditingCall(call);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
  }

  function handleSubmit(form) {
    if (editingCall) {
      updateCall(editingCall.id, form);
    } else {
      addCall(form);
    }
    closeForm();
  }

  function handleDelete(id) {
    if (!confirm("¿Eliminar esta llamada?")) return;
    deleteCall(id);
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Kauf Call Logger</h1>
        <button type="button" className={styles.newCallBtn} onClick={openNew}>
          + Nueva llamada
        </button>
      </header>

      {hydrated && (
        <CallList calls={calls} onEdit={openEdit} onDelete={handleDelete} />
      )}

      {isFormOpen && (
        <CallForm
          existingCall={editingCall}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}
    </main>
  );
}
