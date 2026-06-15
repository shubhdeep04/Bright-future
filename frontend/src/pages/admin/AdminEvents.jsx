import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";
import AdminModal from "../../components/AdminModal";

const emptyForm = {
  title: "",
  description: "",
  image: "",
  date: "",
  location: "",
  category: "General",
  maxParticipants: "",
};

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [viewRegs, setViewRegs] = useState(null);

  const load = () => {
    setLoading(true);
    api
      .get("/events")
      .then((r) => setEvents(r.data))
      .catch(() => setEvents([]))
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

  const openEdit = (e) => {
    setEditing(e);
    setForm({
      title: e.title,
      description: e.description,
      image: e.image || "",
      date: e.date.slice(0, 10),
      location: e.location,
      category: e.category,
      maxParticipants: e.maxParticipants || "",
    });
    setModal(true);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, maxParticipants: Number(form.maxParticipants) || 0 };
      if (editing) {
        await api.put(`/events/${editing._id}`, payload);
        toast.success("Event updated");
      } else {
        await api.post("/events", payload);
        toast.success("Event created");
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
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      toast.success("Event deleted");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display font-bold text-3xl">Events</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
        >
          <FiPlus /> New Event
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : events.length === 0 ? (
        <p className="text-slate">No events yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((e) => (
            <div key={e._id} className="bg-chalk border border-white/10 rounded-card p-5 hover-lift">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-display font-bold text-lg">{e.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-semibold shrink-0 ${new Date(e.date) >= new Date() ? "bg-leaf/15 text-leaf" : "bg-white/5 text-ink"}`}>
                  {new Date(e.date) >= new Date() ? "Upcoming" : "Past"}
                </span>
              </div>
              <p className="text-sm text-slate mb-2">
                {new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} • {e.location}
              </p>
              <p className="text-sm text-slate line-clamp-2 mb-3">{e.description}</p>
              <button onClick={() => setViewRegs(e)} className="text-sm font-semibold text-ink hover:text-terracotta flex items-center gap-1 mb-3">
                <FiUsers size={14} /> {e.registrations?.length || 0} registration(s)
              </button>
              <div className="flex gap-2">
                <button onClick={() => openEdit(e)} className="flex-1 flex items-center justify-center gap-2 border-2 border-white/10 rounded-full py-2 text-sm font-semibold hover:border-marigold transition-colors">
                  <FiEdit2 size={14} /> Edit
                </button>
                <button onClick={() => handleDelete(e._id)} className="px-3 border-2 border-white/10 rounded-full text-terracotta hover:border-terracotta transition-colors">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <AdminModal title={editing ? "Edit Event" : "New Event"} onClose={() => setModal(false)} wide>
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
                <label className="block text-sm font-semibold mb-2">Date *</label>
                <input
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Location *</label>
                <input
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
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
                <label className="block text-sm font-semibold mb-2">Max Participants (0 = unlimited)</label>
                <input
                  type="number"
                  value={form.maxParticipants}
                  onChange={(e) => setForm({ ...form, maxParticipants: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : editing ? "Update Event" : "Create Event"}
            </button>
          </form>
        </AdminModal>
      )}

      {viewRegs && (
        <AdminModal title={`Registrations - ${viewRegs.title}`} onClose={() => setViewRegs(null)} wide>
          {viewRegs.registrations?.length === 0 ? (
            <p className="text-slate">No registrations yet.</p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate border-b border-white/10">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {viewRegs.registrations.map((r, i) => (
                    <tr key={i} className="border-b border-white/10 last:border-0">
                      <td className="p-2">{r.name}</td>
                      <td className="p-2">{r.email}</td>
                      <td className="p-2">{r.phone || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminModal>
      )}
    </div>
  );
}
