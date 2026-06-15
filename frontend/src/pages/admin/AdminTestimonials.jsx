import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiTrash2, FiCheck, FiX } from "react-icons/fi";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    api
      .get("/testimonials?all=true")
      .then((r) => setTestimonials(r.data))
      .catch(() => setTestimonials([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const toggleApproval = async (t) => {
    try {
      await api.put(`/testimonials/${t._id}`, { isApproved: !t.isApproved });
      toast.success(t.isApproved ? "Testimonial hidden" : "Testimonial approved");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      toast.success("Testimonial removed");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  const filtered =
    filter === "all"
      ? testimonials
      : filter === "approved"
      ? testimonials.filter((t) => t.isApproved)
      : testimonials.filter((t) => !t.isApproved);

  return (
    <div>
      <h1 className="font-display font-bold text-3xl mb-6">Testimonials</h1>

      <div className="flex flex-wrap gap-3 mb-6">
        {["all", "approved", "pending"].map((f) => (
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
        <p className="text-slate">No testimonials found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div key={t._id} className="bg-chalk border border-white/10 rounded-card p-5 hover-lift">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-display font-bold text-lg">{t.name}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-semibold shrink-0 ${
                    t.isApproved ? "bg-leaf/15 text-leaf" : "bg-marigold/15 text-marigold"
                  }`}
                >
                  {t.isApproved ? "Approved" : "Pending"}
                </span>
              </div>
              <p className="text-xs text-slate capitalize mb-2">{t.role} • Rating: {t.rating}/5</p>
              <p className="text-sm text-slate leading-relaxed mb-4 italic">"{t.message}"</p>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleApproval(t)}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition-colors ${
                    t.isApproved ? "bg-terracotta/15 text-terracotta hover:bg-terracotta hover:text-white" : "bg-leaf/15 text-leaf hover:bg-leaf hover:text-white"
                  }`}
                >
                  {t.isApproved ? <FiX size={14} /> : <FiCheck size={14} />}
                  {t.isApproved ? "Unapprove" : "Approve"}
                </button>
                <button onClick={() => handleDelete(t._id)} className="px-3 border-2 border-white/10 rounded-full text-terracotta hover:border-terracotta transition-colors">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
