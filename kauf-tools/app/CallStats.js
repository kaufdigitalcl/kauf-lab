import styles from "./CallStats.module.css";

const STEPS = [1, 2, 3, 4, 5, 6];

export function CallStats({ calls }) {
  return (
    <div className={styles.row}>
      <span className={styles.total}>Total: {calls.length}</span>
      <div className={styles.badges}>
        {STEPS.map((p) => (
          <div key={p} className={styles.badge}>
            <span className={styles.step}>P{p}</span>
            <span className={styles.count}>
              {calls.filter((c) => c.paso === p).length}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
