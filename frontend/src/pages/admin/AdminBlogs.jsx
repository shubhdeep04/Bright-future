// import { useState, useEffect } from "react";
// import api from "../../utils/api";
// import toast from "react-hot-toast";
// import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
// import AdminModal from "../../components/AdminModal";

// const emptyForm = {
//   title: "",
//   content: "",
//   excerpt: "",
//   image: "",
//   category: "Updates",
//   tags: "",
//   isPublished: true,
// };

// export default function AdminBlogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modal, setModal] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);

//   const load = () => {
//     setLoading(true);
//     api
//       .get("/blogs/admin/all")
//       .then((r) => setBlogs(r.data))
//       .catch(() => setBlogs([]))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const openCreate = () => {
//     setEditing(null);
//     setForm(emptyForm);
//     setModal(true);
//   };

//   const openEdit = (b) => {
//     setEditing(b);
//     setForm({
//       title: b.title,
//       content: b.content,
//       excerpt: b.excerpt || "",
//       image: b.image || "",
//       category: b.category,
//       tags: b.tags?.join(", ") || "",
//       isPublished: b.isPublished,
//     });
//     setModal(true);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const payload = {
//         ...form,
//         tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
//       };
//       if (editing) {
//         await api.put(`/blogs/${editing._id}`, payload);
//         toast.success("Blog updated");
//       } else {
//         await api.post("/blogs", payload);
//         toast.success("Blog created");
//       }
//       setModal(false);
//       load();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this blog post?")) return;
//     try {
//       await api.delete(`/blogs/${id}`);
//       toast.success("Blog deleted");
//       load();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to delete");
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
//         <h1 className="font-display font-bold text-3xl">Blog Posts</h1>
//         <button
//           onClick={openCreate}
//           className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
//         >
//           <FiPlus /> New Post
//         </button>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
//         </div>
//       ) : blogs.length === 0 ? (
//         <p className="text-slate">No blog posts yet.</p>
//       ) : (
//         <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-slate border-b border-white/10">
//                 <th className="p-4">Title</th>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">Views</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {blogs.map((b) => (
//                 <tr key={b._id} className="border-b border-white/10 last:border-0">
//                   <td className="p-4 font-medium">{b.title}</td>
//                   <td className="p-4">{b.category}</td>
//                   <td className="p-4">{b.views}</td>
//                   <td className="p-4">
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.isPublished ? "bg-leaf/15 text-leaf" : "bg-white/5 text-ink"}`}>
//                       {b.isPublished ? "Published" : "Draft"}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       <button onClick={() => openEdit(b)} className="text-ink hover:text-marigold">
//                         <FiEdit2 size={16} />
//                       </button>
//                       <button onClick={() => handleDelete(b._id)} className="text-terracotta hover:text-red-600">
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

//       {modal && (
//         <AdminModal title={editing ? "Edit Post" : "New Post"} onClose={() => setModal(false)} wide>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-semibold mb-2">Title *</label>
//               <input
//                 required
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-2">Excerpt</label>
//               <textarea
//                 rows={2}
//                 value={form.excerpt}
//                 onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
//                 className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-2">Content *</label>
//               <textarea
//                 required
//                 rows={8}
//                 value={form.content}
//                 onChange={(e) => setForm({ ...form, content: e.target.value })}
//                 className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold mb-2">Image URL</label>
//               <input
//                 value={form.image}
//                 onChange={(e) => setForm({ ...form, image: e.target.value })}
//                 placeholder="https://..."
//                 className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//               />
//             </div>
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Category</label>
//                 <input
//                   value={form.category}
//                   onChange={(e) => setForm({ ...form, category: e.target.value })}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Tags (comma-separated)</label>
//                 <input
//                   value={form.tags}
//                   onChange={(e) => setForm({ ...form, tags: e.target.value })}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//                 />
//               </div>
//             </div>
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 checked={form.isPublished}
//                 onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
//                 className="w-4 h-4 accent-marigold"
//               />
//               Published
//             </label>
//             <button
//               type="submit"
//               disabled={saving}
//               className="w-full bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
//             >
//               {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
//             </button>
//           </form>
//         </AdminModal>
//       )}
//     </div>
//   );
// }









import { useState, useEffect, useRef } from "react";
import {
  FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff,
  FiSave, FiX, FiUpload, FiSearch, FiStar, FiTag,
  FiUser, FiImage, FiAlertCircle, FiCheckCircle,
  FiRefreshCw, FiFileText, FiChevronDown
} from "react-icons/fi";
import api from "../../utils/api";
import toast from "react-hot-toast";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop";

const EMPTY_FORM = {
  title: "", slug: "", excerpt: "", content: "",
  category: "", author: "", authorAvatar: "",
  image: "", status: "draft", featured: false,
};

/* ── Slug generator ── */
function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

/* ── Read time ── */
function readTime(content = "") {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ── Status badge ── */
function StatusBadge({ status }) {
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
      status === "published"
        ? "bg-emerald-400/15 text-emerald-400"
        : "bg-yellow-400/15 text-yellow-400"
    }`}>
      {status === "published" ? "● Published" : "○ Draft"}
    </span>
  );
}

/* ══════════════════════════════════════════ */
export default function AdminBlog() {
  const [blogs, setBlogs]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCat, setFilterCat]       = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState(null); // null = new post
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [categories, setCategories]     = useState([]);
  const [newCat, setNewCat]     = useState("");
  const fileRef = useRef(null);
  const avatarRef = useRef(null);

  /* ── Fetch ── */
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/blogs?admin=true");
      setBlogs(data);
      const cats = [...new Set(data.map(b => b.category).filter(Boolean))];
      setCategories(cats);
    } catch {
      toast.error("Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBlogs(); }, []);

  /* ── Form helpers ── */
  const openNew = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openEdit = (blog) => {
    setEditing(blog._id);
    setForm({
      title:        blog.title        || "",
      slug:         blog.slug         || "",
      excerpt:      blog.excerpt      || "",
      content:      blog.content      || "",
      category:     blog.category     || "",
      author:       blog.author       || "",
      authorAvatar: blog.authorAvatar || "",
      image:        blog.image        || "",
      status:       blog.status       || "draft",
      featured:     blog.featured     || false,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => { setShowForm(false); setEditing(null); setForm(EMPTY_FORM); };

  const handleChange = (key, value) => {
    setForm(f => {
      const updated = { ...f, [key]: value };
      // Auto-generate slug from title (only for new posts)
      if (key === "title" && !editing) updated.slug = toSlug(value);
      return updated;
    });
  };

  /* ── Image upload (featured) ── */
  const handleImageUpload = async (e, field = "image") => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Max 5MB allowed"); return; }
    setImgUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      handleChange(field, data.url || data.imageUrl || data.path || "");
      toast.success("Image uploaded!");
    } catch {
      // Fallback: local object URL for preview
      handleChange(field, URL.createObjectURL(file));
      toast("Image preview set (will save on server upload)", { icon: "ℹ️" });
    } finally {
      setImgUploading(false);
    }
  };

  /* ── Save (create / update) ── */
  const handleSave = async () => {
    if (!form.title.trim()) { toast.error("Title is required"); return; }
    if (!form.content.trim()) { toast.error("Content is required"); return; }
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/blogs/${editing}`, form);
        toast.success("Blog post updated!");
      } else {
        await api.post("/blogs", form);
        toast.success("Blog post created!");
      }
      await fetchBlogs();
      closeForm();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  /* ── Toggle publish ── */
  const toggleStatus = async (blog) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    try {
      await api.put(`/blogs/${blog._id}`, { ...blog, status: newStatus });
      setBlogs(bs => bs.map(b => b._id === blog._id ? { ...b, status: newStatus } : b));
      toast.success(newStatus === "published" ? "Post published!" : "Post moved to draft.");
    } catch {
      toast.error("Status update failed.");
    }
  };

  /* ── Toggle featured ── */
  const toggleFeatured = async (blog) => {
    try {
      await api.put(`/blogs/${blog._id}`, { ...blog, featured: !blog.featured });
      setBlogs(bs => bs.map(b => b._id === blog._id ? { ...b, featured: !b.featured } : b));
      toast.success(blog.featured ? "Removed from featured." : "Set as featured post!");
    } catch {
      toast.error("Failed to update featured status.");
    }
  };

  /* ── Delete ── */
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.delete(`/blogs/${deleteId}`);
      setBlogs(bs => bs.filter(b => b._id !== deleteId));
      toast.success("Post deleted.");
    } catch {
      toast.error("Delete failed.");
    } finally {
      setDeleteId(null);
    }
  };

  /* ── Category management ── */
  const addCategory = () => {
    const cat = newCat.trim();
    if (!cat || categories.includes(cat)) return;
    setCategories(c => [...c, cat]);
    setNewCat("");
    toast.success(`Category "${cat}" added.`);
  };

  const removeCategory = (cat) => {
    setCategories(c => c.filter(x => x !== cat));
    if (form.category === cat) handleChange("category", "");
  };

  /* ── Filtered list ── */
  const filtered = blogs.filter(b => {
    const matchSearch = !search || b.title?.toLowerCase().includes(search.toLowerCase()) || b.author?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || b.status === filterStatus;
    const matchCat    = filterCat === "All" || b.category === filterCat;
    return matchSearch && matchStatus && matchCat;
  });

  const published = blogs.filter(b => b.status === "published").length;
  const drafts    = blogs.filter(b => b.status !== "published").length;

  /* ═══════════════ RENDER ═══════════════ */
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl md:text-3xl text-ink">Blog Manager</h1>
          <p className="text-slate text-sm mt-1">
            {blogs.length} posts &nbsp;·&nbsp;
            <span className="text-emerald-400">{published} published</span> &nbsp;·&nbsp;
            <span className="text-yellow-400">{drafts} drafts</span>
          </p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all text-sm">
          <FiPlus size={16} /> New Post
        </button>
      </div>

      {/* ── Create / Edit Form ── */}
      {showForm && (
        <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
          {/* Form header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-white/[0.015]">
            <h2 className="font-display font-bold text-lg text-ink flex items-center gap-2">
              <FiFileText size={18} className="text-marigold" />
              {editing ? "Edit Post" : "New Blog Post"}
            </h2>
            <button onClick={closeForm} className="text-slate hover:text-ink transition-colors"><FiX size={20} /></button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input value={form.title} onChange={e => handleChange("title", e.target.value)}
                placeholder="Enter blog post title…"
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-ink text-base font-semibold" />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                URL Slug
                <span className="text-xs font-normal text-slate">(auto-generated from title)</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-slate text-sm">/blog/</span>
                <input value={form.slug} onChange={e => handleChange("slug", toSlug(e.target.value))}
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-sm font-mono" />
              </div>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-semibold mb-2">Featured Image</label>
              <div className="flex gap-3 flex-wrap items-start">
                <div className="flex-1 min-w-0">
                  <input value={form.image} onChange={e => handleChange("image", e.target.value)}
                    placeholder="Paste image URL or upload below…"
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-sm" />
                </div>
                <button onClick={() => fileRef.current?.click()}
                  disabled={imgUploading}
                  className="flex items-center gap-2 border border-white/15 px-4 py-2.5 rounded-xl text-sm text-slate hover:border-marigold/50 hover:text-ink transition-colors flex-shrink-0">
                  {imgUploading ? <FiRefreshCw size={14} className="animate-spin" /> : <FiUpload size={14} />}
                  Upload
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "image")} />
              </div>
              {form.image && (
                <div className="mt-3 relative w-full h-40 rounded-xl overflow-hidden border border-white/10">
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover"
                    onError={e => { e.target.src = FALLBACK_IMG; }} />
                  <button onClick={() => handleChange("image", "")}
                    className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-red-500/80 transition-colors">
                    <FiX size={13} />
                  </button>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <select value={form.category} onChange={e => handleChange("category", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-sm">
                  <option value="">Select category…</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold mb-2">Author Name</label>
                <input value={form.author} onChange={e => handleChange("author", e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-sm" />
              </div>

              {/* Author Avatar */}
              <div>
                <label className="block text-sm font-semibold mb-2">Author Avatar URL</label>
                <div className="flex gap-2">
                  <input value={form.authorAvatar} onChange={e => handleChange("authorAvatar", e.target.value)}
                    placeholder="https://… or upload"
                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-sm" />
                  <button onClick={() => avatarRef.current?.click()}
                    className="border border-white/15 px-3 py-2.5 rounded-xl text-slate hover:border-marigold/50 hover:text-ink transition-colors">
                    <FiImage size={14} />
                  </button>
                  <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, "authorAvatar")} />
                </div>
                {form.authorAvatar && (
                  <img src={form.authorAvatar} alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover mt-2 border-2 border-white/10"
                    onError={e => { e.target.style.display = "none"; }} />
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold mb-2">Status</label>
                <select value={form.status} onChange={e => handleChange("status", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-sm">
                  <option value="draft">○ Draft</option>
                  <option value="published">● Published</option>
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex justify-between">
                <span>Excerpt</span>
                <span className="text-xs text-slate font-normal">Short description for listing page</span>
              </label>
              <textarea value={form.excerpt} onChange={e => handleChange("excerpt", e.target.value)}
                rows={2} placeholder="Brief summary of the post (shown in blog list)…"
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-sm resize-none" />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex justify-between">
                <span>Content *</span>
                <span className="text-xs text-slate font-normal">
                  {form.content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length} words
                  &nbsp;·&nbsp; ~{readTime(form.content)} min read
                </span>
              </label>
              <textarea value={form.content} onChange={e => handleChange("content", e.target.value)}
                rows={14} placeholder="Write your blog post content here… (HTML supported)"
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold outline-none transition-colors bg-transparent text-sm resize-y font-mono" />
              <p className="text-xs text-slate mt-1.5">HTML tags are supported (e.g. &lt;b&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;h2&gt;)</p>
            </div>

            {/* Featured toggle */}
            <div className="flex items-center gap-3 p-4 bg-white/[0.025] border border-white/8 rounded-xl">
              <button onClick={() => handleChange("featured", !form.featured)}
                className={`relative w-11 h-6 rounded-full transition-colors ${form.featured ? "bg-marigold" : "bg-white/15"}`}>
                <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${form.featured ? "translate-x-5" : ""}`} />
              </button>
              <div>
                <p className="text-sm font-semibold text-ink flex items-center gap-1.5">
                  <FiStar size={13} className={form.featured ? "text-marigold fill-marigold" : "text-slate"} />
                  Featured Post
                </p>
                <p className="text-xs text-slate">Featured post appears as a large card at the top of the blog page.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/8">
              <button onClick={closeForm} className="px-5 py-2.5 rounded-full border border-white/15 text-slate hover:text-ink text-sm transition-colors">
                Cancel
              </button>
              <button onClick={() => { handleChange("status", "draft"); setTimeout(handleSave, 50); }}
                disabled={saving}
                className="px-5 py-2.5 rounded-full border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 text-sm transition-colors disabled:opacity-50">
                Save as Draft
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-50 text-sm">
                {saving ? <><FiRefreshCw size={14} className="animate-spin" /> Saving…</> : <><FiSave size={14} /> {form.status === "published" ? "Publish" : "Save Post"}</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Category Manager ── */}
      <div className="bg-chalk border border-white/10 rounded-card p-5">
        <h2 className="font-display font-bold text-base text-ink mb-4 flex items-center gap-2">
          <FiTag size={16} className="text-terracotta" /> Category Manager
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.length === 0 && <p className="text-sm text-slate">No categories yet.</p>}
          {categories.map(cat => (
            <span key={cat} className="flex items-center gap-1.5 bg-white/[0.05] border border-white/10 text-ink text-xs px-3 py-1.5 rounded-full">
              {cat}
              <button onClick={() => removeCategory(cat)} className="text-slate hover:text-terracotta transition-colors ml-1">
                <FiX size={11} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2 max-w-xs">
          <input value={newCat} onChange={e => setNewCat(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addCategory()}
            placeholder="Add category…"
            className="flex-1 px-4 py-2 rounded-xl border border-white/10 focus:border-marigold outline-none bg-transparent text-sm" />
          <button onClick={addCategory}
            className="flex items-center gap-1 bg-marigold/15 border border-marigold/30 text-marigold px-4 py-2 rounded-xl text-sm font-semibold hover:bg-marigold/25 transition-colors">
            <FiPlus size={14} /> Add
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 max-w-xs">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" size={14} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search posts…"
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-sm text-ink placeholder:text-slate focus:outline-none focus:border-marigold/50 transition-colors" />
        </div>
        <div className="flex gap-2">
          {["all","published","draft"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${
                filterStatus === s ? "bg-marigold text-white" : "bg-white/[0.04] border border-white/10 text-slate hover:border-marigold/40"
              }`}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", ...categories].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterCat === cat ? "bg-terracotta/20 text-terracotta border border-terracotta/30" : "bg-white/[0.04] border border-white/10 text-slate hover:border-terracotta/30"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Blog list ── */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate">
          {blogs.length === 0 ? "No posts yet. Click New Post to create one." : "No posts match your filters."}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(blog => (
            <div key={blog._id}
              className="bg-chalk border border-white/10 rounded-card p-4 flex items-center gap-4 hover:border-white/20 transition-colors group">

              {/* Thumbnail */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                <img src={blog.image || FALLBACK_IMG} alt={blog.title}
                  className="w-full h-full object-cover" onError={e => { e.target.src = FALLBACK_IMG; }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <StatusBadge status={blog.status} />
                  {blog.featured && (
                    <span className="text-[10px] font-bold text-marigold flex items-center gap-0.5">
                      <FiStar size={9} className="fill-marigold" /> Featured
                    </span>
                  )}
                  {blog.category && (
                    <span className="text-[10px] text-slate border border-white/10 px-2 py-0.5 rounded-full">{blog.category}</span>
                  )}
                </div>
                <h3 className="font-display font-bold text-base text-ink truncate">{blog.title}</h3>
                <p className="text-xs text-slate mt-0.5 flex items-center gap-3">
                  {blog.author && <span className="flex items-center gap-1"><FiUser size={10} />{blog.author}</span>}
                  <span>~{readTime(blog.content)} min read</span>
                  {blog.createdAt && (
                    <span>{new Date(blog.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}</span>
                  )}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                {/* Featured toggle */}
                <button onClick={() => toggleFeatured(blog)} title={blog.featured ? "Remove featured" : "Set as featured"}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    blog.featured ? "bg-marigold/20 text-marigold hover:bg-marigold/30" : "bg-white/5 text-slate hover:text-marigold hover:bg-marigold/10"
                  }`}>
                  <FiStar size={14} className={blog.featured ? "fill-marigold" : ""} />
                </button>

                {/* Publish toggle */}
                <button onClick={() => toggleStatus(blog)} title={blog.status === "published" ? "Move to Draft" : "Publish"}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    blog.status === "published"
                      ? "bg-emerald-400/15 text-emerald-400 hover:bg-red-400/15 hover:text-red-400"
                      : "bg-white/5 text-slate hover:bg-emerald-400/15 hover:text-emerald-400"
                  }`}>
                  {blog.status === "published" ? <FiEye size={14} /> : <FiEyeOff size={14} />}
                </button>

                {/* Edit */}
                <button onClick={() => openEdit(blog)} title="Edit"
                  className="w-8 h-8 rounded-full bg-white/5 text-slate hover:bg-marigold/15 hover:text-marigold flex items-center justify-center transition-colors">
                  <FiEdit2 size={14} />
                </button>

                {/* Delete */}
                <button onClick={() => setDeleteId(blog._id)} title="Delete"
                  className="w-8 h-8 rounded-full bg-white/5 text-slate hover:bg-red-400/15 hover:text-red-400 flex items-center justify-center transition-colors">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Delete confirm modal ── */}
      {deleteId && (
        <div className="fixed inset-0 bg-ink/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-chalk border border-white/15 rounded-card p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-red-400/15 flex items-center justify-center mx-auto mb-4">
              <FiTrash2 size={22} className="text-red-400" />
            </div>
            <h3 className="font-display font-bold text-lg text-center text-ink mb-2">Delete Post?</h3>
            <p className="text-slate text-sm text-center mb-6">This action cannot be undone. The blog post will be permanently deleted.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-full border border-white/15 text-slate hover:text-ink text-sm transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 rounded-full bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}