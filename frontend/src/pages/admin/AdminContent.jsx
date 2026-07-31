// import { useState, useEffect } from "react";
// import api from "../../utils/api";
// import toast from "react-hot-toast";
// import { FiSave } from "react-icons/fi";
// import { useContent } from "../../context/ContentContext";

// const fields = [
//   { key: "hero_title", label: "Hero Title", type: "text" },
//   { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
//   { key: "mission", label: "Mission Statement", type: "textarea" },
//   { key: "vision", label: "Vision Statement", type: "textarea" },
//   { key: "stat_beneficiaries", label: "Stat: Children Educated", type: "number" },
//   { key: "stat_volunteers", label: "Stat: Active Volunteers", type: "number" },
//   { key: "stat_schools", label: "Stat: Partner Schools", type: "number" },
//   { key: "stat_years", label: "Stat: Years of Impact", type: "number" },
//   { key: "ngo_history", label: "NGO History", type: "textarea" },
//   { key: "founder_message", label: "Founder Message", type: "textarea" },
//   { key: "founder_name", label: "Founder Name & Title", type: "text" },
//   { key: "registration_details", label: "Registration Details", type: "text" },
//   { key: "contact_email", label: "Contact Email", type: "text" },
//   { key: "contact_phone", label: "Contact Phone", type: "text" },
//   { key: "contact_address", label: "Contact Address", type: "textarea" },
// ];

// export default function AdminContent() {
//   const { refresh } = useContent();
//   const [form, setForm] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     api
//       .get("/content")
//       .then((r) => setForm(r.data))
//       .finally(() => setLoading(false));
//   }, []);

//   const handleChange = (key, value) => setForm({ ...form, [key]: value });

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       await api.post("/content/bulk", form);
//       await refresh();
//       toast.success("Site content updated successfully!");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-32">
//         <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//         <h1 className="font-display font-bold text-3xl">Site Content Editor</h1>
//         <button
//           onClick={handleSave}
//           disabled={saving}
//           className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
//         >
//           <FiSave /> {saving ? "Saving..." : "Save Changes"}
//         </button>
//       </div>

//       <div className="bg-chalk border border-white/10 rounded-card p-6 grid gap-5 md:grid-cols-2">
//         {fields.map((f) => (
//           <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
//             <label className="block text-sm font-semibold mb-2">{f.label}</label>
//             {f.type === "textarea" ? (
//               <textarea
//                 rows={3}
//                 value={form[f.key] ?? ""}
//                 onChange={(e) => handleChange(f.key, e.target.value)}
//                 className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
//               />
//             ) : (
//               <input
//                 type={f.type}
//                 value={form[f.key] ?? ""}
//                 onChange={(e) =>
//                   handleChange(f.key, f.type === "number" ? Number(e.target.value) : e.target.value)
//                 }
//                 className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import {
  FiSave, FiPlus, FiTrash2, FiChevronUp, FiChevronDown, FiUpload, FiImage,
} from "react-icons/fi";
import { useContent } from "../../context/ContentContext";
import {
  ICON_OPTIONS,
  defaultHeroSlides, defaultPrograms, defaultTrustBadges,
  defaultImpactStories, defaultTeamMembers, defaultPartners,
} from "../../data/homeContentDefaults";

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

/* ─── Small reusable helpers for list-editing ─────────────────── */
function moveItem(list, index, dir) {
  const arr = [...list];
  const target = index + dir;
  if (target < 0 || target >= arr.length) return arr;
  [arr[index], arr[target]] = [arr[target], arr[index]];
  return arr;
}

/* ─── Shared UI bits ───────────────────────────────────────────── */
function SectionCard({ title, hint, children }) {
  return (
    <div className="bg-chalk border border-white/10 rounded-card p-6 mb-8">
      <h2 className="font-display font-bold text-xl mb-1">{title}</h2>
      {hint && <p className="text-sm text-white/40 mb-5">{hint}</p>}
      {children}
    </div>
  );
}

function ItemToolbar({ index, length, onUp, onDown, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={onUp} disabled={index === 0}
        className="p-2 rounded-lg border border-white/10 hover:border-marigold/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
        <FiChevronUp size={14} />
      </button>
      <button type="button" onClick={onDown} disabled={index === length - 1}
        className="p-2 rounded-lg border border-white/10 hover:border-marigold/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
        <FiChevronDown size={14} />
      </button>
      <button type="button" onClick={onDelete}
        className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors">
        <FiTrash2 size={14} />
      </button>
    </div>
  );
}

function Field({ label, children, span = false }) {
  return (
    <div className={span ? "md:col-span-2" : ""}>
      <label className="block text-xs font-semibold mb-1.5 text-white/60">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-3 py-2 rounded-lg border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors text-sm";

function ImageField({ label, value, onChange, onUpload, uploading }) {
  return (
    <div className="md:col-span-2">
      <label className="block text-xs font-semibold mb-1.5 text-white/60">{label}</label>
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-lg border border-white/10 overflow-hidden flex-shrink-0 bg-white/5 flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <FiImage className="text-white/20" />
          )}
        </div>
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL, or upload a file →"
          className={inputClass + " flex-1"}
        />
        <label className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-marigold/50 rounded-lg px-3 py-2 text-xs cursor-pointer transition-colors whitespace-nowrap">
          {uploading ? (
            <span className="w-3.5 h-3.5 border-2 border-marigold border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiUpload size={14} />
          )}
          Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              e.target.value = "";
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default function AdminContent() {
  const { refresh } = useContent();
  const [form, setForm] = useState({});
  const [heroSlides, setHeroSlides] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [trustBadges, setTrustBadges] = useState([]);
  const [impactStories, setImpactStories] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [partners, setPartners] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState(null); // e.g. "hero-2"

  useEffect(() => {
    api
      .get("/content")
      .then((r) => {
        const data = r.data || {};
        setForm(data);
        setHeroSlides(data.hero_slides?.length ? data.hero_slides : defaultHeroSlides);
        setPrograms(data.programs?.length ? data.programs : defaultPrograms);
        setTrustBadges(data.trust_badges?.length ? data.trust_badges : defaultTrustBadges);
        setImpactStories(data.impact_stories?.length ? data.impact_stories : defaultImpactStories);
        setTeamMembers(data.team_members?.length ? data.team_members : defaultTeamMembers);
        setPartners(data.partners?.length ? data.partners : defaultPartners);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const uploadImage = async (file, uploadKey, onDone) => {
    setUploadingKey(uploadKey);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await api.post("/content/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onDone(res.data.url);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Image upload failed");
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        hero_slides: heroSlides,
        programs,
        trust_badges: trustBadges,
        impact_stories: impactStories,
        team_members: teamMembers,
        partners,
      };
      await api.post("/content/bulk", payload);
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
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4 sticky top-0 z-10 bg-obsidian/80 backdrop-blur-md py-3 -mt-3">
        <h1 className="font-display font-bold text-3xl">Site Content Editor</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
        >
          <FiSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* ── Basic text fields ───────────────────────────────── */}
      <SectionCard title="General Content">
        <div className="grid gap-5 md:grid-cols-2">
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
      </SectionCard>

      {/* ── Hero Slides ──────────────────────────────────────── */}
      <SectionCard title="Hero Slideshow" hint="These rotate on the homepage banner.">
        <div className="space-y-5">
          {heroSlides.map((s, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-marigold uppercase tracking-wider">Slide {i + 1}</span>
                <ItemToolbar
                  index={i} length={heroSlides.length}
                  onUp={() => setHeroSlides(moveItem(heroSlides, i, -1))}
                  onDown={() => setHeroSlides(moveItem(heroSlides, i, 1))}
                  onDelete={() => setHeroSlides(heroSlides.filter((_, idx) => idx !== i))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <ImageField
                  label="Background Image"
                  value={s.img}
                  uploading={uploadingKey === `hero-${i}`}
                  onChange={(v) => setHeroSlides(heroSlides.map((x, idx) => idx === i ? { ...x, img: v } : x))}
                  onUpload={(file) => uploadImage(file, `hero-${i}`, (url) =>
                    setHeroSlides(heroSlides.map((x, idx) => idx === i ? { ...x, img: url } : x)))}
                />
                <Field label="Tag">
                  <input className={inputClass} value={s.tag ?? ""}
                    onChange={(e) => setHeroSlides(heroSlides.map((x, idx) => idx === i ? { ...x, tag: e.target.value } : x))} />
                </Field>
                <Field label="Headline (use a new line for a line break)">
                  <textarea rows={2} className={inputClass} value={s.headline ?? ""}
                    onChange={(e) => setHeroSlides(heroSlides.map((x, idx) => idx === i ? { ...x, headline: e.target.value } : x))} />
                </Field>
                <Field label="Subtext" span>
                  <textarea rows={2} className={inputClass} value={s.sub ?? ""}
                    onChange={(e) => setHeroSlides(heroSlides.map((x, idx) => idx === i ? { ...x, sub: e.target.value } : x))} />
                </Field>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setHeroSlides([...heroSlides, { img: "", tag: "", headline: "", sub: "" }])}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-marigold hover:text-terracotta transition-colors">
          <FiPlus /> Add Slide
        </button>
      </SectionCard>

      {/* ── Programs ─────────────────────────────────────────── */}
      <SectionCard title="Core Programs" hint="Shown in the 'What We Do' section.">
        <div className="space-y-5">
          {programs.map((p, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-marigold uppercase tracking-wider">Program {i + 1}</span>
                <ItemToolbar
                  index={i} length={programs.length}
                  onUp={() => setPrograms(moveItem(programs, i, -1))}
                  onDown={() => setPrograms(moveItem(programs, i, 1))}
                  onDelete={() => setPrograms(programs.filter((_, idx) => idx !== i))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title">
                  <input className={inputClass} value={p.title ?? ""}
                    onChange={(e) => setPrograms(programs.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
                </Field>
                <Field label="Icon">
                  <select className={inputClass} value={p.icon ?? "FiBookOpen"}
                    onChange={(e) => setPrograms(programs.map((x, idx) => idx === i ? { ...x, icon: e.target.value } : x))}>
                    {ICON_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </Field>
                <Field label="Description" span>
                  <textarea rows={2} className={inputClass} value={p.desc ?? ""}
                    onChange={(e) => setPrograms(programs.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} />
                </Field>
                <ImageField
                  label="Image"
                  value={p.img}
                  uploading={uploadingKey === `program-${i}`}
                  onChange={(v) => setPrograms(programs.map((x, idx) => idx === i ? { ...x, img: v } : x))}
                  onUpload={(file) => uploadImage(file, `program-${i}`, (url) =>
                    setPrograms(programs.map((x, idx) => idx === i ? { ...x, img: url } : x)))}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setPrograms([...programs, { icon: "FiBookOpen", title: "", desc: "", img: "" }])}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-marigold hover:text-terracotta transition-colors">
          <FiPlus /> Add Program
        </button>
      </SectionCard>

      {/* ── Trust Badges ─────────────────────────────────────── */}
      <SectionCard title="Trust Badges" hint="Small credibility strip below the stats bar.">
        <div className="space-y-5">
          {trustBadges.map((b, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-marigold uppercase tracking-wider">Badge {i + 1}</span>
                <ItemToolbar
                  index={i} length={trustBadges.length}
                  onUp={() => setTrustBadges(moveItem(trustBadges, i, -1))}
                  onDown={() => setTrustBadges(moveItem(trustBadges, i, 1))}
                  onDelete={() => setTrustBadges(trustBadges.filter((_, idx) => idx !== i))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title">
                  <input className={inputClass} value={b.title ?? ""}
                    onChange={(e) => setTrustBadges(trustBadges.map((x, idx) => idx === i ? { ...x, title: e.target.value } : x))} />
                </Field>
                <Field label="Icon">
                  <select className={inputClass} value={b.icon ?? "FiShield"}
                    onChange={(e) => setTrustBadges(trustBadges.map((x, idx) => idx === i ? { ...x, icon: e.target.value } : x))}>
                    {ICON_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </Field>
                <Field label="Description" span>
                  <textarea rows={2} className={inputClass} value={b.desc ?? ""}
                    onChange={(e) => setTrustBadges(trustBadges.map((x, idx) => idx === i ? { ...x, desc: e.target.value } : x))} />
                </Field>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setTrustBadges([...trustBadges, { icon: "FiShield", title: "", desc: "" }])}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-marigold hover:text-terracotta transition-colors">
          <FiPlus /> Add Badge
        </button>
      </SectionCard>

      {/* ── Impact Stories ───────────────────────────────────── */}
      <SectionCard title="Impact Stories">
        <div className="space-y-5">
          {impactStories.map((s, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-marigold uppercase tracking-wider">Story {i + 1}</span>
                <ItemToolbar
                  index={i} length={impactStories.length}
                  onUp={() => setImpactStories(moveItem(impactStories, i, -1))}
                  onDown={() => setImpactStories(moveItem(impactStories, i, 1))}
                  onDelete={() => setImpactStories(impactStories.filter((_, idx) => idx !== i))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name">
                  <input className={inputClass} value={s.name ?? ""}
                    onChange={(e) => setImpactStories(impactStories.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} />
                </Field>
                <Field label="Location">
                  <input className={inputClass} value={s.location ?? ""}
                    onChange={(e) => setImpactStories(impactStories.map((x, idx) => idx === i ? { ...x, location: e.target.value } : x))} />
                </Field>
                <Field label="Tag (e.g. Education, Community)">
                  <input className={inputClass} value={s.tag ?? ""}
                    onChange={(e) => setImpactStories(impactStories.map((x, idx) => idx === i ? { ...x, tag: e.target.value } : x))} />
                </Field>
                <Field label="Story">
                  <textarea rows={2} className={inputClass} value={s.story ?? ""}
                    onChange={(e) => setImpactStories(impactStories.map((x, idx) => idx === i ? { ...x, story: e.target.value } : x))} />
                </Field>
                <ImageField
                  label="Photo"
                  value={s.img}
                  uploading={uploadingKey === `story-${i}`}
                  onChange={(v) => setImpactStories(impactStories.map((x, idx) => idx === i ? { ...x, img: v } : x))}
                  onUpload={(file) => uploadImage(file, `story-${i}`, (url) =>
                    setImpactStories(impactStories.map((x, idx) => idx === i ? { ...x, img: url } : x)))}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setImpactStories([...impactStories, { name: "", location: "", tag: "", story: "", img: "" }])}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-marigold hover:text-terracotta transition-colors">
          <FiPlus /> Add Story
        </button>
      </SectionCard>

      {/* ── Team Members ─────────────────────────────────────── */}
      <SectionCard title="Team Members">
        <div className="space-y-5">
          {teamMembers.map((m, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-marigold uppercase tracking-wider">Member {i + 1}</span>
                <ItemToolbar
                  index={i} length={teamMembers.length}
                  onUp={() => setTeamMembers(moveItem(teamMembers, i, -1))}
                  onDown={() => setTeamMembers(moveItem(teamMembers, i, 1))}
                  onDelete={() => setTeamMembers(teamMembers.filter((_, idx) => idx !== i))}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name">
                  <input className={inputClass} value={m.name ?? ""}
                    onChange={(e) => setTeamMembers(teamMembers.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} />
                </Field>
                <Field label="Role">
                  <input className={inputClass} value={m.role ?? ""}
                    onChange={(e) => setTeamMembers(teamMembers.map((x, idx) => idx === i ? { ...x, role: e.target.value } : x))} />
                </Field>
                <Field label="Quote" span>
                  <textarea rows={2} className={inputClass} value={m.quote ?? ""}
                    onChange={(e) => setTeamMembers(teamMembers.map((x, idx) => idx === i ? { ...x, quote: e.target.value } : x))} />
                </Field>
                <ImageField
                  label="Photo"
                  value={m.img}
                  uploading={uploadingKey === `team-${i}`}
                  onChange={(v) => setTeamMembers(teamMembers.map((x, idx) => idx === i ? { ...x, img: v } : x))}
                  onUpload={(file) => uploadImage(file, `team-${i}`, (url) =>
                    setTeamMembers(teamMembers.map((x, idx) => idx === i ? { ...x, img: url } : x)))}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setTeamMembers([...teamMembers, { name: "", role: "", quote: "", img: "" }])}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-marigold hover:text-terracotta transition-colors">
          <FiPlus /> Add Team Member
        </button>
      </SectionCard>

      {/* ── Partners ──────────────────────────────────────────── */}
      <SectionCard title="Partners" hint="Shown in the scrolling marquee strip.">
        <div className="space-y-3">
          {partners.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={inputClass + " flex-1"}
                value={p ?? ""}
                onChange={(e) => setPartners(partners.map((x, idx) => idx === i ? e.target.value : x))}
              />
              <ItemToolbar
                index={i} length={partners.length}
                onUp={() => setPartners(moveItem(partners, i, -1))}
                onDown={() => setPartners(moveItem(partners, i, 1))}
                onDelete={() => setPartners(partners.filter((_, idx) => idx !== i))}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setPartners([...partners, ""])}
          className="mt-4 flex items-center gap-2 text-sm font-semibold text-marigold hover:text-terracotta transition-colors">
          <FiPlus /> Add Partner
        </button>
      </SectionCard>
    </div>
  );
}