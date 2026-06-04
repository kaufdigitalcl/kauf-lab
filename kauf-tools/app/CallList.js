import styles from "./CallList.module.css";
import { CallItem } from "./CallItem";

export function CallList({ calls, onEdit, onDelete, emptyText = "Todavía no hay llamadas registradas." }) {
  if (calls.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.empty}>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {calls.map((c) => (
          <CallItem key={c.id} call={c} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
