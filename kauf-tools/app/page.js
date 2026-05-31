"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { useCalls } from "./useCalls";
import { CallList } from "./CallList";
import { CallForm } from "./CallForm";
import { CallStats } from "./CallStats";
import { CallFilters } from "./CallFilters";

export default function HomePage() {
  const { calls, hydrated, addCall, updateCall, deleteCall } = useCalls();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCall, setEditingCall] = useState(null);
  const [filterPaso, setFilterPaso] = useState("");
  const [filterTag, setFilterTag] = useState("");

  const allTags = [...new Set(calls.flatMap((c) => c.tags || []))].sort();

  const filteredCalls = calls.filter((c) => {
    if (filterPaso && c.paso !== Number(filterPaso)) return false;
    if (filterTag && !(c.tags || []).includes(filterTag)) return false;
    return true;
  });

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

  function clearFilters() {
    setFilterPaso("");
    setFilterTag("");
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
        <>
          <CallStats calls={calls} />
          <CallFilters
            filterPaso={filterPaso}
            setFilterPaso={setFilterPaso}
            filterTag={filterTag}
            setFilterTag={setFilterTag}
            allTags={allTags}
            onClear={clearFilters}
          />
          <CallList
            calls={filteredCalls}
            onEdit={openEdit}
            onDelete={handleDelete}
            emptyText={
              calls.length > 0
                ? "Ninguna llamada coincide con los filtros."
                : "Todavía no hay llamadas registradas."
            }
          />
        </>
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
