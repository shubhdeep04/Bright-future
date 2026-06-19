import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { FiCalendar, FiAward, FiCheckCircle, FiClock, FiDownload } from "react-icons/fi";

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/volunteers/my")
      .then((r) => setProfile(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const downloadCertificate = () => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head><title>Volunteer Certificate</title>
        <style>
          body { font-family: serif; padding: 60px; text-align: center; border: 10px solid #F4A636; }
          h1 { color: #1E3A5F; font-size: 2.5em; }
          h2 { color: #D9683C; margin-top: 30px; font-size: 2em; }
          p { color: #5C6B7A; font-size: 1.1em; margin-top: 20px; }
        </style>
        </head>
        <body>
          <h1>Certificate of Appreciation</h1>
          <p>This is to certify that</p>
          <h2>${profile?.name || user?.name}</h2>
          <p>has volunteered with Bright Futures Foundation, contributing time and effort towards our mission of empowering children through education.</p>
          <p style="margin-top: 50px;">Bright Futures Foundation</p>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display font-bold text-2xl mb-3">No Volunteer Profile Found</h1>
        <p className="text-slate mb-6">
          You haven't submitted a volunteer application yet, or it's not linked to your account.
        </p>
        <a href="/volunteer" className="inline-block bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors">
          Apply to Volunteer
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl">Welcome, {profile.name}</h1>
          <p className="text-slate mt-1">Your volunteer activity overview</p>
        </div>
        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold capitalize ${
            profile.status === "approved"
              ? "bg-leaf/15 text-leaf"
              : profile.status === "pending"
              ? "bg-marigold/15 text-marigold"
              : "bg-terracotta/15 text-terracotta"
          }`}
        >
          {profile.status}
        </span>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift">
          <div className="w-12 h-12 rounded-full bg-marigold/15 text-marigold flex items-center justify-center mb-3">
            <FiCalendar size={20} />
          </div>
          <p className="text-3xl font-display font-bold">{profile.assignedActivities?.length || 0}</p>
          <p className="text-sm text-slate mt-1">Assigned Activities</p>
        </div>
        <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift">
          <div className="w-12 h-12 rounded-full bg-leaf/15 text-leaf flex items-center justify-center mb-3">
            <FiCheckCircle size={20} />
          </div>
          <p className="text-3xl font-display font-bold">
            {profile.attendance?.filter((a) => a.present).length || 0}
          </p>
          <p className="text-sm text-slate mt-1">Days Attended</p>
        </div>
        <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift">
          <div className="w-12 h-12 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center mb-3">
            <FiAward size={20} />
          </div>
          <p className="text-3xl font-display font-bold">{profile.certificateIssued ? "Yes" : "No"}</p>
          <p className="text-sm text-slate mt-1">Certificate Issued</p>
          {profile.certificateIssued && (
            <button
              onClick={downloadCertificate}
              className="mt-3 text-sm font-semibold text-ink hover:text-terracotta flex items-center gap-1"
            >
              <FiDownload size={14} /> Download
            </button>
          )}
        </div>
      </div>

      <div className="bg-chalk border border-white/10 rounded-card p-6 mb-8">
        <h2 className="font-display font-bold text-xl mb-4">Assigned Activities</h2>
        {profile.assignedActivities?.length === 0 ? (
          <p className="text-slate">No activities assigned yet. Check back soon!</p>
        ) : (
          <div className="space-y-3">
            {profile.assignedActivities.map((a, i) => (
              <div key={i} className="flex items-start gap-4 border-b border-white/10 last:border-0 pb-3 last:pb-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    a.status === "completed" ? "bg-leaf/15 text-leaf" : "bg-marigold/15 text-marigold"
                  }`}
                >
                  {a.status === "completed" ? <FiCheckCircle /> : <FiClock />}
                </div>
                <div>
                  <p className="font-semibold">{a.title}</p>
                  <p className="text-sm text-slate">{a.description}</p>
                  {a.date && (
                    <p className="text-xs text-slate/70 mt-1">
                      {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-chalk border border-white/10 rounded-card p-6">
        <h2 className="font-display font-bold text-xl mb-4">Attendance Record</h2>
        {profile.attendance?.length === 0 ? (
          <p className="text-slate">No attendance recorded yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.attendance.map((a, i) => (
              <span
                key={i}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  a.present ? "bg-leaf/15 text-leaf" : "bg-terracotta/15 text-terracotta"
                }`}
              >
                {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} —{" "}
                {a.present ? "Present" : "Absent"}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
