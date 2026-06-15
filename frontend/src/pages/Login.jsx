import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      toast.success(`Welcome back, ${data.name}!`);
      const redirect =
        data.role === "admin"
          ? "/admin"
          : data.role === "volunteer"
          ? "/volunteer-dashboard"
          : "/donor-dashboard";
      navigate(location.state?.from || redirect);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-marigold font-display font-bold text-xl border-2 border-marigold mx-auto mb-3">
            BF
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">Welcome Back</h1>
          <p className="text-slate text-sm mt-1">Login to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 space-y-5 shadow-sm">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
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
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
          >
            <FiLogIn /> {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-slate mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-terracotta font-semibold hover:underline">
            Register
          </Link>
        </p>
        <p className="text-center text-xs text-slate/60 mt-4">
          Admin demo: admin@brightfutures.org / Admin@123
        </p>
      </div>
    </div>
  );
}
