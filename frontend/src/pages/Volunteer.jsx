import { useState, useEffect } from "react";
import PageHero from "../components/PageHero";
import { FiCheckCircle, FiUserPlus } from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const skillOptions = [
  "Teaching",
  "Mentoring",
  "Healthcare",
  "Counseling",
  "Event Management",
  "Fundraising",
  "Content Writing",
  "Photography/Videography",
  "Social Media",
  "Administration",
  "Legal Aid",
  "IT/Tech Support",
];

const interestAreas = [
  "Education Support",
  "Healthcare Camps",
  "Women Empowerment",
  "Child Welfare",
  "Environmental Projects",
];

export default function Volunteer() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    availability: "Flexible",
    interestArea: "",
    message: "",
  });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) setForm((f) => ({ ...f, name: user.name, email: user.email }));
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const toggleSkill = (skill) => {
    setSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const healthy = await api.isHealthy();
    if (!healthy) {
      toast.error("Service unavailable. Please try again later.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/volunteers", { ...form, skills, age: Number(form.age) || undefined });
      setSuccess(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div>
        <PageHero eyebrow="Volunteer" title="Thank You for Stepping Forward!" />
        <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-leaf/15 text-leaf flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle size={36} />
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">
            Application Received!
          </h2>
          <p className="text-slate mb-6">
            Our volunteer coordination team will review your application and reach out to you at{" "}
            <strong>{form.email}</strong> within 3-5 working days.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        eyebrow="Join Us"
        title="Become a Volunteer"
        subtitle="Share your time, skills, and passion to help us create lasting change in children's lives across communities."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <form onSubmit={handleSubmit} className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 space-y-6 shadow-sm">
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
              <label className="block text-sm font-semibold mb-2">Phone *</label>
              <input
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-3">Skills (select all that apply)</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                    skills.includes(skill)
                      ? "bg-marigold border-marigold text-white"
                      : "border-white/10 text-slate hover:border-marigold"
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Availability</label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-paper"
              >
                <option>Weekdays</option>
                <option>Weekends</option>
                <option>Both</option>
                <option>Flexible</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Area of Interest</label>
              <select
                name="interestArea"
                value={form.interestArea}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-paper"
              >
                <option value="">Select an area</option>
                {interestAreas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Why do you want to volunteer with us?</label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
          >
            <FiUserPlus /> {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </section>
    </div>
  );
}
