import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiCheck, FiX, FiLoader } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("error");
      setMessage("Invalid verification link. Missing token or email.");
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyEmail(token, email);
        setStatus("success");
        setMessage(result.message || "Email verified successfully!");
        toast.success("Email verified! You can now login.");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setStatus("error");
        setMessage(err?.response?.data?.message || "Verification failed. Please try again.");
        toast.error(err?.response?.data?.message || "Email verification failed");
      }
    };

    verify();
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-marigold font-display font-bold text-xl border-2 border-marigold mx-auto mb-3">
            BF
          </div>
          <h1 className="font-display font-bold text-2xl md:text-3xl">Email Verification</h1>
        </div>

        <div className="bg-chalk border border-white/10 rounded-card p-8 shadow-sm text-center">
          {status === "loading" && (
            <>
              <FiLoader className="w-16 h-16 text-marigold mx-auto mb-4 animate-spin" />
              <p className="text-slate">Verifying your email...</p>
            </>
          )}

          {status === "success" && (
            <>
              <FiCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-semibold mb-2">Success!</p>
              <p className="text-slate mb-4">{message}</p>
              <p className="text-sm text-slate/60">Redirecting to login in 3 seconds...</p>
            </>
          )}

          {status === "error" && (
            <>
              <FiX className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <p className="text-lg font-semibold text-red-500 mb-2">Verification Failed</p>
              <p className="text-slate mb-4">{message}</p>
              <button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-2.5 px-6 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
              >
                Back to Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
