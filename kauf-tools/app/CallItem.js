import styles from "./CallItem.module.css";

export function CallItem({ call, onEdit, onDelete }) {
  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <span className={styles.prospecto}>{call.prospecto}</span>
        <div className={styles.right}>
          <span className={styles.fecha}>{call.fecha}</span>
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => onEdit(call)}
          >
            Editar
          </button>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => onDelete(call.id)}
            aria-label={`Eliminar llamada de ${call.prospecto}`}
          >
            Eliminar
          </button>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.paso}>Paso {call.paso}</span>
        {call.objecion && (
          <span className={styles.objecionBadge}>{call.objecion}</span>
        )}
        {call.tags.length > 0 && (
          <span className={styles.tags}>
            {call.tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </span>
        )}
      </div>

      {call.proximoPaso && (
        <p className={styles.proximoPaso}>→ {call.proximoPaso}</p>
      )}
    </li>
  );
}
