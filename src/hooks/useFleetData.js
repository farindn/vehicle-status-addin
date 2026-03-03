import { useState, useEffect } from "react";
import { fetchAllDevices, calculateFleetMetrics } from "../api/geotab.js";

const EMPTY_METRICS = {
  total: 0,
  driving: 0,
  stopped: 0,
  offline: 0,
  untracked: 0,
};

export function useFleetData() {
  const [metrics, setMetrics] = useState(EMPTY_METRICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [activeGroups, setActiveGroups] = useState(null);

  // Parse URL params and register postMessage listener
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const creds = {
      server: params.get("server"),
      database: params.get("database"),
      sessionId: params.get("sessionId"),
      userName: params.get("userName"),
    };
    if (!creds.sessionId) {
      setError("Session credentials missing.");
      setLoading(false);
      return;
    }

    setCredentials(creds);
    setActiveGroups(params.get("groups"));

    const handleMessage = (event) => {
      if (event.data && event.data.type === "FILTER_UPDATE") {
        setActiveGroups(event.data.groups);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Re-fetch whenever credentials or activeGroups change
  useEffect(() => {
    if (!credentials) return;
    let cancelled = false;

    const runSync = async () => {
      setLoading(true);
      setError(null);
      try {
        const devices = await fetchAllDevices(credentials, activeGroups);
        if (cancelled) return;
        const result = await calculateFleetMetrics(devices, credentials);
        if (cancelled) return;
        setMetrics(result);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    runSync();
    return () => {
      cancelled = true;
    };
  }, [credentials, activeGroups]);

  return { metrics, loading, error };
}
