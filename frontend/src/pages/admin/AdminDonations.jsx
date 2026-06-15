import { useState, useEffect } from "react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import { FiTrash2, FiDownload } from "react-icons/fi";

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const load = () => {
    setLoading(true);
    api
      .get("/donations")
      .then((r) => setDonations(r.data))
      .catch(() => setDonations([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this donation record?")) return;
    try {
      await api.delete(`/donations/${id}`);
      toast.success("Donation removed");
      load();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete");
    }
  };

  const exportCSV = () => {
    const headers = ["Receipt", "Date", "Name", "Email", "Amount", "Purpose", "Status"];
    const rows = filtered.map((d) => [
      d.receiptNumber,
      new Date(d.createdAt).toLocaleDateString("en-IN"),
      d.name,
      d.email,
      d.amount,
      d.purpose,
      d.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "donations.csv";
    a.click();
  };

  const filtered = filter === "all" ? donations : donations.filter((d) => d.status === filter);
  const total = filtered.filter((d) => d.status === "success").reduce((s, d) => s + d.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display font-bold text-3xl">Donations</h1>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
        >
          <FiDownload /> Export CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {["all", "success", "pending", "failed"].map((f) => (
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
        <div className="ml-auto bg-leaf/15 text-leaf font-semibold px-4 py-2 rounded-full text-sm">
          Total (Success): ₹{total.toLocaleString()}
        </div>
      </div>

      <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-slate p-6">No donations found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate border-b border-white/10">
                  <th className="p-4">Receipt</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Donor</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Status</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d._id} className="border-b border-white/10 last:border-0">
                    <td className="p-4 font-mono text-xs">{d.receiptNumber}</td>
                    <td className="p-4">{new Date(d.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="p-4">{d.isAnonymous ? "Anonymous" : d.name}</td>
                    <td className="p-4">{d.email}</td>
                    <td className="p-4 font-semibold">₹{d.amount.toLocaleString()}</td>
                    <td className="p-4">{d.purpose}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                          d.status === "success"
                            ? "bg-leaf/15 text-leaf"
                            : d.status === "pending"
                            ? "bg-marigold/15 text-marigold"
                            : "bg-terracotta/15 text-terracotta"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(d._id)} className="text-terracotta hover:text-red-600">
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
