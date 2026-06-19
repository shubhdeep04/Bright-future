import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiTrash2, FiPlus, FiAward } from "react-icons/fi";
import AdminModal from "../../components/AdminModal";

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null); // volunteer object for activity assignment
  const [activityForm, setActivityForm] = useState({ title: "", date: "", description: "" });

  const load = () => {
    setLoading(true);
    api
      .get("/volunteers")
      .then((r) => setVolunteers(r.data))
      .catch(() => setVolunteers([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/volunteers/${id}`, { status });
      toast.success(`Volunteer ${status}`);
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update");
    }
  };

  const toggleCertificate = async (v) => {
    try {
      await api.put(`/volunteers/${v._id}`, { certificateIssued: !v.certificateIssued });
      toast.success(v.certificateIssued ? "Certificate revoked" : "Certificate issued");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this volunteer record?")) return;
    try {
      await api.delete(`/volunteers/${id}`);
      toast.success("Volunteer removed");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  const assignActivity = async (e) => {
    e.preventDefault();
    if (!activityForm.title) return toast.error("Title required");
    try {
      const updatedActivities = [...(modal.assignedActivities || []), { ...activityForm, status: "upcoming" }];
      await api.put(`/volunteers/${modal._id}`, { assignedActivities: updatedActivities });
      toast.success("Activity assigned");
      setModal(null);
      setActivityForm({ title: "", date: "", description: "" });
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to assign");
    }
  };

  const filtered = filter === "all" ? volunteers : volunteers.filter((v) => v.status === filter);

  return (
    <div>
      <h1 className="font-display font-bold text-3xl mb-6">Volunteers</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {["all", "pending", "approved", "rejected"].map((f) => (
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
        <p className="text-slate">No volunteers found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v) => (
            <div key={v._id} className="bg-chalk border border-white/10 rounded-card p-5 hover-lift">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-display font-bold text-lg">{v.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold capitalize shrink-0 ${
                    v.status === "approved"
                      ? "bg-leaf/15 text-leaf"
                      : v.status === "pending"
                      ? "bg-marigold/15 text-marigold"
                      : "bg-terracotta/15 text-terracotta"
                  }`}
                >
                  {v.status}
                </span>
              </div>
              <p className="text-sm text-slate mb-1">{v.email}</p>
              <p className="text-sm text-slate mb-2">{v.phone}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {v.skills?.map((s, i) => (
                  <span key={i} className="text-xs bg-ink/5 px-2 py-1 rounded-full text-ink">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate mb-3">
                Availability: {v.availability} | Interest: {v.interestArea || "N/A"}
              </p>

              <div className="flex flex-wrap gap-2">
                {v.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(v._id, "approved")} className="flex-1 bg-leaf/15 text-leaf font-semibold py-2 rounded-full text-sm hover:bg-leaf hover:text-white transition-colors">
                      Approve
                    </button>
                    <button onClick={() => updateStatus(v._id, "rejected")} className="flex-1 bg-terracotta/15 text-terracotta font-semibold py-2 rounded-full text-sm hover:bg-terracotta hover:text-white transition-colors">
                      Reject
                    </button>
                  </>
                )}
                {v.status === "approved" && (
                  <>
                    <button
                      onClick={() => setModal(v)}
                      className="flex-1 flex items-center justify-center gap-1 border-2 border-white/10 rounded-full py-2 text-sm font-semibold hover:border-marigold transition-colors"
                    >
                      <FiPlus size={14} /> Assign Activity
                    </button>
                    <button
                      onClick={() => toggleCertificate(v)}
                      className={`flex items-center justify-center gap-1 px-3 rounded-full text-sm font-semibold border-2 transition-colors ${
                        v.certificateIssued ? "bg-marigold/15 border-marigold text-marigold" : "border-white/10 hover:border-marigold"
                      }`}
                      title="Toggle certificate"
                    >
                      <FiAward size={14} />
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(v._id)} className="px-3 border-2 border-white/10 rounded-full text-terracotta hover:border-terracotta transition-colors">
                  <FiTrash2 size={14} />
                </button>
              </div>

              {v.assignedActivities?.length > 0 && (
                <p className="text-xs text-slate mt-3">{v.assignedActivities.length} activity(ies) assigned</p>
              )}
            </div>
          ))}
        </div>
      )}

      {modal && (
        <AdminModal title={`Assign Activity to ${modal.name}`} onClose={() => setModal(null)}>
          <form onSubmit={assignActivity} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Activity Title *</label>
              <input
                required
                value={activityForm.title}
                onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Date</label>
              <input
                type="date"
                value={activityForm.date}
                onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Description</label>
              <textarea
                rows={3}
                value={activityForm.description}
                onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors">
              Assign Activity
            </button>
          </form>
        </AdminModal>
      )}
    </div>
  );
}
