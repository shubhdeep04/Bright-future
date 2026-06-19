// import { useState, useEffect } from "react";
// import api from "../../utils/api";
// import toast from "react-hot-toast";
// import { FiTrash2, FiMail } from "react-icons/fi";
// import AdminModal from "../../components/AdminModal";

// export default function AdminContacts() {
//   const [contacts, setContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [view, setView] = useState(null);

//   const load = () => {
//     setLoading(true);
//     api
//       .get("/contact")
//       .then((r) => setContacts(r.data))
//       .catch(() => setContacts([]))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await api.put(`/contact/${id}`, { status });
//       toast.success("Status updated");
//       load();
//       if (view?._id === id) setView({ ...view, status });
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to update");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this message?")) return;
//     try {
//       await api.delete(`/contact/${id}`);
//       toast.success("Message removed");
//       setView(null);
//       load();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to delete");
//     }
//   };

//   const openView = (c) => {
//     setView(c);
//     if (c.status === "new") updateStatus(c._id, "read");
//   };

//   const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);

//   return (
//     <div>
//       <h1 className="font-display font-bold text-3xl mb-6">Contact Queries</h1>

//       <div className="flex flex-wrap gap-3 mb-6">
//         {["all", "new", "read", "resolved"].map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border-2 transition-colors ${
//               filter === f ? "bg-marigold border-marigold text-white" : "border-white/10 text-slate hover:border-marigold"
//             }`}
//           >
//             {f}
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : filtered.length === 0 ? (
//         <p className="text-slate">No messages found.</p>
//       ) : (
//         <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-slate border-b border-white/10">
//                 <th className="p-4">Name</th>
//                 <th className="p-4">Email</th>
//                 <th className="p-4">Subject</th>
//                 <th className="p-4">Date</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((c) => (
//                 <tr key={c._id} className="border-b border-white/10 last:border-0">
//                   <td className="p-4 font-medium">{c.name}</td>
//                   <td className="p-4">{c.email}</td>
//                   <td className="p-4">{c.subject || "-"}</td>
//                   <td className="p-4">{new Date(c.createdAt).toLocaleDateString("en-IN")}</td>
//                   <td className="p-4">
//                     <span
//                       className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
//                         c.status === "new"
//                           ? "bg-marigold/15 text-marigold"
//                           : c.status === "read"
//                           ? "bg-white/5 text-ink"
//                           : "bg-leaf/15 text-leaf"
//                       }`}
//                     >
//                       {c.status}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       <button onClick={() => openView(c)} className="text-ink hover:text-marigold">
//                         <FiMail size={16} />
//                       </button>
//                       <button onClick={() => handleDelete(c._id)} className="text-terracotta hover:text-red-600">
//                         <FiTrash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {view && (
//         <AdminModal title={view.subject || "Message"} onClose={() => setView(null)}>
//           <div className="space-y-3">
//             <p><span className="font-semibold">From:</span> {view.name} ({view.email})</p>
//             {view.phone && <p><span className="font-semibold">Phone:</span> {view.phone}</p>}
//             <p><span className="font-semibold">Date:</span> {new Date(view.createdAt).toLocaleString("en-IN")}</p>
//             <div className="bg-white/[0.03] rounded-xl p-4 text-sm text-slate leading-relaxed whitespace-pre-wrap">
//               {view.message}
//             </div>
//             <div className="flex gap-2 pt-2">
//               {["new", "read", "resolved"].map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => updateStatus(view._id, s)}
//                   className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border-2 transition-colors ${
//                     view.status === s ? "bg-marigold border-marigold text-white" : "border-white/10 text-slate hover:border-marigold"
//                   }`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </AdminModal>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import {
  FiSave, FiMapPin, FiMail, FiPhone, FiClock,
  FiMap, FiImage, FiFacebook, FiInstagram, FiTwitter,
  FiAlertCircle, FiCheckCircle, FiRefreshCw, FiEye
} from "react-icons/fi";
import { useContent } from "../../context/ContentContext";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

/* ── Field definitions — easy to extend ── */
const SECTIONS = [
  {
    title: "Hero Section",
    icon: FiAlertCircle,
    color: "text-marigold",
    fields: [
      { key: "contact_eyebrow",       label: "Eyebrow Tag",    type: "text",     placeholder: "Contact Us",      hint: "Small label above the title" },
      { key: "contact_hero_title",    label: "Page Title",     type: "text",     placeholder: "Get in Touch",    hint: "Main heading on the contact page" },
      { key: "contact_hero_subtitle", label: "Page Subtitle",  type: "textarea", placeholder: "Have questions about our programs...", hint: "Short description under the title" },
    ],
  },
  {
    title: "Contact Details",
    icon: FiMapPin,
    color: "text-terracotta",
    fields: [
      { key: "contact_address", label: "Office Address", type: "textarea", placeholder: "123, Nehru Nagar, Khandwa, MP - 450001", hint: "Shown in the 'Visit Us' card" },
      { key: "contact_email",   label: "Email Address",  type: "text",     placeholder: "info@brightfutures.org",                 hint: "Shown in the 'Email Us' card" },
      { key: "contact_phone",   label: "Phone Number",   type: "text",     placeholder: "+91 98765 43210",                        hint: "Shown in the 'Call Us' card" },
      { key: "contact_hours",   label: "Office Hours",   type: "text",     placeholder: "Mon – Sat: 9:00 AM – 6:00 PM",           hint: "Shown in the 'Office Hours' card" },
    ],
  },
  {
    title: "Office Image",
    icon: FiImage,
    color: "text-leaf",
    fields: [
      { key: "office_image", label: "Office Image URL", type: "image", placeholder: "https://...", hint: "Photo shown inside the 'Visit Us' card. Leave blank to hide." },
    ],
  },
  {
    title: "Map Embed",
    icon: FiMap,
    color: "text-sky-400",
    fields: [
      { key: "contact_map_url",   label: "Map Embed URL",  type: "text", placeholder: "https://www.openstreetmap.org/export/embed.html?...", hint: "OpenStreetMap or Google Maps embed src URL" },
      { key: "contact_map_label", label: "Map Pin Label",  type: "text", placeholder: "📍 Khandwa, Madhya Pradesh",                          hint: "Badge shown on bottom-right corner of map" },
    ],
  },
  {
    title: "Social Media Links",
    icon: FiFacebook,
    color: "text-blue-400",
    fields: [
      { key: "contact_facebook",  label: "Facebook URL",  type: "text", placeholder: "https://facebook.com/yourpage",  hint: "Leave blank to hide the icon" },
      { key: "contact_instagram", label: "Instagram URL", type: "text", placeholder: "https://instagram.com/yourpage", hint: "Leave blank to hide the icon" },
      { key: "contact_twitter",   label: "Twitter/X URL", type: "text", placeholder: "https://twitter.com/yourpage",   hint: "Leave blank to hide the icon" },
    ],
  },
];

export default function AdminContact() {
  const { content, refreshContent } = useContent();
  const [form, setForm]         = useState({});
  const [saving, setSaving]     = useState(false);
  const [dirty, setDirty]       = useState(false);
  const [saved, setSaved]       = useState(false);

  // All field keys flattened
  const ALL_KEYS = SECTIONS.flatMap(s => s.fields.map(f => f.key));

  // Initialise form from content
  useEffect(() => {
    const init = {};
    ALL_KEYS.forEach(k => { init[k] = content[k] || ""; });
    setForm(init);
    setDirty(false);
  }, [content]);

  const handleChange = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    setDirty(true);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.post("/content/bulk", form);
      if (refreshContent) await refreshContent();
      toast.success("Contact page updated successfully!");
      setSaved(true);
      setDirty(false);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    const init = {};
    ALL_KEYS.forEach(k => { init[k] = content[k] || ""; });
    setForm(init);
    setDirty(false);
    toast("Changes discarded", { icon: "↩️" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* ── Page Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-ink">Contact Page Editor</h1>
          <p className="text-slate text-sm mt-1">Changes here update the public Contact page instantly after saving.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/contact" target="_blank"
            className="flex items-center gap-2 text-sm text-slate border border-white/15 px-4 py-2 rounded-full hover:border-marigold/50 transition-colors">
            <FiEye size={14} /> Preview Page
          </Link>
          <button onClick={handleReset} disabled={!dirty || saving}
            className="flex items-center gap-2 text-sm text-slate border border-white/15 px-4 py-2 rounded-full hover:border-white/30 transition-colors disabled:opacity-40">
            <FiRefreshCw size={14} /> Reset
          </button>
          <button onClick={handleSave} disabled={saving || !dirty}
            className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-6 py-2 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-50 text-sm">
            {saving ? (
              <><FiRefreshCw size={14} className="animate-spin" /> Saving...</>
            ) : saved ? (
              <><FiCheckCircle size={14} /> Saved!</>
            ) : (
              <><FiSave size={14} /> Save Changes</>
            )}
          </button>
        </div>
      </div>

      {/* Unsaved banner */}
      {dirty && (
        <div className="flex items-center gap-3 bg-marigold/10 border border-marigold/30 rounded-xl px-4 py-3 text-sm text-marigold">
          <FiAlertCircle size={16} />
          You have unsaved changes. Click <strong>Save Changes</strong> to publish.
        </div>
      )}

      {/* ── Sections ── */}
      {SECTIONS.map((section, si) => (
        <div key={si} className="bg-chalk border border-white/10 rounded-card overflow-hidden">
          {/* Section header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-white/8 bg-white/[0.015]">
            <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${section.color}`}>
              <section.icon size={16} />
            </div>
            <h2 className="font-display font-bold text-base text-ink">{section.title}</h2>
          </div>

          {/* Fields */}
          <div className="p-6 space-y-6">
            {section.fields.map((field) => (
              <FieldEditor
                key={field.key}
                field={field}
                value={form[field.key] || ""}
                onChange={(val) => handleChange(field.key, val)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* ── Bottom Save Bar ── */}
      <div className="sticky bottom-6 flex justify-end">
        <button onClick={handleSave} disabled={saving || !dirty}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-marigold/25 hover:shadow-marigold/40 transition-all disabled:opacity-50">
          {saving ? (
            <><FiRefreshCw size={15} className="animate-spin" /> Saving...</>
          ) : saved ? (
            <><FiCheckCircle size={15} /> All Saved!</>
          ) : (
            <><FiSave size={15} /> Save All Changes</>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── Individual Field Editor ── */
function FieldEditor({ field, value, onChange }) {
  const [imgError, setImgError] = useState(false);

  const baseInput = "w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.03] outline-none transition-colors bg-transparent text-ink text-sm placeholder:text-slate/50";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold text-ink">{field.label}</label>
        <span className="text-xs text-slate/50 font-mono">{field.key}</span>
      </div>

      {field.type === "textarea" ? (
        <textarea
          rows={3}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${baseInput} resize-y min-h-[80px]`}
        />
      ) : field.type === "image" ? (
        <div className="space-y-3">
          <input
            type="url"
            value={value}
            onChange={e => { onChange(e.target.value); setImgError(false); }}
            placeholder={field.placeholder}
            className={baseInput}
          />
          {value && !imgError && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 bg-white/[0.02]">
              <img
                src={value}
                alt="Preview"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">Preview</span>
            </div>
          )}
          {imgError && (
            <p className="text-xs text-terracotta flex items-center gap-1">
              <FiAlertCircle size={12} /> Could not load image from this URL.
            </p>
          )}
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={baseInput}
        />
      )}

      {field.hint && (
        <p className="text-xs text-slate/60 flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-white/10 flex items-center justify-center text-[9px] flex-shrink-0">i</span>
          {field.hint}
        </p>
      )}
    </div>
  );
}