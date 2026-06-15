import { useState, useEffect } from "react";
import PageHero from "../components/PageHero";
import { FiHeart, FiCheckCircle, FiDownload } from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const presetAmounts = [500, 1000, 2500, 5000, 10000];

export default function Donate() {
  const { user } = useAuth();
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", panNumber: "" });
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (user) {
      setForm((f) => ({ ...f, name: user.name, email: user.email }));
    }
    api.get("/campaigns?active=true").then((r) => setCampaigns(r.data)).catch(() => {});
  }, [user]);

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount("");
  };

  const handleCustomAmount = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(val);
    setAmount(Number(val) || 0);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount < 1) {
      toast.error("Please select or enter a valid amount");
      return;
    }
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email");
      return;
    }

    setLoading(true);
    try {
      // Step 1: create donation record (pending)
      const { data: donation } = await api.post("/donations", {
        ...form,
        amount,
        campaign: selectedCampaign || undefined,
        isAnonymous,
        purpose: selectedCampaign
          ? campaigns.find((c) => c._id === selectedCampaign)?.title
          : "General Donation",
      });

      // Step 2: This is where Razorpay checkout would open in production.
      // For now we simulate a successful payment and confirm immediately.
      // -- In production: open Razorpay checkout with order created server-side,
      // -- then call /donations/:id/confirm with the returned payment_id.
      const { data: confirmed } = await api.put(`/donations/${donation._id}/confirm`, {
        paymentId: `pay_demo_${Date.now()}`,
        orderId: `order_demo_${Date.now()}`,
      });

      setSuccess(confirmed);
      toast.success("Thank you! Your donation was successful.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div>
        <PageHero eyebrow="Donation" title="Thank You for Your Generosity!" />
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-leaf/15 text-leaf flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={36} />
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
            Your donation of ₹{success.amount.toLocaleString()} was successful!
          </h2>
          <p className="text-slate mb-6">
            A confirmation email has been sent to <strong>{success.email}</strong>. Your receipt
            number is <strong>{success.receiptNumber}</strong>.
          </p>
          <div className="bg-chalk border border-white/10 rounded-card p-6 text-left max-w-md mx-auto mb-6">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-slate">Receipt No.</span>
              <span className="font-semibold">{success.receiptNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-slate">Amount</span>
              <span className="font-semibold">₹{success.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-slate">Purpose</span>
              <span className="font-semibold">{success.purpose}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate">Status</span>
              <span className="font-semibold text-leaf capitalize">{success.status}</span>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
          >
            <FiDownload /> Download Receipt
          </button>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        eyebrow="Make a Difference"
        title="Donate to Bright Futures"
        subtitle="100% of your donation goes towards educational resources, scholarships, and program support for children in need."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 space-y-6 shadow-sm">
          <div>
            <label className="block text-sm font-semibold mb-3">Select Donation Amount (₹)</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {presetAmounts.map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleAmountSelect(val)}
                  className={`py-3 rounded-xl font-semibold text-sm border-2 transition-colors ${
                    amount === val && !customAmount
                      ? "bg-marigold border-marigold text-white"
                      : "border-white/10 hover:border-marigold text-ink"
                  }`}
                >
                  ₹{val.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={handleCustomAmount}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
          </div>

          {campaigns.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-2">Donate Towards (optional)</label>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-paper"
              >
                <option value="">General Donation</option>
                {campaigns.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name *</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">PAN Number (for 80G receipt)</label>
              <input
                name="panNumber"
                value={form.panNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-slate">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="w-4 h-4 accent-marigold"
            />
            Make this donation anonymous
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
          >
            <FiHeart /> {loading ? "Processing..." : `Donate ₹${amount.toLocaleString() || 0}`}
          </button>
          <p className="text-xs text-slate text-center">
            Payments are securely processed via Razorpay. All donations are eligible for 80G tax exemption.
          </p>
        </form>
      </section>
    </div>
  );
}
