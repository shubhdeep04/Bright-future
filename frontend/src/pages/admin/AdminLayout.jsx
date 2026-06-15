import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiDollarSign,
  FiUsers,
  FiCalendar,
  FiImage,
  FiFileText,
  FiMessageSquare,
  FiHeart,
  FiSettings,
  FiLogOut,
  FiTarget,
  FiUserCheck,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const links = [
  { to: "/admin", label: "Dashboard", icon: FiGrid, end: true },
  { to: "/admin/content", label: "Site Content", icon: FiSettings },
  { to: "/admin/donations", label: "Donations", icon: FiDollarSign },
  { to: "/admin/campaigns", label: "Campaigns", icon: FiTarget },
  { to: "/admin/volunteers", label: "Volunteers", icon: FiUserCheck },
  { to: "/admin/events", label: "Events", icon: FiCalendar },
  { to: "/admin/gallery", label: "Gallery", icon: FiImage },
  { to: "/admin/blogs", label: "Blog", icon: FiFileText },
  { to: "/admin/testimonials", label: "Testimonials", icon: FiHeart },
  { to: "/admin/contacts", label: "Contact Queries", icon: FiMessageSquare },
  { to: "/admin/users", label: "Users", icon: FiUsers },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-5rem)]">
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed bottom-5 right-5 z-50 bg-gradient-to-r from-marigold to-terracotta text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
      >
        {open ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-20 lg:top-20 h-[calc(100vh-5rem)] w-64 glass border-r border-white/10 text-ink p-4 overflow-y-auto z-40 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="mb-6 px-2">
          <p className="font-display font-bold text-lg">Admin Panel</p>
          <p className="text-xs text-slate">{user?.name}</p>
        </div>
        <nav className="space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-gradient-to-r from-marigold to-terracotta text-white" : "text-ink-light hover:bg-white/5"
                }`
              }
            >
              <l.icon size={18} /> {l.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-terracotta hover:bg-white/5 transition-colors mt-4"
          >
            <FiLogOut size={18} /> Logout
          </button>

        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
