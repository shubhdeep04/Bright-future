// import { useState, useEffect } from "react";
// import PageHero from "../components/PageHero";
// import { FiCalendar, FiMapPin, FiUsers, FiX } from "react-icons/fi";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// const fallbackImg =
//   "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop";

// export default function Events() {
//   const [tab, setTab] = useState("upcoming");
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalEvent, setModalEvent] = useState(null);
//   const [form, setForm] = useState({ name: "", email: "", phone: "" });
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     api
//       .get(`/events?type=${tab}`)
//       .then((r) => setEvents(r.data))
//       .catch(() => setEvents([]))
//       .finally(() => setLoading(false));
//   }, [tab]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.email) {
//       toast.error("Please fill in your name and email");
//       return;
//     }
//     setSubmitting(true);
//     try {
//       await api.post(`/events/${modalEvent._id}/register`, form);
//       toast.success("Registered successfully! See you there.");
//       setModalEvent(null);
//       setForm({ name: "", email: "", phone: "" });
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Registration failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <PageHero
//         eyebrow="Events"
//         title="Our Events & Activities"
//         subtitle="Join us at our upcoming events or explore the impact of past gatherings, fundraisers, and awareness drives."
//       />

//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="flex justify-center gap-3 mb-10">
//           {["upcoming", "past"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`px-6 py-2.5 rounded-full font-semibold text-sm capitalize transition-colors border-2 ${
//                 tab === t ? "bg-marigold border-marigold text-white" : "border-white/10 text-slate hover:border-marigold"
//               }`}
//             >
//               {t} Events
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
//           </div>
//         ) : events.length === 0 ? (
//           <p className="text-center text-slate py-20">No {tab} events at the moment. Check back soon!</p>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {events.map((e) => (
//               <div key={e._id} className="bg-chalk rounded-card overflow-hidden border border-white/10 hover-lift flex flex-col">
//                 <div className="h-44 bg-white/5 overflow-hidden">
//                   <img src={e.image || fallbackImg} alt={e.title} className="w-full h-full object-cover" />
//                 </div>
//                 <div className="p-5 flex flex-col flex-1">
//                   <p className="text-xs font-semibold text-marigold uppercase tracking-wide mb-1">
//                     {e.category}
//                   </p>
//                   <h3 className="font-display font-bold text-lg mb-2">{e.title}</h3>
//                   <p className="text-sm text-slate leading-relaxed mb-4 line-clamp-3">{e.description}</p>
//                   <div className="mt-auto space-y-2 text-sm text-ink">
//                     <p className="flex items-center gap-2">
//                       <FiCalendar className="text-terracotta shrink-0" />
//                       {new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
//                     </p>
//                     <p className="flex items-center gap-2">
//                       <FiMapPin className="text-terracotta shrink-0" /> {e.location}
//                     </p>
//                     {e.maxParticipants > 0 && (
//                       <p className="flex items-center gap-2">
//                         <FiUsers className="text-terracotta shrink-0" />
//                         {e.registrations?.length || 0} / {e.maxParticipants} registered
//                       </p>
//                     )}
//                   </div>
//                   {tab === "upcoming" && (
//                     <button
//                       onClick={() => setModalEvent(e)}
//                       className="mt-4 w-full bg-gradient-to-r from-marigold to-terracotta text-white font-semibold py-2.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors"
//                     >
//                       Register Now
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {modalEvent && (
//         <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//           <div className="bg-paper rounded-card max-w-md w-full p-6 md:p-8 relative animate-fade-up">
//             <button
//               onClick={() => setModalEvent(null)}
//               className="absolute top-4 right-4 text-slate hover:text-ink"
//             >
//               <FiX size={22} />
//             </button>
//             <h3 className="font-display font-bold text-xl mb-1">{modalEvent.title}</h3>
//             <p className="text-sm text-slate mb-5">
//               {new Date(modalEvent.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} • {modalEvent.location}
//             </p>
//             <form onSubmit={handleRegister} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Full Name *</label>
//                 <input
//                   required
//                   value={form.name}
//                   onChange={(e) => setForm({ ...form, name: e.target.value })}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Email *</label>
//                 <input
//                   type="email"
//                   required
//                   value={form.email}
//                   onChange={(e) => setForm({ ...form, email: e.target.value })}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Phone</label>
//                 <input
//                   value={form.phone}
//                   onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors disabled:opacity-60"
//               >
//                 {submitting ? "Registering..." : "Confirm Registration"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState, useEffect, useMemo } from "react";
import PageHero from "../components/PageHero";
import { FiCalendar, FiMapPin, FiUsers, FiX, FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";

const fallbackImg =
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop";

export default function Events() {
  const [tab, setTab] = useState("upcoming");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalEvent, setModalEvent] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  // Advanced States
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6); // Pagination control

  // Debounce logic for heavy search inputs (Performance Optimization)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setSearchQuery("");
      setDebouncedSearch("");
      setSelectedCategory("all");
      setVisibleCount(6); // Reset pagination on tab change

      const healthy = await api.isHealthy();
      if (!healthy) {
        console.warn("Backend health unavailable; skipping events load.");
        setEvents([]);
        setLoading(false);
        return;
      }

      try {
        const r = await api.get(`/events?type=${tab}`);
        setEvents(r.data);
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [tab]);

  // Extract unique categories dynamically from database
  const categories = useMemo(() => {
    const allCats = events.map((e) => e.category).filter(Boolean);
    return ["all", ...new Set(allCats)];
  }, [events]);

  // Advanced Multi-level Filter Logic
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        e.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        e.description?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        e.location?.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || e.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [events, debouncedSearch, selectedCategory]);

  // Paginated/Sliced subset of filtered events
  const paginatedEvents = useMemo(() => {
    return filteredEvents.slice(0, visibleCount);
  }, [filteredEvents, visibleCount]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDebouncedSearch("");
    setSelectedCategory("all");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error("Please fill in your name and email");
      return;
    }

    const healthy = await api.isHealthy();
    if (!healthy) {
      toast.error("Service unavailable. Please try again later.");
      return;
    }

    setSubmitting(true);
    try {
      await api.post(`/events/${modalEvent._id}/register`, form);
      toast.success("Registered successfully! See you there.");
      
      // Dynamic local update to avoid refetching whole database
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === modalEvent._id
            ? { ...ev, registrations: [...(ev.registrations || []), form.email] }
            : ev
        )
      );
      
      setModalEvent(null);
      setForm({ name: "", email: "", phone: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <PageHero
        eyebrow="Events"
        title="Our Events & Activities"
        subtitle="Join us at our upcoming events or explore the impact of past gatherings, fundraisers, and awareness drives."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab Selection */}
        <div className="flex justify-center gap-3 mb-8">
          {["upcoming", "past"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm capitalize transition-colors border-2 ${
                tab === t ? "bg-marigold border-marigold text-white" : "border-white/10 text-slate hover:border-marigold"
              }`}
            >
              {t} Events
            </button>
          ))}
        </div>

        {/* Smart Advanced Search & Filter Controls */}
        <div className="bg-chalk rounded-2xl border border-white/10 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate/50" size={18} />
            <input
              type="text"
              placeholder="Search by keyword, venue or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 focus:border-marigold focus:bg-white/10 outline-none transition-all text-sm text-ink"
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-3 items-center">
            <div className="relative flex-1 md:flex-initial min-w-[180px] flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus-within:border-marigold">
              <FiFilter className="text-slate/50" size={16} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-ink capitalize cursor-pointer appearance-none pr-4"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-white text-ink capitalize">
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Dynamic Button */}
            {(searchQuery || selectedCategory !== "all") && (
              <button
                onClick={handleResetFilters}
                className="p-2.5 rounded-xl border border-dashed border-marigold/40 text-marigold hover:bg-marigold/10 transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0"
                title="Clear Filters"
              >
                <FiRefreshCw size={14} className="animate-spin-slow" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Filter Analytics Stats */}
        {!loading && events.length > 0 && (
          <div className="text-xs text-slate/80 mb-6 px-1 flex justify-between items-center">
            <p>Showing <span className="font-semibold text-ink">{Math.min(visibleCount, filteredEvents.length)}</span> of <span className="font-semibold text-ink">{filteredEvents.length}</span> results found.</p>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-marigold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-card bg-chalk/30">
            <p className="text-slate text-lg mb-2">No matching events discovered.</p>
            <p className="text-sm text-slate/60">Try refining your search keyword or selecting another category filter.</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedEvents.map((e) => {
                const isFull = e.maxParticipants > 0 && (e.registrations?.length || 0) >= e.maxParticipants;
                const isCancelled = e.status === "cancelled";
                const eventDate = new Date(e.date);

                return (
                  <div key={e._id} className="bg-chalk rounded-card overflow-hidden border border-white/10 hover-lift flex flex-col relative group">
                    
                    {/* Admin Triggered Floating Badge Layer */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                      {e.isFeatured && (
                        <span className="bg-marigold text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                          Featured
                        </span>
                      )}
                      {isCancelled && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                          Cancelled
                        </span>
                      )}
                    </div>

                    {/* Premium Date Ribbon */}
                    <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-ink rounded-lg p-1.5 shadow-md flex flex-col items-center min-w-[45px]">
                      <span className="text-[10px] font-bold uppercase text-terracotta leading-none">
                        {eventDate.toLocaleDateString("en-IN", { month: "short" })}
                      </span>
                      <span className="text-lg font-black leading-none mt-0.5">
                        {eventDate.toLocaleDateString("en-IN", { day: "2-digit" })}
                      </span>
                    </div>

                    <div className="h-44 bg-white/5 overflow-hidden relative">
                      <img 
                        src={e.image || fallbackImg} 
                        alt={e.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs font-semibold text-marigold uppercase tracking-wide mb-1">
                        {e.category}
                      </p>
                      <h3 className="font-display font-bold text-lg mb-2 text-ink group-hover:text-marigold transition-colors">
                        {e.title}
                      </h3>
                      <p className="text-sm text-slate leading-relaxed mb-4 line-clamp-3">{e.description}</p>
                      
                      <div className="mt-auto space-y-2 text-sm text-ink/90">
                        <p className="flex items-center gap-2">
                          <FiCalendar className="text-terracotta shrink-0" />
                          {eventDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                        <p className="flex items-center gap-2">
                          <FiMapPin className="text-terracotta shrink-0" /> {e.location}
                        </p>
                        {e.maxParticipants > 0 && (
                          <p className={`flex items-center gap-2 ${isFull ? "text-red-500 font-semibold" : ""}`}>
                            <FiUsers className="text-terracotta shrink-0" />
                            {e.registrations?.length || 0} / {e.maxParticipants} slots taken {isFull && "• Full"}
                          </p>
                        )}
                      </div>
                      
                      {tab === "upcoming" && (
                        <button
                          onClick={() => setModalEvent(e)}
                          disabled={isFull || isCancelled}
                          className={`mt-5 w-full text-white font-semibold py-2.5 rounded-full transition-all ${
                            isCancelled
                              ? "bg-slate/40 cursor-not-allowed"
                              : isFull
                              ? "bg-slate/20 text-slate/60 cursor-not-allowed border border-white/10"
                              : "bg-gradient-to-r from-marigold to-terracotta hover:shadow-lg hover:shadow-marigold/30"
                          }`}
                        >
                          {isCancelled ? "Cancelled" : isFull ? "House Full" : "Register Now"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Smart Infinite-scroll/Pagination Controller */}
            {filteredEvents.length > visibleCount && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-8 py-3 bg-white/5 border border-white/10 text-ink text-sm font-bold rounded-full hover:bg-marigold hover:text-white hover:border-marigold transition-all shadow-sm"
                >
                  Load More Events
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Booking Form Overlay Modal */}
      {modalEvent && (
        <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-paper rounded-card max-w-md w-full p-6 md:p-8 relative animate-fade-up">
            <button
              onClick={() => setModalEvent(null)}
              className="absolute top-4 right-4 text-slate hover:text-ink transition-colors"
            >
              <FiX size={22} />
            </button>
            <h3 className="font-display font-bold text-xl mb-1 text-ink">{modalEvent.title}</h3>
            <p className="text-sm text-slate mb-5">
              {new Date(modalEvent.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} • {modalEvent.location}
            </p>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-marigold to-terracotta text-white font-bold py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-60"
              >
                {submitting ? "Registering..." : "Confirm Registration"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}