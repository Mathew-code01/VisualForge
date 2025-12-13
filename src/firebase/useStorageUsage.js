// src/firebase/useStorageUsage.js
// src/firebase/useStorageUsage.js
import { useState, useEffect } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export default function useStorageUsage() {
  const [usage, setUsage] = useState({
    publitio: { usedMB: 0, limitMB: 0, percent: 0, fileCount: 0 },
    vimeo: { usedGB: 0, totalGB: 0, percent: 0, connected: false },
    loading: true,
    error: null,
    developerError: null,
  });

  useEffect(() => {
    async function fetchUsage() {
      try {
        const [publitio, vimeo] = await Promise.all([
          fetch(`${API_BASE}/api/getPublitioUsage`)
            .then((r) => {
              if (!r.ok) throw new Error(`Publitio API: ${r.statusText}`);
              return r.json();
            })
            .catch((err) => ({
              success: false,
              usedMB: 0,
              limitMB: 0,
              percent: 0,
              fileCount: 0,
              error:
                err.message ||
                "Network/CORS error while fetching Publitio storage",
            })),
          getVimeoUsageSafe(),
        ]);

        setUsage({
          publitio,
          vimeo,
          loading: false,
          error: publitio.error || vimeo.error || null,
          developerError: null,
        });
      } catch (err) {
        console.error("[STORAGE FETCH ERROR]", err);
        setUsage({
          publitio: { usedMB: 0, limitMB: 0, percent: 0, fileCount: 0 },
          vimeo: { usedGB: 0, totalGB: 0, percent: 0, connected: false },
          loading: false,
          error: "Failed to fetch storage usage.",
          developerError: err.message,
        });
      }
    }

    fetchUsage();
  }, []);

  return usage;
}

async function getVimeoUsageSafe() {
  try {
    const res = await fetch(`${API_BASE}/api/getVimeoUsage`);
    const data = await res.json();

    if (!data.success) {
      return {
        connected: false,
        usedGB: 0,
        totalGB: 0,
        percent: 0,
        error: data.error || "Failed to load Vimeo storage",
      };
    }

    return data;
  } catch (err) {
    console.error("VIMEO FETCH ERROR", err);
    return {
      connected: false,
      usedGB: 0,
      totalGB: 0,
      percent: 0,
      error: "Network error contacting backend",
    };
  }
}

