import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiTrash2, FiMail, FiPhone, FiBriefcase, FiClock } from "react-icons/fi";

const statusOptions = ["Pending", "Contacted", "In Discussion", "Partnered", "Declined"];

const statusColors = {
  Pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  Contacted: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "In Discussion": "bg-purple-500/15 text-purple-400 border-purple-500/30",
  Partnered: "bg-green-500/15 text-green-400 border-green-500/30",
  Declined: "bg-red-500/15 text-red-400 border-red-500/30",
};

export default function AdminCollaborations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadData = () => {
    setLoading(true);
    api
      .get("/collaborations", { params: filter ? { status: filter } : {} })
      .then((r) => setItems(r.data))
      .catch((err) => toast.error(err?.response?.data?.message || "Failed to load"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleStatusChange = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await api.put(`/collaborations/${id}`, { status });
      setItems((prev) => prev.map((it) => (it._id === id ? res.data : it)));
      toast.success("Status updated");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this collaboration inquiry? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await api.delete(`/collaborations/${id}`);
      setItems((prev) => prev.filter((it) => it._id !== id));
      toast.success("Inquiry deleted");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    } finally {
      setDeletingId(null);
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
        <h1 className="font-display font-bold text-3xl">Collaboration Inquiries</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-full border-2 border-white/10 bg-transparent text-sm focus:border-marigold outline-none transition-colors"
        >
          <option value="" style={{ background: "#0d1120" }}>All Statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s} style={{ background: "#0d1120" }}>{s}</option>
          ))}
        </select>
      </div>

      {items.length === 0 ? (
        <div className="bg-chalk border border-white/10 rounded-card p-10 text-center text-white/40">
          No collaboration inquiries {filter ? `with status "${filter}"` : "yet"}.
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="bg-chalk border border-white/10 rounded-card p-6">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg">{item.organizationName}</h3>
                  <p className="text-sm text-white/50">{item.contactPerson}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={item.status}
                    disabled={updatingId === item._id}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${statusColors[item.status] || ""}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s} style={{ background: "#0d1120", color: "#e8e0d0" }}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingId === item._id}
                    className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs text-white/50 mb-4">
                <span className="flex items-center gap-1.5"><FiMail size={12} /> {item.email}</span>
                {item.phone && <span className="flex items-center gap-1.5"><FiPhone size={12} /> {item.phone}</span>}
                <span className="flex items-center gap-1.5"><FiBriefcase size={12} /> {item.collaborationType}</span>
                <span className="flex items-center gap-1.5">
                  <FiClock size={12} /> {new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>

              <p className="text-sm text-white/70 leading-relaxed border-t border-white/5 pt-4">{item.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}