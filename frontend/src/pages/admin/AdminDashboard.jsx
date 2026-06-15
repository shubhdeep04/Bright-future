import { useState, useEffect } from "react";
import api from "../../utils/api";
import { FiDollarSign, FiUsers, FiCalendar, FiUserCheck, FiClock, FiBookOpen } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [monthly, setMonthly] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/analytics/dashboard"), api.get("/donations/stats")])
      .then(([a, b]) => {
        setStats(a.data);
        const formatted = b.data.monthly
          .map((m) => ({
            name: `${m._id.month}/${m._id.year}`,
            total: m.total,
          }))
          .reverse();
        setMonthly(formatted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const cards = [
    {
      icon: FiDollarSign,
      label: "Total Donations",
      value: `₹${(stats?.totalDonations || 0).toLocaleString()}`,
      color: "bg-marigold/15 text-marigold",
    },
    {
      icon: FiBookOpen,
      label: "Donation Count",
      value: stats?.donationCount || 0,
      color: "bg-terracotta/15 text-terracotta",
    },
    {
      icon: FiUserCheck,
      label: "Total Volunteers",
      value: stats?.volunteerCount || 0,
      color: "bg-leaf/15 text-leaf",
    },
    {
      icon: FiClock,
      label: "Pending Volunteer Apps",
      value: stats?.pendingVolunteers || 0,
      color: "bg-white/5 text-ink",
    },
    {
      icon: FiCalendar,
      label: "Upcoming Events",
      value: stats?.upcomingEventCount || 0,
      color: "bg-marigold/15 text-marigold",
    },
    {
      icon: FiUsers,
      label: "Registered Users",
      value: stats?.userCount || 0,
      color: "bg-leaf/15 text-leaf",
    },
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-3xl mb-6">Dashboard Overview</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((c, i) => (
          <div key={i} className="bg-chalk border border-white/10 rounded-card p-6 hover-lift">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${c.color}`}>
              <c.icon size={20} />
            </div>
            <p className="text-2xl md:text-3xl font-display font-bold">{c.value}</p>
            <p className="text-sm text-slate mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-chalk border border-white/10 rounded-card p-6">
        <h2 className="font-display font-bold text-xl mb-4">Monthly Donations (Last 12 Months)</h2>
        {monthly.length === 0 ? (
          <p className="text-slate">No donation data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E3A5F11" />
              <XAxis dataKey="name" stroke="#5C6B7A" fontSize={12} />
              <YAxis stroke="#5C6B7A" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "#FDFBF5", border: "1px solid #1E3A5F22", borderRadius: "12px" }}
              />
              <Bar dataKey="total" fill="#F4A636" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
