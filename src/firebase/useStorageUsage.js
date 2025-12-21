// src/firebase/useStorageUsage.js
// src/firebase/useStorageUsage.js
import { useState, useEffect, useCallback } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function useStorageUsage() {
  const [data, setData] = useState({
    publitio: { usedMB: 0, limitMB: 0, percent: 0, fileCount: 0, error: null },
    vimeo: { usedGB: 0, totalGB: 0, percent: 0, connected: false, error: null },
  });
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setGlobalError(null); // Reset error on new attempt

    try {
      const [publitioRes, vimeoRes] = await Promise.all([
        // Publitio Fetch
        fetch(`${API_BASE}/api/getPublitioUsage`)
          .then((r) =>
            r.ok
              ? r.json()
              : r
                  .json()
                  .then((err) => ({
                    error: err.message || "Publitio Error",
                    success: false,
                  }))
          )
          .catch((err) => ({
            error: `Network Error: ${err.message}`,
            success: false,
          })),

        // Vimeo Fetch
        getVimeoUsageSafe(),
      ]);

      setData({
        publitio: {
          ...publitioRes,
          error: publitioRes.success ? null : publitioRes.error,
        },
        vimeo: { ...vimeoRes, error: vimeoRes.success ? null : vimeoRes.error },
      });

      // If both failed, set a global error
      if (!publitioRes.success && !vimeoRes.success) {
        setGlobalError("All storage services failed to connect.");
      }
    } catch (err) {
      console.error("Storage Hook Crash:", err);
      setGlobalError("An unexpected error occurred while fetching usage.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    ...data,
    loading,
    error: globalError,
    refetch,
  };
}

async function getVimeoUsageSafe() {
  try {
    const res = await fetch(`${API_BASE}/api/getVimeoUsage`);
    const data = await res.json();
    return data.success ? data : { ...data, success: false, connected: false };
  } catch (err) {
    console.log(err)
    return { success: false, connected: false, error: "Vimeo Network Error" };
  }
}