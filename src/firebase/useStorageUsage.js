// src/firebase/useStorageUsage.js
// src/firebase/useStorageUsage.js
import { useState, useEffect, useCallback } from "react";

const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


export default function useStorageUsage() {
  const [isAuditing, setIsAuditing] = useState(false);
  const [data, setData] = useState({
    publitio: { usedMB: 0, limitMB: 0, percent: 0, fileCount: 0, error: null },
    vimeo: { usedGB: 0, totalGB: 0, percent: 0, connected: false, error: null },
  });
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState(null);

  const refetch = useCallback(async (isDeepAudit = false) => {
    setLoading(true);
    if (isDeepAudit) setIsAuditing(true);
    setGlobalError(null);

    try {
      // If isDeepAudit is true, we trigger the 'clean' query param
      const publitioUrl = isDeepAudit
        ? `${API_BASE}/api/getPublitioUsage?clean=true`
        : `${API_BASE}/api/getPublitioUsage`;

      const [publitioRes, vimeoRes] = await Promise.all([
        fetch(publitioUrl).then((r) => r.json()),
        getVimeoUsageSafe(),
      ]);

      setData({
        publitio: {
          ...publitioRes,
          error: publitioRes.success ? null : publitioRes.error,
        },
        vimeo: { ...vimeoRes, error: vimeoRes.success ? null : vimeoRes.error },
      });

      if (isDeepAudit && publitioRes.success) {
        console.log("Deep Audit: Ghost files purged successfully.");
      }
    } catch (err) {
      console.log(err)
      setGlobalError("Storage synchronization failed.");
    } finally {
      setLoading(false);
      setIsAuditing(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    ...data,
    loading,
    isAuditing,
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