import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { FiDownload, FiHeart, FiFileText } from "react-icons/fi";

export default function DonorDashboard() {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/donations/my")
      .then((r) => setDonations(r.data))
      .catch(() => setDonations([]))
      .finally(() => setLoading(false));
  }, []);

  const totalDonated = donations
    .filter((d) => d.status === "success")
    .reduce((sum, d) => sum + d.amount, 0);

  const printReceipt = (donation) => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head><title>Receipt ${donation.receiptNumber}</title>
        <style>
          body { font-family: sans-serif; padding: 40px; color: #1E3A5F; }
          h1 { color: #F4A636; }
          .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
          .total { font-weight: bold; font-size: 1.2em; margin-top: 20px; }
        </style>
        </head>
        <body>
          <h1>Bright Futures Foundation</h1>
          <p>Donation Receipt / 80G Certificate</p>
          <hr/>
          <div class="row"><span>Receipt No.</span><span>${donation.receiptNumber}</span></div>
          <div class="row"><span>Date</span><span>${new Date(donation.createdAt).toLocaleDateString("en-IN")}</span></div>
          <div class="row"><span>Donor Name</span><span>${donation.name}</span></div>
          <div class="row"><span>Email</span><span>${donation.email}</span></div>
          <div class="row"><span>PAN</span><span>${donation.panNumber || "N/A"}</span></div>
          <div class="row"><span>Purpose</span><span>${donation.purpose}</span></div>
          <div class="row total"><span>Amount</span><span>₹${donation.amount.toLocaleString()}</span></div>
          <p style="margin-top:30px; font-size: 0.85em; color: #5C6B7A;">
            This donation is eligible for tax exemption under section 80G of the Income Tax Act.
            Reg No: MP/EDU/2014/00123
          </p>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl">Welcome, {user?.name}</h1>
        <p className="text-slate mt-1">Here's a summary of your contributions to Bright Futures.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift">
          <div className="w-12 h-12 rounded-full bg-marigold/15 text-marigold flex items-center justify-center mb-3">
            <FiHeart size={20} />
          </div>
          <p className="text-3xl font-display font-bold">₹{totalDonated.toLocaleString()}</p>
          <p className="text-sm text-slate mt-1">Total Donated</p>
        </div>
        <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift">
          <div className="w-12 h-12 rounded-full bg-leaf/15 text-leaf flex items-center justify-center mb-3">
            <FiFileText size={20} />
          </div>
          <p className="text-3xl font-display font-bold">{donations.length}</p>
          <p className="text-sm text-slate mt-1">Total Transactions</p>
        </div>
        <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift">
          <div className="w-12 h-12 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center mb-3">
            <FiDownload size={20} />
          </div>
          <p className="text-3xl font-display font-bold">
            {donations.filter((d) => d.status === "success").length}
          </p>
          <p className="text-sm text-slate mt-1">Receipts Available</p>
        </div>
      </div>

      <div className="bg-chalk border border-white/10 rounded-card overflow-hidden">
        <h2 className="font-display font-bold text-xl p-6 pb-0">Donation History</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : donations.length === 0 ? (
          <p className="text-slate p-6">No donations yet. Your generosity will appear here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate border-b border-white/10">
                  <th className="p-4">Receipt No.</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Purpose</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d._id} className="border-b border-white/10 last:border-0">
                    <td className="p-4 font-mono text-xs">{d.receiptNumber}</td>
                    <td className="p-4">{new Date(d.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="p-4">{d.purpose}</td>
                    <td className="p-4 font-semibold">₹{d.amount.toLocaleString()}</td>
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
                      {d.status === "success" && (
                        <button
                          onClick={() => printReceipt(d)}
                          className="text-ink hover:text-terracotta font-semibold flex items-center gap-1"
                        >
                          <FiDownload size={14} /> PDF
                        </button>
                      )}
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
