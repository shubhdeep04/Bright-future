import { createContext, useContext, useState, useEffect } from "react";
import api, { healthCheck } from "../utils/api";

const ContentContext = createContext(null);

const fallback = { /* ...your fallback stays the same... */ };

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  const refresh = async () => {
    try {
      const health = await healthCheck();                              // ✅ fixed
      if (health?.status === "OK" && health?.dbStatus === "connected") { // ✅ fixed
        const { data } = await api.get("/content");
        setContent({ ...fallback, ...data });
      } else {
        console.warn("Backend unhealthy or DB disconnected; using fallback.");
      }
    } catch (e) {
      console.warn("Content load skipped due to backend health check failure.", e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <ContentContext.Provider value={{ content, refresh, loaded }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);