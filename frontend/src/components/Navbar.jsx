import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut, FiHeart } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/programs", label: "Programs" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "volunteer"
      ? "/volunteer-dashboard"
      : "/donor-dashboard";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-marigold to-terracotta flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-marigold/30 group-hover:rotate-6 transition-transform">
            PE
          </div>
          <div className="leading-tight">
            <p className="font-display font-bold text-lg text-ink">Pragya Education</p>
            <p className="text-xs text-slate -mt-1">Sociaty</p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors relative py-2 ${
                  isActive ? "text-marigold" : "text-ink-light hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <span className={isActive ? "marker-underline font-semibold" : ""}>{link.label}</span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => navigate(dashboardPath)}
                className="flex items-center gap-2 text-sm font-medium text-ink-light hover:text-ink transition-colors"
              >
                <FiUser /> {user.name?.split(" ")[0]}
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="flex items-center gap-1 text-sm font-medium text-slate hover:text-terracotta transition-colors"
                title="Logout"
              >
                <FiLogOut />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-ink-light hover:text-ink transition-colors"
            >
              Login
            </Link>
          )}
          <Link
            to="/donate"
            className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all glow-ring"
          >
            <FiHeart /> Donate
          </Link>
        </div>

        <button
          className="lg:hidden text-ink text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden glass border-t border-white/5 px-4 pb-6 pt-2 flex flex-col gap-1 animate-fade-up">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `py-2.5 text-base font-medium border-b border-white/5 ${
                  isActive ? "text-marigold" : "text-ink-light"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <button
                onClick={() => {
                  navigate(dashboardPath);
                  setOpen(false);
                }}
                className="py-2.5 text-base font-medium text-ink text-left"
              >
                My Dashboard
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                  setOpen(false);
                }}
                className="py-2.5 text-base font-medium text-terracotta text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="py-2.5 text-base font-medium text-ink"
            >
              Login / Register
            </Link>
          )}
          <Link
            to="/donate"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold text-sm px-5 py-3 rounded-full"
          >
            <FiHeart /> Donate Now
          </Link>
        </div>
      )}
    </header>
  );
}
