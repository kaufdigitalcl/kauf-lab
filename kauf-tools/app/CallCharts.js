"use client";

import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./CallCharts.module.css";

function formatDateLabel(date) {
  if (!date) return "Sin fecha";

  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "short",
  }).format(parsed);
}

function buildCallsByDay(calls) {
  const grouped = calls.reduce((acc, call) => {
    const key = call.fecha || "Sin fecha";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .sort(([a], [b]) => {
      if (a === "Sin fecha") return 1;
      if (b === "Sin fecha") return -1;
      return a.localeCompare(b);
    })
    .map(([fecha, cantidad]) => ({
      fecha,
      label: formatDateLabel(fecha),
      cantidad,
    }));
}

function EmptyChart() {
  return (
    <div className={styles.empty}>
      Todavia no hay llamadas para graficar.
    </div>
  );
}

export function CallCharts({ calls }) {
  const callsByDay = buildCallsByDay(calls);
  const reachedStep3 = calls.filter((call) => Number(call.paso) >= 3).length;
  const step3Rate =
    calls.length > 0 ? Math.round((reachedStep3 / calls.length) * 100) : 0;
  const step3Data = [
    { name: "Paso 3+", value: step3Rate },
    { name: "Resto", value: Math.max(100 - step3Rate, 0) },
  ];

  return (
    <section className={styles.grid} aria-label="Graficos de llamadas">
      <article className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Llamadas por dia</h2>
          <span className={styles.cardMeta}>{calls.length} total</span>
        </div>

        <div className={styles.chartArea}>
          {callsByDay.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={callsByDay}
                margin={{ top: 8, right: 4, bottom: 0, left: -24 }}
              >
                <CartesianGrid
                  stroke="rgba(161, 161, 170, 0.14)"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a1a1aa", fontSize: 12 }}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#a1a1aa", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: 6,
                    color: "#ededed",
                  }}
                  labelStyle={{ color: "#a1a1aa" }}
                />
                <Line
                  type="monotone"
                  dataKey="cantidad"
                  name="Llamadas"
                  stroke="#e11d48"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#e11d48", strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: "#e11d48", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart />
          )}
        </div>
      </article>

      <article className={styles.card}>
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Llegada a Paso 3+</h2>
          <span className={styles.cardMeta}>{reachedStep3} llamadas</span>
        </div>

        <div className={styles.metricArea}>
          {calls.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={step3Data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={74}
                    paddingAngle={2}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    <Cell fill="#e11d48" />
                    <Cell fill="#27272a" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.metricValue}>
                <strong>{step3Rate}%</strong>
                <span>Paso 3+</span>
              </div>
            </>
          ) : (
            <EmptyChart />
          )}
        </div>
      </article>
    </section>
  );
}
