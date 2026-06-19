// import { useState, useEffect } from "react";
// import PageHero from "../components/PageHero";
// import { FiX, FiPlay } from "react-icons/fi";
// import api from "../utils/api";

// const categories = ["All", "Education", "Healthcare", "Events", "Women Empowerment", "Environment"];

// export default function Gallery() {
//   const [items, setItems] = useState([]);
//   const [category, setCategory] = useState("All");
//   const [lightbox, setLightbox] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     const params = category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
//     api
//       .get(`/gallery${params}`)
//       .then((r) => setItems(r.data))
//       .catch(() => setItems([]))
//       .finally(() => setLoading(false));
//   }, [category]);

//   return (
//     <div>
//       <PageHero
//         eyebrow="Gallery"
//         title="Moments That Matter"
//         subtitle="Photos and videos capturing the impact of our programs, events, and the smiles we work for every day."
//       />

//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex flex-wrap justify-center gap-3 mb-10">
//           {categories.map((c) => (
//             <button
//               key={c}
//               onClick={() => setCategory(c)}
//               className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors border-2 ${
//                 category === c ? "bg-marigold border-marigold text-white" : "border-white/10 text-slate hover:border-marigold"
//               }`}
//             >
//               {c}
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : items.length === 0 ? (
//           <div className="text-center py-20">
//             <p className="text-slate mb-2">No media items yet for this category.</p>
//             <p className="text-sm text-slate/70">Admin can add photos and videos from the admin panel.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//             {items.map((item) => (
//               <button
//                 key={item._id}
//                 onClick={() => setLightbox(item)}
//                 className="relative aspect-square rounded-card overflow-hidden border border-white/10 group"
//               >
//                 {item.mediaType === "video" ? (
//                   <>
//                     <video src={item.url} className="w-full h-full object-cover" />
//                     <div className="absolute inset-0 bg-ink/30 flex items-center justify-center">
//                       <FiPlay className="text-paper" size={32} />
//                     </div>
//                   </>
//                 ) : (
//                   <img
//                     src={item.url}
//                     alt={item.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                 )}
//                 <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <p className="text-paper text-xs font-semibold truncate">{item.title}</p>
//                 </div>
//               </button>
//             ))}
//           </div>
//         )}
//       </section>

//       {lightbox && (
//         <div
//           className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
//           onClick={() => setLightbox(null)}
//         >
//           <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
//             <div className="flex justify-end mb-2">
//               <button onClick={() => setLightbox(null)} className="text-paper hover:text-marigold">
//                 <FiX size={28} />
//               </button>
//             </div>
//             <div className="rounded-card overflow-hidden bg-ink">
//               {lightbox.mediaType === "video" ? (
//                 <video src={lightbox.url} controls autoPlay className="w-full max-h-[75vh]" />
//               ) : (
//                 <img src={lightbox.url} alt={lightbox.title} className="w-full max-h-[75vh] object-contain" />
//               )}
//             </div>
//             <p className="text-paper font-semibold mt-3">{lightbox.title}</p>
//             {lightbox.description && <p className="text-paper/70 text-sm">{lightbox.description}</p>}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect, useRef, useCallback } from "react";
import PageHero from "../components/PageHero";
import { FiX, FiPlay, FiSearch, FiZoomIn, FiGrid, FiLayout } from "react-icons/fi";
import api from "../utils/api";

const categories = ["All", "Education", "Healthcare", "Events", "Women Empowerment", "Environment"];

const categoryColors = {
  Education: "bg-blue-500/80",
  Healthcare: "bg-emerald-500/80",
  Events: "bg-purple-500/80",
  "Women Empowerment": "bg-pink-500/80",
  Environment: "bg-green-500/80",
};

// Sample fallback images (shown when API returns empty)
const SAMPLE_ITEMS = [
  { _id: "s1", title: "Education for All", description: "Children learning in our community school", category: "Education", mediaType: "image", url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80" },
  { _id: "s2", title: "Health Camp 2024", description: "Free medical checkups for 500+ families", category: "Healthcare", mediaType: "image", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" },
  { _id: "s3", title: "Annual Fundraiser", description: "Community gathering and fundraiser event", category: "Events", mediaType: "image", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
  { _id: "s4", title: "Women Skill Training", description: "Vocational training program for women", category: "Women Empowerment", mediaType: "image", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
  { _id: "s5", title: "Tree Plantation Drive", description: "500 saplings planted this season", category: "Environment", mediaType: "image", url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80" },
  { _id: "s6", title: "Classroom Renovation", description: "New classrooms built for 200 students", category: "Education", mediaType: "image", url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80" },
  { _id: "s7", title: "Eye Checkup Camp", description: "Free eye screening for elders", category: "Healthcare", mediaType: "image", url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80" },
  { _id: "s8", title: "Cultural Fest", description: "Celebrating diversity through art", category: "Events", mediaType: "image", url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80" },
  { _id: "s9", title: "Self Help Group", description: "Women entrepreneurs sharing stories", category: "Women Empowerment", mediaType: "image", url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80" },
  { _id: "s10", title: "River Cleanup", description: "Volunteers cleaning local river banks", category: "Environment", mediaType: "image", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
  { _id: "s11", title: "Digital Literacy", description: "Teaching computer skills to youth", category: "Education", mediaType: "image", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80" },
  { _id: "s12", title: "Nutrition Workshop", description: "Awareness on healthy eating habits", category: "Healthcare", mediaType: "image", url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80" },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [layout, setLayout] = useState("masonry");
  const [visible, setVisible] = useState(12);
  const searchRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setVisible(12);
    const params = category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
    api
      .get(`/gallery${params}`)
      .then((r) => {
        const data = r.data;
        if (!data || data.length === 0) {
          const fallback = category === "All" ? SAMPLE_ITEMS : SAMPLE_ITEMS.filter((i) => i.category === category);
          setItems(fallback);
        } else {
          setItems(data);
        }
      })
      .catch(() => {
        const fallback = category === "All" ? SAMPLE_ITEMS : SAMPLE_ITEMS.filter((i) => i.category === category);
        setItems(fallback);
      })
      .finally(() => setLoading(false));
  }, [category]);

  // filteredItems defined before callbacks that reference it
  const filteredItems =
    search.trim() === ""
      ? items
      : items.filter(
          (item) =>
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.description?.toLowerCase().includes(search.toLowerCase()) ||
            item.category?.toLowerCase().includes(search.toLowerCase())
        );

  const visibleItems = filteredItems.slice(0, visible);

  const openLightbox = useCallback((item, index) => {
    setLightbox(item);
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    setLightboxIndex(null);
  }, []);

  const navigate = useCallback(
    (dir) => {
      setLightboxIndex((prev) => {
        const next = prev + dir;
        if (next >= 0 && next < filteredItems.length) {
          setLightbox(filteredItems[next]);
          return next;
        }
        return prev;
      });
    },
    [filteredItems]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, navigate, closeLightbox]);

  const getMasonryColumns = () => {
    const cols = [[], [], []];
    visibleItems.forEach((item, i) => cols[i % 3].push({ item, globalIdx: i }));
    return cols;
  };

  return (
    <div>
      <PageHero
        eyebrow="Gallery"
        title="Moments That Matter"
        subtitle="Photos and videos capturing the impact of our programs, events, and the smiles we work for every day."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Search + Layout Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full sm:max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate/50 pointer-events-none" size={16} />
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search photos & videos…"
              className="w-full pl-9 pr-10 py-2.5 rounded-full bg-white/5 border border-white/10 text-paper placeholder-slate/40 text-sm focus:outline-none focus:border-marigold transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate/50 hover:text-marigold transition-colors"
                aria-label="Clear search"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
            <button
              onClick={() => setLayout("masonry")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                layout === "masonry" ? "bg-marigold text-white" : "text-slate/60 hover:text-paper"
              }`}
            >
              <FiLayout size={13} /> Masonry
            </button>
            <button
              onClick={() => setLayout("grid")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                layout === "grid" ? "bg-marigold text-white" : "text-slate/60 hover:text-paper"
              }`}
            >
              <FiGrid size={13} /> Grid
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 border-2 ${
                category === c
                  ? "bg-marigold border-marigold text-white shadow-lg shadow-marigold/25 scale-105"
                  : "border-white/10 text-slate hover:border-marigold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Result Count */}
        {!loading && filteredItems.length > 0 && (
          <p className="text-slate/50 text-xs text-center mb-6">
            Showing <span className="text-marigold font-semibold">{Math.min(visible, filteredItems.length)}</span> of{" "}
            <span className="text-paper font-semibold">{filteredItems.length}</span> items
            {search && <span> for <span className="text-marigold">"{search}"</span></span>}
          </p>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin" />
          </div>

        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate mb-2 font-semibold">
              {search ? `No results for "${search}"` : "No media items yet for this category."}
            </p>
            <p className="text-sm text-slate/50">
              {search ? "Try different keywords or clear the search." : "Admin can add photos and videos from the admin panel."}
            </p>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-4 px-5 py-2 rounded-full bg-marigold text-white text-sm font-semibold hover:bg-marigold/90 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>

        ) : layout === "masonry" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {getMasonryColumns().map((col, ci) => (
              <div key={ci} className="flex flex-col gap-4">
                {col.map(({ item, globalIdx }) => (
                  <GalleryCard key={item._id} item={item} index={globalIdx} onOpen={openLightbox} masonry />
                ))}
              </div>
            ))}
          </div>

        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleItems.map((item, idx) => (
              <GalleryCard key={item._id} item={item} index={idx} onOpen={openLightbox} />
            ))}
          </div>
        )}

        {/* Load More */}
        {!loading && visible < filteredItems.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setVisible((v) => v + 12)}
              className="px-8 py-3 rounded-full border-2 border-marigold text-marigold font-semibold text-sm hover:bg-marigold hover:text-white transition-all duration-200"
            >
              Load More ({filteredItems.length - visible} remaining)
            </button>
          </div>
        )}
      </section>

      {lightbox && (
        <Lightbox
          item={lightbox}
          index={lightboxIndex}
          total={filteredItems.length}
          onClose={closeLightbox}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}

function GalleryCard({ item, index, onOpen, masonry }) {
  return (
    <button
      onClick={() => onOpen(item, index)}
      className={`relative w-full overflow-hidden rounded-card border border-white/10 group focus:outline-none focus:ring-2 focus:ring-marigold transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 ${
        masonry ? "" : "aspect-square"
      }`}
      aria-label={`Open ${item.title}`}
    >
      {item.mediaType === "video" ? (
        <div className={masonry ? "relative" : "relative w-full h-full"}>
          <video src={item.url} className={`w-full object-cover ${masonry ? "" : "h-full"}`} muted preload="metadata" />
          <div className="absolute inset-0 bg-ink/40 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-marigold/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-marigold/40">
              <FiPlay className="text-white ml-0.5" size={20} />
            </div>
          </div>
        </div>
      ) : (
        <img
          src={item.url}
          alt={item.title}
          className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${masonry ? "" : "h-full"}`}
          loading="lazy"
        />
      )}

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="w-8 h-8 rounded-full bg-ink/60 backdrop-blur-sm flex items-center justify-center">
          <FiZoomIn className="text-paper" size={13} />
        </span>
      </div>

      {item.category && item.category !== "All" && (
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full backdrop-blur-sm ${categoryColors[item.category] || "bg-marigold/80"}`}>
            {item.category}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent px-3 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-paper text-xs font-semibold truncate">{item.title}</p>
        {item.description && <p className="text-paper/60 text-[10px] mt-0.5 line-clamp-1">{item.description}</p>}
      </div>
    </button>
  );
}

function Lightbox({ item, index, total, onClose, onNavigate }) {
  return (
    <div
      className="fixed inset-0 bg-ink/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-slate/60 text-sm font-mono">{index + 1} / {total}</span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-marigold flex items-center justify-center text-paper transition-colors"
            aria-label="Close lightbox"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="relative rounded-card overflow-hidden bg-ink border border-white/10">
          {item.mediaType === "video" ? (
            <video src={item.url} controls autoPlay className="w-full max-h-[75vh]" />
          ) : (
            <img src={item.url} alt={item.title} className="w-full max-h-[75vh] object-contain" />
          )}

          {index > 0 && (
            <button
              onClick={() => onNavigate(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 backdrop-blur-sm hover:bg-marigold flex items-center justify-center text-paper text-xl transition-colors"
              aria-label="Previous"
            >
              ‹
            </button>
          )}
          {index < total - 1 && (
            <button
              onClick={() => onNavigate(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink/70 backdrop-blur-sm hover:bg-marigold flex items-center justify-center text-paper text-xl transition-colors"
              aria-label="Next"
            >
              ›
            </button>
          )}
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <p className="text-paper font-semibold">{item.title}</p>
            {item.description && <p className="text-paper/70 text-sm mt-0.5">{item.description}</p>}
          </div>
          {item.category && item.category !== "All" && (
            <span className={`shrink-0 text-xs font-bold text-white px-3 py-1 rounded-full ${categoryColors[item.category] || "bg-marigold"}`}>
              {item.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}