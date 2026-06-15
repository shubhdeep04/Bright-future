import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import AdminModal from "../../components/AdminModal";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  targetAmount: "",
  raisedAmount: "",
  category: "Education",
  endDate: "",
  isActive: true,
};

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .get("/campaigns")
      .then((r) => setCampaigns(r.data))
      .catch(() => setCampaigns([]))
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

  const openEdit = (c) => {
    setEditing(c);
    setForm({
      title: c.title,
      description: c.description,
      image: c.image || "",
      targetAmount: c.targetAmount,
      raisedAmount: c.raisedAmount,
      category: c.category,
      endDate: c.endDate ? c.endDate.slice(0, 10) : "",
      isActive: c.isActive,
    });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        targetAmount: Number(form.targetAmount),
        raisedAmount: Number(form.raisedAmount) || 0,
      };
      if (editing) {
        await api.put(`/campaigns/${editing._id}`, payload);
        toast.success("Campaign updated");
      } else {
        await api.post("/campaigns", payload);
        toast.success("Campaign created");
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
    if (!window.confirm("Delete this campaign?")) return;
    try {
      await api.delete(`/campaigns/${id}`);
      toast.success("Campaign deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display font-bold text-3xl">Campaigns</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
        >
          <FiPlus /> New Campaign
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : campaigns.length === 0 ? (
        <p className="text-slate">No campaigns yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => {
            const pct = Math.min(100, Math.round((c.raisedAmount / c.targetAmount) * 100));
            return (
              <div key={c._id} className="bg-chalk border border-white/10 rounded-card p-5 hover-lift">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-lg">{c.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold shrink-0 ${c.isActive ? "bg-leaf/15 text-leaf" : "bg-white/5 text-ink"}`}>
                    {c.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-sm text-slate line-clamp-2 mb-3">{c.description}</p>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-marigold">₹{c.raisedAmount.toLocaleString()}</span>
                  <span className="text-slate">of ₹{c.targetAmount.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden mb-4">
                  <div className="h-full bg-gradient-to-r from-marigold to-terracotta rounded-full" style={{ width: `${pct}%` }}></div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(c)} className="flex-1 flex items-center justify-center gap-2 border-2 border-white/10 rounded-full py-2 text-sm font-semibold hover:border-marigold transition-colors">
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="px-3 border-2 border-white/10 rounded-full text-terracotta hover:border-terracotta transition-colors">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modal && (
        <AdminModal title={editing ? "Edit Campaign" : "New Campaign"} onClose={() => setModal(false)} wide>
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
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
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
                <label className="block text-sm font-semibold mb-2">Target Amount (₹) *</label>
                <input
                  type="number"
                  required
                  value={form.targetAmount}
                  onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Raised Amount (₹)</label>
                <input
                  type="number"
                  value={form.raisedAmount}
                  onChange={(e) => setForm({ ...form, raisedAmount: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Category</label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 accent-marigold"
              />
              Active Campaign
            </label>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : editing ? "Update Campaign" : "Create Campaign"}
            </button>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
