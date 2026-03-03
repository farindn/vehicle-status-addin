export function ErrorView({ message }) {
  return (
    <div style={{ padding: "16px 0" }}>
      <div
        className="zen-banner zen-banner--error"
        role="alert"
        style={{ borderRadius: "var(--border-radius-default, 4px)" }}
      >
        <div className="zen-banner__content">
          <div className="zen-banner__header heading-05">Error</div>
          <div className="zen-banner__message body-02-short">
            {message || "An unexpected error occurred while loading fleet data."}
          </div>
        </div>
      </div>
    </div>
  );
}
