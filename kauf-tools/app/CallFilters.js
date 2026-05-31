import styles from "./CallFilters.module.css";

const STEPS = [1, 2, 3, 4, 5, 6];

export function CallFilters({
  filterPaso,
  setFilterPaso,
  filterTag,
  setFilterTag,
  allTags,
  onClear,
}) {
  const hasFilters = filterPaso !== "" || filterTag !== "";

  return (
    <div className={styles.bar}>
      <select
        className={styles.select}
        value={filterPaso}
        onChange={(e) => setFilterPaso(e.target.value)}
      >
        <option value="">Todos los pasos</option>
        {STEPS.map((p) => (
          <option key={p} value={String(p)}>
            Paso {p}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        disabled={allTags.length === 0}
      >
        <option value="">Todos los tags</option>
        {allTags.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {hasFilters && (
        <button type="button" className={styles.clearBtn} onClick={onClear}>
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
