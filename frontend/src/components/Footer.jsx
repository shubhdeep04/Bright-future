import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiYoutube, FiLinkedin, FiMapPin, FiMail, FiPhone, FiHeart } from "react-icons/fi";
import { useContent } from "../context/ContentContext";
import { useState } from "react";
import api from "../utils/api";
import toast from "react-hot-toast";

export default function Footer() {
  const { content } = useContent();
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      // Newsletter subscription stored as contact entry for now
      await api.post("/contact", {
        name: "Newsletter Subscriber",
        email,
        subject: "Newsletter Subscription",
        message: "User subscribed to the newsletter.",
      });
      toast.success("Subscribed! Thanks for joining our newsletter.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-white/[0.03] border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-marigold to-terracotta flex items-center justify-center text-white font-display font-bold text-xl shadow-lg shadow-marigold/30">
              BF
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-lg">Bright Futures</p>
              <p className="text-xs text-slate -mt-1">Foundation</p>
            </div>
          </div>
          <p className="text-sm text-slate leading-relaxed">
            {content.mission}
          </p>
          <div className="flex gap-3 mt-5">
            {[
              { Icon: FiFacebook, href: "https://facebook.com" },
              { Icon: FiInstagram, href: "https://instagram.com" },
              { Icon: FiYoutube, href: "https://youtube.com" },
              { Icon: FiLinkedin, href: "https://linkedin.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-marigold hover:text-ink hover:border-marigold transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-lg mb-4 text-marigold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate">
            <li><Link to="/about" className="hover:text-marigold transition-colors">About Us</Link></li>
            <li><Link to="/programs" className="hover:text-marigold transition-colors">Our Programs</Link></li>
            <li><Link to="/events" className="hover:text-marigold transition-colors">Events</Link></li>
            <li><Link to="/gallery" className="hover:text-marigold transition-colors">Gallery</Link></li>
            <li><Link to="/volunteer" className="hover:text-marigold transition-colors">Volunteer</Link></li>
            <li><Link to="/donate" className="hover:text-marigold transition-colors">Donate</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-lg mb-4 text-marigold">Contact</h4>
          <ul className="space-y-3 text-sm text-slate">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0" /> {content.contact_address}
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0" /> {content.contact_email}
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="shrink-0" /> {content.contact_phone}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-lg mb-4 text-marigold">Stay Updated</h4>
          <p className="text-sm text-slate mb-3">
            Subscribe to our newsletter for updates and impact stories.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-ink placeholder:text-slate/50 focus:bg-white/10 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="bg-gradient-to-r from-marigold to-terracotta text-white font-semibold text-sm px-4 py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
            >
              {subscribing ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-xs text-slate/70 flex flex-col sm:flex-row items-center justify-center gap-1 px-4">
        <span>© {new Date().getFullYear()} Bright Futures Foundation. All rights reserved.</span>
        <span className="hidden sm:inline">•</span>
        <span className="flex items-center gap-1">
          {content.registration_details}
        </span>
      </div>
    </footer>
  );
}
