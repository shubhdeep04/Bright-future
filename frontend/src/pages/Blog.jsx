import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import api from "../utils/api";
import { FiArrowRight } from "react-icons/fi";

const fallbackImg =
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blogs")
      .then((r) => setBlogs(r.data))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageHero
        eyebrow="News & Blog"
        title="Stories, Updates & Awareness"
        subtitle="Read about our latest activities, awareness campaigns, and the success stories of the children we work with."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-slate py-20">No blog posts yet. Check back soon!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <Link
                key={b._id}
                to={`/blog/${b.slug}`}
                className="bg-chalk rounded-card overflow-hidden border border-white/10 hover-lift flex flex-col"
              >
                <div className="h-48 bg-white/5 overflow-hidden">
                  <img src={b.image || fallbackImg} alt={b.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs font-semibold text-marigold uppercase tracking-wide mb-1">
                    {b.category}
                  </p>
                  <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
                  <p className="text-sm text-slate leading-relaxed mb-4 line-clamp-3 flex-1">
                    {b.excerpt || b.content?.slice(0, 120)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    Read More <FiArrowRight />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
