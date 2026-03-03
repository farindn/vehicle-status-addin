export function LoadingView() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
      }}
    >
      <div
        className="zen-card"
        style={{
          gridColumn: "1 / -1",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          background: "var(--backgrounds-main)",
          borderRadius: "var(--border-radius-default, 4px)",
        }}
      >
        <div
          className="zen-skeleton zen-skeleton--text"
          style={{ width: "80px", height: "32px" }}
        />
        <div
          className="zen-skeleton zen-skeleton--text"
          style={{ width: "100px", height: "14px" }}
        />
      </div>

      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="zen-card"
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            background: "var(--backgrounds-main)",
            borderRadius: "var(--border-radius-default, 4px)",
          }}
        >
          <div
            className="zen-skeleton zen-skeleton--text"
            style={{ width: "60px", height: "32px" }}
          />
          <div
            className="zen-skeleton zen-skeleton--text"
            style={{ width: "80px", height: "14px" }}
          />
        </div>
      ))}
    </div>
  );
}
