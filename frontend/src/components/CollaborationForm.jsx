import { useState } from "react";
import toast from "react-hot-toast";
import { FiSend } from "react-icons/fi";
import api from "../utils/api";

const C = {
  gold: "#f5c842",
  text: "#e8e0d0",
  muted: "rgba(232,224,208,0.55)",
};

const collaborationTypeOptions = [
  "CSR Partnership",
  "School / Institution Partnership",
  "NGO Collaboration",
  "Volunteer Group",
  "Corporate Sponsorship",
  "Other",
];

const emptyForm = {
  organizationName: "",
  contactPerson: "",
  email: "",
  phone: "",
  collaborationType: "",
  message: "",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid rgba(245,200,66,0.18)",
  background: "rgba(255,255,255,0.03)",
  color: C.text,
  fontSize: "0.92rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: "0.78rem",
  fontWeight: 600,
  color: C.muted,
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
};

export default function CollaborationForm() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleFocus = (e) => (e.target.style.borderColor = "rgba(245,200,66,0.6)");
  const handleBlur = (e) => (e.target.style.borderColor = "rgba(245,200,66,0.18)");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.organizationName || !form.contactPerson || !form.email || !form.collaborationType || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.post("/collaborations", form);
      toast.success(res.data?.message || "Your request has been submitted!");
      setForm(emptyForm);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>Organization Name *</label>
          <input
            type="text"
            value={form.organizationName}
            onChange={(e) => handleChange("organizationName", e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
            placeholder="e.g. Acme Corp / ABC School"
          />
        </div>
        <div>
          <label style={labelStyle}>Contact Person *</label>
          <input
            type="text"
            value={form.contactPerson}
            onChange={(e) => handleChange("contactPerson", e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
            placeholder="Your full name"
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={inputStyle}
            placeholder="+91 XXXXX XXXXX"
          />
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>Collaboration Type *</label>
        <select
          value={form.collaborationType}
          onChange={(e) => handleChange("collaborationType", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          <option value="" style={{ background: "#0d1120" }}>Select a category</option>
          {collaborationTypeOptions.map((opt) => (
            <option key={opt} value={opt} style={{ background: "#0d1120" }}>{opt}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>Message *</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="Tell us a bit about your organization and how you'd like to collaborate..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          width: "100%",
          padding: "14px 24px",
          borderRadius: 999,
          border: "none",
          background: "linear-gradient(to right,#f5c842,#e8a820)",
          color: "#0b0f1a",
          fontWeight: 700,
          fontSize: "0.95rem",
          cursor: submitting ? "not-allowed" : "pointer",
          opacity: submitting ? 0.7 : 1,
          transition: "opacity 0.2s",
        }}
      >
        {submitting ? "Submitting..." : (<>Submit Request <FiSend size={16} /></>)}
      </button>
    </form>
  );
}