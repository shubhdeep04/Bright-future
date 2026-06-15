import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <p className="font-display font-bold text-7xl md:text-8xl text-marigold mb-2">404</p>
      <h1 className="font-display font-bold text-2xl md:text-3xl mb-3">Page Not Found</h1>
      <p className="text-slate mb-8 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-7 py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
      >
        <FiHome /> Back to Home
      </Link>
    </div>
  );
}
