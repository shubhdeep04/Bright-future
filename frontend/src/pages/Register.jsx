// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiUserPlus } from "react-icons/fi";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }
//     setLoading(true);
//     try {
//       const data = await register(form);
//       toast.success(`Welcome, ${data.name}!`);
//       navigate("/donor-dashboard");
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Registration failed");
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
//           <h1 className="font-display font-bold text-2xl md:text-3xl">Create an Account</h1>
//           <p className="text-slate text-sm mt-1">Join us to track donations & volunteer activities</p>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 space-y-5 shadow-sm">
//           <div>
//             <label className="block text-sm font-semibold mb-2">Full Name</label>
//             <input
//               name="name"
//               required
//               value={form.name}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//             />
//           </div>
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
//             <label className="block text-sm font-semibold mb-2">Phone</label>
//             <input
//               name="phone"
//               value={form.phone}
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
//             <FiUserPlus /> {loading ? "Creating..." : "Create Account"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-slate mt-5">
//           Already have an account?{" "}
//           <Link to="/login" className="text-terracotta font-semibold hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus, FiMail } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const { register, googleLogin, verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      const data = await register(form);
      if (data.message && data.email) {
        setPendingVerification(true);
        setRegistrationEmail(data.email);
        toast.success("Account created! Enter the OTP sent to your email.");
      } else if (data.token) {
        // Google signup or email OTP login auto-verifies
        toast.success(`Welcome, ${data.name}!`);
        navigate(data.role === "admin" ? "/admin" : "/donor-dashboard");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await googleLogin(credentialResponse.credential);
      toast.success(`Welcome, ${data.name}!`);
      navigate(data.role === "admin" ? "/admin" : "/donor-dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Google sign-up failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit code from your email.");
      return;
    }

    setVerifyLoading(true);
    try {
      await verifyEmail(otp, registrationEmail);
      toast.success("Email verified! You can now log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid or expired code.");
    } finally {
      setVerifyLoading(false);
    }
  };

  // Show OTP verification prompt immediately after registration
  if (pendingVerification) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-marigold font-display font-bold text-xl border-2 border-marigold mx-auto mb-3">
              BF
            </div>
            <h1 className="font-display font-bold text-2xl md:text-3xl">Verify Your Email</h1>
            <p className="text-slate text-sm mt-1">Enter the OTP sent to {registrationEmail}</p>
          </div>

          <div className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 shadow-sm space-y-5">
            <div className="text-center space-y-3">
              <FiMail className="w-16 h-16 text-marigold mx-auto" />
              <p className="text-slate">We sent a 6-digit code to your email.</p>
              <p className="text-sm text-slate/70">Registration is not complete until you verify with the OTP.</p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Verification Code</label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                  maxLength={6}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors text-center tracking-[0.4em] text-lg"
                />
              </div>
              <button
                type="submit"
                disabled={verifyLoading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
              >
                {verifyLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-xs text-slate/60 mb-2">Didn't receive the code?</p>
              <p className="text-sm">Check your spam or enter your email again on the register page.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-marigold font-display font-bold text-xl border-2 border-marigold mx-auto mb-3">
            BF
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">Create an Account</h1>
          <p className="text-slate text-sm mt-1">Join us to track donations & volunteer activities</p>
        </div>

        <div className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 shadow-sm space-y-5">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google sign-up failed")}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-slate uppercase">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
              />
            </div>
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
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                name="phone"
                value={form.phone}
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
              <FiUserPlus /> {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-terracotta font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}