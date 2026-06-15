import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import AdminModal from "../../components/AdminModal";

const emptyForm = { title: "", description: "", mediaType: "image", url: "", category: "General" };
const categories = ["General", "Education", "Healthcare", "Events", "Women Empowerment", "Environment"];

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .get("/gallery")
      .then((r) => setItems(r.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/gallery", form);
      toast.success("Media added");
      setModal(false);
      setForm(emptyForm);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to add");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      toast.success("Item removed");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display font-bold text-3xl">Gallery</h1>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
        >
          <FiPlus /> Add Media
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : items.length === 0 ? (
        <p className="text-slate">No media yet. Add photos or videos.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="relative aspect-square rounded-card overflow-hidden border border-white/10 group">
              {item.mediaType === "video" ? (
                <video src={item.url} className="w-full h-full object-cover" />
              ) : (
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/80 to-transparent p-3 flex items-end justify-between">
                <div>
                  <p className="text-paper text-xs font-semibold truncate max-w-[100px]">{item.title}</p>
                  <p className="text-paper/60 text-xs">{item.category}</p>
                </div>
                <button onClick={() => handleDelete(item._id)} className="text-paper hover:text-terracotta">
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <AdminModal title="Add Media" onClose={() => setModal(false)}>
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
              <label className="block text-sm font-semibold mb-2">Media Type</label>
              <select
                value={form.mediaType}
                onChange={(e) => setForm({ ...form, mediaType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-paper"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">URL *</label>
              <input
                required
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-paper"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Add to Gallery"}
            </button>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
