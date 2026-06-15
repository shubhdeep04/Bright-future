import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiX, FiHeart, FiMessageCircle, FiArrowUp } from "react-icons/fi";
import { useContent } from "../context/ContentContext";

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const { content } = useContent();

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappNumber = (content.contact_phone || "").replace(/[^0-9]/g, "");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-3 animate-fade-up">
          {showScroll && (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-ink hover:text-marigold transition-colors shadow-lg"
              title="Scroll to top"
            >
              <FiArrowUp size={18} />
            </button>
          )}
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-leaf flex items-center justify-center text-white hover:shadow-lg hover:shadow-leaf/30 transition-all"
              title="Chat on WhatsApp"
            >
              <FiMessageCircle size={20} />
            </a>
          )}
          <Link
            to="/donate"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-marigold to-terracotta flex items-center justify-center text-white hover:shadow-lg hover:shadow-marigold/30 transition-all"
            title="Donate Now"
          >
            <FiHeart size={20} />
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-marigold to-terracotta flex items-center justify-center text-white shadow-lg shadow-marigold/30 hover:scale-105 transition-transform"
        aria-label="Quick actions"
      >
        {open ? <FiX size={22} /> : <FiPlus size={22} />}
      </button>
    </div>
  );
}
