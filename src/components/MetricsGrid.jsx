import { MetricCard } from "./MetricCard.jsx";

export function MetricsGrid({ metrics }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
      }}
    >
      <div style={{ gridColumn: "1 / -1" }}>
        <MetricCard variant="total" value={metrics.total} />
      </div>
      <MetricCard variant="driving" value={metrics.driving} />
      <MetricCard variant="stopped" value={metrics.stopped} />
      <MetricCard variant="offline" value={metrics.offline} />
      <MetricCard variant="untracked" value={metrics.untracked} />
    </div>
  );
}
