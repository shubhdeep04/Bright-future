import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const ContentContext = createContext(null);

const fallback = {
  hero_title: "Empowering Children Through Education",
  hero_subtitle:
    "Bright Futures Foundation works to ensure every child has access to quality education, regardless of their background.",
  mission: "To provide free, quality education and learning resources to underprivileged children across India.",
  vision: "A world where every child has the opportunity to learn, grow, and reach their full potential.",
  stat_beneficiaries: 5200,
  stat_volunteers: 340,
  stat_schools: 28,
  stat_years: 12,
  founder_message:
    "When we started Bright Futures over a decade ago, we had one simple goal: no child should be denied education because of poverty.",
  founder_name: "Dr. Meera Joshi, Founder & Director",
  ngo_history:
    "Founded in 2014, Bright Futures Foundation began as a small after-school tutoring initiative.",
  registration_details: "Registered under Societies Registration Act, 1860 | Reg No: MP/EDU/2014/00123 | 80G & 12A Certified",
  contact_email: "contact@brightfutures.org",
  contact_phone: "+91 98765 43210",
  contact_address: "123 Hope Street, Khandwa, Madhya Pradesh, India - 450001",
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(fallback);
  const [loaded, setLoaded] = useState(false);

  const refresh = async () => {
    try {
      const { data } = await api.get("/content");
      setContent({ ...fallback, ...data });
    } catch (e) {
      // use fallback silently
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
