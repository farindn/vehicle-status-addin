import { useFleetData } from "./hooks/useFleetData.js";
import { MetricsGrid } from "./components/MetricsGrid.jsx";
import { LoadingView } from "./components/LoadingView.jsx";
import { ErrorView } from "./components/ErrorView.jsx";

export default function App() {
  const { metrics, loading, error } = useFleetData();

  return (
    <div
      style={{
        padding: "20px",
        height: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h2
        className="heading-02"
        style={{
          color: "var(--backgrounds-primary-brand)",
          margin: "0 0 20px 0",
          paddingBottom: "10px",
          borderBottom: "1px solid var(--borders-general)",
        }}
      >
        Fleet Status Overview
      </h2>

      {error && <ErrorView message={error} />}
      {loading && !error && <LoadingView />}
      {!loading && !error && <MetricsGrid metrics={metrics} />}

      <footer
        style={{ marginTop: "auto", textAlign: "center", paddingTop: "20px" }}
      >
        <span className="body-04" style={{ color: "var(--text-secondary)" }}>
          farinnugraha@geotab.com
        </span>
      </footer>
    </div>
  );
}
