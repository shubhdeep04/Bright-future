// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { FiLogIn } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// export default function Login() {
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const data = await login(form.email, form.password);
//       toast.success(`Welcome back, ${data.name}!`);
//       const redirect =
//         data.role === "admin"
//           ? "/admin"
//           : data.role === "volunteer"
//           ? "/volunteer-dashboard"
//           : "/donor-dashboard";
//       navigate(location.state?.from || redirect);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-marigold font-display font-bold text-xl border-2 border-marigold mx-auto mb-3">
//             BF
//           </div>
//           <h1 className="font-display font-bold text-2xl md:text-3xl">Welcome Back</h1>
//           <p className="text-slate text-sm mt-1">Login to access your dashboard</p>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 space-y-5 shadow-sm">
//           <div>
//             <label className="block text-sm font-semibold mb-2">Email</label>
//             <input
//               type="email"
//               name="email"
//               required
//               value={form.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               required
//               value={form.password}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
//           >
//             <FiLogIn /> {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-slate mt-5">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-terracotta font-semibold hover:underline">
//             Register
//           </Link>
//         </p>
//         <p className="text-center text-xs text-slate/60 mt-4">
//           Admin demo: admin@brightfutures.org / Admin@123
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLogIn, FiMail } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const { login, googleLogin, requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("password"); // "password" | "otp"
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Email OTP flow state
  const [otpEmail, setOtpEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const redirectAfterLogin = (data) => {
    toast.success(`Welcome back, ${data.name}!`);
    const redirect =
      data.role === "admin"
        ? "/admin"
        : data.role === "volunteer"
        ? "/volunteer-dashboard"
        : "/donor-dashboard";
    navigate(location.state?.from || redirect);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      redirectAfterLogin(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await googleLogin(credentialResponse.credential);
      redirectAfterLogin(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Google sign-in failed");
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!otpEmail) return toast.error("Please enter your email");
    setOtpLoading(true);
    try {
      await requestOtp(otpEmail);
      toast.success("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode) return toast.error("Please enter the OTP");
    setOtpLoading(true);
    try {
      const data = await verifyOtp(otpEmail, otpCode);
      redirectAfterLogin(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-marigold font-display font-bold text-xl border-2 border-marigold mx-auto mb-3">
            PE
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">Welcome Back</h1>
          <p className="text-slate text-sm mt-1">Login to access your dashboard</p>
        </div>

        <div className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 shadow-sm space-y-5">
          {/* Google Sign-In */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google sign-in failed")}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate uppercase">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Mode toggle: Password vs Email OTP */}
          <div className="flex gap-2 bg-white/[0.03] p-1 rounded-full">
            <button
              type="button"
              onClick={() => setMode("password")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                mode === "password" ? "bg-marigold text-white" : "text-slate"
              }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setMode("otp")}
              className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                mode === "otp" ? "bg-marigold text-white" : "text-slate"
              }`}
            >
              Email OTP
            </button>
          </div>

          {mode === "password" ? (
            <form onSubmit={handleSubmit} className="space-y-5">
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
          ) : (
            <div className="space-y-5">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={otpEmail}
                      onChange={(e) => setOtpEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
                  >
                    <FiMail /> {otpLoading ? "Sending..." : "Send OTP"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <p className="text-sm text-slate">
                    Code sent to <span className="font-semibold text-ink">{otpEmail}</span>.{" "}
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-terracotta hover:underline"
                    >
                      Change
                    </button>
                  </p>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Enter 6-digit OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors text-center text-2xl tracking-widest"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={otpLoading}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
                  >
                    {otpLoading ? "Verifying..." : "Verify & Login"}
                  </button>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpLoading}
                    className="w-full text-xs text-slate hover:text-marigold"
                  >
                    Resend OTP
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

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