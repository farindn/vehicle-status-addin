const STATUS_CONFIG = {
  total: {
    label: "Total Fleet",
    colorVar: "--backgrounds-primary-brand",
    accentVar: "--backgrounds-primary-brand",
  },
  driving: {
    label: "Driving",
    colorVar: "--accents-success--detail",
    accentVar: "--accents-success--detail",
  },
  stopped: {
    label: "Stopped",
    colorVar: "--accents-warning--detail",
    accentVar: "--accents-warning--detail",
  },
  offline: {
    label: "Offline",
    colorVar: "--accents-error--detail",
    accentVar: "--accents-error--detail",
  },
  untracked: {
    label: "Untracked",
    colorVar: "--text-secondary",
    accentVar: "--text-secondary",
  },
};

export function MetricCard({ variant, value }) {
  const config = STATUS_CONFIG[variant];

  return (
    <div
      className="zen-card"
      style={{
        borderTop: `4px solid var(${config.accentVar})`,
        borderRadius: "var(--border-radius-default, 4px)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: "var(--backgrounds-main)",
      }}
    >
      <div
        className="data-01"
        style={{ color: `var(${config.colorVar})` }}
        aria-label={`${config.label}: ${value}`}
      >
        {value}
      </div>
      <div className="heading-05" style={{ color: "var(--text-secondary)" }}>
        {config.label}
      </div>
    </div>
  );
}
