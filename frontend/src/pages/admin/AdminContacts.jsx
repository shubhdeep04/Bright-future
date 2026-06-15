import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiTrash2, FiMail } from "react-icons/fi";
import AdminModal from "../../components/AdminModal";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState(null);

  const load = () => {
    setLoading(true);
    api
      .get("/contact")
      .then((r) => setContacts(r.data))
      .catch(() => setContacts([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/contact/${id}`, { status });
      toast.success("Status updated");
      load();
      if (view?._id === id) setView({ ...view, status });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await api.delete(`/contact/${id}`);
      toast.success("Message removed");
      setView(null);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  const openView = (c) => {
    setView(c);
    if (c.status === "new") updateStatus(c._id, "read");
  };

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);

  return (
    <div>
      <h1 className="font-display font-bold text-3xl mb-6">Contact Queries</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {["all", "new", "read", "resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border-2 transition-colors ${
              filter === f ? "bg-marigold border-marigold text-white" : "border-white/10 text-slate hover:border-marigold"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-slate">No messages found.</p>
      ) : (
        <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate border-b border-white/10">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Subject</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c._id} className="border-b border-white/10 last:border-0">
                  <td className="p-4 font-medium">{c.name}</td>
                  <td className="p-4">{c.email}</td>
                  <td className="p-4">{c.subject || "-"}</td>
                  <td className="p-4">{new Date(c.createdAt).toLocaleDateString("en-IN")}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        c.status === "new"
                          ? "bg-marigold/15 text-marigold"
                          : c.status === "read"
                          ? "bg-white/5 text-ink"
                          : "bg-leaf/15 text-leaf"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => openView(c)} className="text-ink hover:text-marigold">
                        <FiMail size={16} />
                      </button>
                      <button onClick={() => handleDelete(c._id)} className="text-terracotta hover:text-red-600">
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

      {view && (
        <AdminModal title={view.subject || "Message"} onClose={() => setView(null)}>
          <div className="space-y-3">
            <p><span className="font-semibold">From:</span> {view.name} ({view.email})</p>
            {view.phone && <p><span className="font-semibold">Phone:</span> {view.phone}</p>}
            <p><span className="font-semibold">Date:</span> {new Date(view.createdAt).toLocaleString("en-IN")}</p>
            <div className="bg-white/[0.03] rounded-xl p-4 text-sm text-slate leading-relaxed whitespace-pre-wrap">
              {view.message}
            </div>
            <div className="flex gap-2 pt-2">
              {["new", "read", "resolved"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(view._id, s)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize border-2 transition-colors ${
                    view.status === s ? "bg-marigold border-marigold text-white" : "border-white/10 text-slate hover:border-marigold"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
