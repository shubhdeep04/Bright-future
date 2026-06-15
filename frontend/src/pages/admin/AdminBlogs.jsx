import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import AdminModal from "../../components/AdminModal";

const emptyForm = {
  title: "",
  content: "",
  excerpt: "",
  image: "",
  category: "Updates",
  tags: "",
  isPublished: true,
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .get("/blogs/admin/all")
      .then((r) => setBlogs(r.data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModal(true);
  };

  const openEdit = (b) => {
    setEditing(b);
    setForm({
      title: b.title,
      content: b.content,
      excerpt: b.excerpt || "",
      image: b.image || "",
      category: b.category,
      tags: b.tags?.join(", ") || "",
      isPublished: b.isPublished,
    });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };
      if (editing) {
        await api.put(`/blogs/${editing._id}`, payload);
        toast.success("Blog updated");
      } else {
        await api.post("/blogs", payload);
        toast.success("Blog created");
      }
      setModal(false);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success("Blog deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display font-bold text-3xl">Blog Posts</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
        >
          <FiPlus /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : blogs.length === 0 ? (
        <p className="text-slate">No blog posts yet.</p>
      ) : (
        <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate border-b border-white/10">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Views</th>
                <th className="p-4">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((b) => (
                <tr key={b._id} className="border-b border-white/10 last:border-0">
                  <td className="p-4 font-medium">{b.title}</td>
                  <td className="p-4">{b.category}</td>
                  <td className="p-4">{b.views}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.isPublished ? "bg-leaf/15 text-leaf" : "bg-white/5 text-ink"}`}>
                      {b.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(b)} className="text-ink hover:text-marigold">
                        <FiEdit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(b._id)} className="text-terracotta hover:text-red-600">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <AdminModal title={editing ? "Edit Post" : "New Post"} onClose={() => setModal(false)} wide>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Excerpt</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Content *</label>
              <textarea
                required
                rows={8}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Image URL</label>
              <input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Tags (comma-separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="w-4 h-4 accent-marigold"
              />
              Published
            </label>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : editing ? "Update Post" : "Create Post"}
            </button>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
