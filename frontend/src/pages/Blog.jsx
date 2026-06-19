// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import PageHero from "../components/PageHero";
// import api from "../utils/api";
// import { FiArrowRight } from "react-icons/fi";

// const fallbackImg =
//   "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop";

// export default function Blog() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get("/blogs")
//       .then((r) => setBlogs(r.data))
//       .catch(() => setBlogs([]))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div>
//       <PageHero
//         eyebrow="News & Blog"
//         title="Stories, Updates & Awareness"
//         subtitle="Read about our latest activities, awareness campaigns, and the success stories of the children we work with."
//       />

//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : blogs.length === 0 ? (
//           <p className="text-center text-slate py-20">No blog posts yet. Check back soon!</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {blogs.map((b) => (
//               <Link
//                 key={b._id}
//                 to={`/blog/${b.slug}`}
//                 className="bg-chalk rounded-card overflow-hidden border border-white/10 hover-lift flex flex-col"
//               >
//                 <div className="h-48 bg-white/5 overflow-hidden">
//                   <img src={b.image || fallbackImg} alt={b.title} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="p-5 flex flex-col flex-1">
//                   <p className="text-xs font-semibold text-marigold uppercase tracking-wide mb-1">
//                     {b.category}
//                   </p>
//                   <h3 className="font-display font-bold text-lg mb-2">{b.title}</h3>
//                   <p className="text-sm text-slate leading-relaxed mb-4 line-clamp-3 flex-1">
//                     {b.excerpt || b.content?.slice(0, 120)}
//                   </p>
//                   <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
//                     Read More <FiArrowRight />
//                   </span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }







import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import api from "../utils/api";
import { FiArrowRight, FiSearch, FiClock, FiUser, FiBookOpen, FiX } from "react-icons/fi";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=800&auto=format&fit=crop";
const FALLBACK_AVATAR = "https://ui-avatars.com/api/?background=f5a623&color=fff&name=";

function readTime(content = "") {
  const words = content?.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="bg-chalk border border-white/10 rounded-card overflow-hidden animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-3 w-20 bg-white/10 rounded-full" />
        <div className="h-5 w-3/4 bg-white/10 rounded-full" />
        <div className="h-3 w-full bg-white/5 rounded-full" />
        <div className="h-3 w-5/6 bg-white/5 rounded-full" />
      </div>
    </div>
  );
}

/* ── Blog card ── */
function BlogCard({ b, featured = false }) {
  const mins = readTime(b.content);
  const avatar = b.authorAvatar || `${FALLBACK_AVATAR}${encodeURIComponent(b.author || "A")}`;

  if (featured) {
    return (
      <Link to={`/blog/${b.slug}`}
        className="group relative rounded-card overflow-hidden border border-white/10 hover-lift flex flex-col md:flex-row bg-chalk mb-10"
      >
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden flex-shrink-0">
          <img src={b.image || FALLBACK_IMG} alt={b.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="p-7 md:p-10 flex flex-col justify-center flex-1">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="bg-marigold/15 text-marigold text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              ⭐ Featured
            </span>
            {b.category && (
              <span className="text-xs font-semibold text-terracotta uppercase tracking-wide">
                {b.category}
              </span>
            )}
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink leading-snug mb-3">
            {b.title}
          </h2>
          <p className="text-slate text-sm leading-relaxed mb-5 line-clamp-3">
            {b.excerpt || b.content?.replace(/<[^>]+>/g, "").slice(0, 180)}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate mb-5">
            <span className="flex items-center gap-1.5">
              <img src={avatar} alt={b.author} className="w-6 h-6 rounded-full object-cover" />
              {b.author || "Team BFF"}
            </span>
            <span className="flex items-center gap-1"><FiClock size={11} /> {mins} min read</span>
            {b.createdAt && <span>{formatDate(b.createdAt)}</span>}
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-marigold group-hover:gap-3 transition-all">
            Read Full Story <FiArrowRight size={14} />
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${b.slug}`}
      className="group bg-chalk rounded-card overflow-hidden border border-white/10 hover-lift flex flex-col"
    >
      <div className="h-48 overflow-hidden relative">
        <img src={b.image || FALLBACK_IMG} alt={b.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {b.category && (
          <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            {b.category}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg mb-2 text-ink leading-snug">{b.title}</h3>
        <p className="text-sm text-slate leading-relaxed mb-4 line-clamp-3 flex-1">
          {b.excerpt || b.content?.replace(/<[^>]+>/g, "").slice(0, 120)}
        </p>
        <div className="flex items-center gap-3 text-xs text-slate mb-4 pt-3 border-t border-white/5">
          <img src={avatar} alt={b.author} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
          <span className="flex items-center gap-1"><FiUser size={10} />{b.author || "Team BFF"}</span>
          <span className="flex items-center gap-1 ml-auto"><FiClock size={10} />{mins} min</span>
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-marigold transition-colors">
          Read More <FiArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

export default function Blog() {
  const [blogs, setBlogs]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      const healthy = await api.isHealthy();
      if (!healthy) {
        console.warn("Backend health unavailable; skipping blog load.");
        setBlogs([]);
        setLoading(false);
        return;
      }

      try {
        const r = await api.get("/blogs");
        setBlogs(r.data.filter(b => b.status === "published" || !b.status));
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  /* Derive categories from data */
  const categories = useMemo(() => {
    const cats = [...new Set(blogs.map(b => b.category).filter(Boolean))];
    return ["All", ...cats];
  }, [blogs]);

  /* Featured = first blog with featured flag, else first blog */
  const featured = useMemo(() => blogs.find(b => b.featured) || blogs[0], [blogs]);

  /* Filtered list (excludes featured from grid) */
  const filtered = useMemo(() => {
    let list = blogs.filter(b => b._id !== featured?._id);
    if (activeCategory !== "All") list = list.filter(b => b.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(b =>
        b.title?.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [blogs, featured, activeCategory, search]);

  return (
    <div>
      <PageHero
        eyebrow="News & Blog"
        title="Stories, Updates & Awareness"
        subtitle="Read about our latest activities, awareness campaigns, and the success stories of the children we work with."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Search + Filter bar ── */}
        {!loading && blogs.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-10">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate" size={15} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search posts…"
                className="w-full pl-10 pr-9 py-2.5 rounded-full border border-white/10 bg-white/[0.03] text-sm text-ink placeholder:text-slate focus:outline-none focus:border-marigold/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink">
                  <FiX size={14} />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? "bg-marigold text-white shadow-md shadow-marigold/25"
                      : "bg-white/[0.04] border border-white/10 text-slate hover:border-marigold/40 hover:text-ink"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div>
            <div className="h-64 bg-white/5 rounded-card animate-pulse mb-10" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-24">
            <FiBookOpen size={40} className="mx-auto text-slate mb-4" />
            <p className="text-slate text-lg">No blog posts yet. Check back soon!</p>
          </div>
        )}

        {/* ── Featured post ── */}
        {!loading && featured && activeCategory === "All" && !search && (
          <BlogCard b={featured} featured />
        )}

        {/* ── Grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(b => <BlogCard key={b._id} b={b} />)}
          </div>
        )}

        {/* ── No results ── */}
        {!loading && blogs.length > 0 && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate">No posts match your search. <button onClick={() => { setSearch(""); setActiveCategory("All"); }} className="text-marigold underline">Clear filters</button></p>
          </div>
        )}

        {/* ── Result count ── */}
        {!loading && (search || activeCategory !== "All") && filtered.length > 0 && (
          <p className="text-xs text-slate mt-8 text-center">{filtered.length} post{filtered.length !== 1 ? "s" : ""} found</p>
        )}
      </section>
    </div>
  );
}