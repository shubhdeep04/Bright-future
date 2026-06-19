import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiSave } from "react-icons/fi";
import { useContent } from "../../context/ContentContext";

const fields = [
  { key: "hero_title", label: "Hero Title", type: "text" },
  { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
  { key: "mission", label: "Mission Statement", type: "textarea" },
  { key: "vision", label: "Vision Statement", type: "textarea" },
  { key: "stat_beneficiaries", label: "Stat: Children Educated", type: "number" },
  { key: "stat_volunteers", label: "Stat: Active Volunteers", type: "number" },
  { key: "stat_schools", label: "Stat: Partner Schools", type: "number" },
  { key: "stat_years", label: "Stat: Years of Impact", type: "number" },
  { key: "ngo_history", label: "NGO History", type: "textarea" },
  { key: "founder_message", label: "Founder Message", type: "textarea" },
  { key: "founder_name", label: "Founder Name & Title", type: "text" },
  { key: "registration_details", label: "Registration Details", type: "text" },
  { key: "contact_email", label: "Contact Email", type: "text" },
  { key: "contact_phone", label: "Contact Phone", type: "text" },
  { key: "contact_address", label: "Contact Address", type: "textarea" },
];

export default function AdminContent() {
  const { refresh } = useContent();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/content")
      .then((r) => setForm(r.data))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post("/content/bulk", form);
      await refresh();
      toast.success("Site content updated successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display font-bold text-3xl">Site Content Editor</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
        >
          <FiSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-chalk border border-white/10 rounded-card p-6 grid gap-5 md:grid-cols-2">
        {fields.map((f) => (
          <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
            <label className="block text-sm font-semibold mb-2">{f.label}</label>
            {f.type === "textarea" ? (
              <textarea
                rows={3}
                value={form[f.key] ?? ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
              />
            ) : (
              <input
                type={f.type}
                value={form[f.key] ?? ""}
                onChange={(e) =>
                  handleChange(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
