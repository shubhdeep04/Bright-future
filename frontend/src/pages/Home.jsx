// import { Link } from "react-router-dom";
// import { FiArrowRight, FiHeart, FiUsers, FiBookOpen, FiTarget, FiCheckCircle, FiShield, FiAward, FiTrendingUp, FiGlobe } from "react-icons/fi";
// import { useContent } from "../context/ContentContext";
// import { useEffect, useState } from "react";
// import api from "../utils/api";
// import Counter from "../components/Counter";
// import ImpactCalculator from "../components/ImpactCalculator";
// import FAQAccordion from "../components/FAQAccordion";

// const programs = [
//   {
//     icon: FiBookOpen,
//     title: "Education Support",
//     desc: "Scholarships, free tuition centers, books and stationery for underprivileged children.",
//     color: "bg-marigold/15 text-marigold",
//   },
//   {
//     icon: FiHeart,
//     title: "Healthcare Camps",
//     desc: "Free health checkups, vaccination drives and nutrition support in rural schools.",
//     color: "bg-terracotta/15 text-terracotta",
//   },
//   {
//     icon: FiUsers,
//     title: "Women Empowerment",
//     desc: "Skill training, employment assistance and legal awareness sessions for women.",
//     color: "bg-leaf/15 text-leaf",
//   },
//   {
//     icon: FiTarget,
//     title: "Child Welfare",
//     desc: "Sponsorship programs, education tracking and direct support for vulnerable children.",
//     color: "bg-white/10 text-ink",
//   },
// ];

// const trustBadges = [
//   {
//     icon: FiShield,
//     title: "80G Tax Exempt",
//     desc: "Registered NGO with full transparency and audited financials.",
//   },
//   {
//     icon: FiTrendingUp,
//     title: "100% Fund Utilization",
//     desc: "Every rupee donated goes directly to program delivery.",
//   },
//   {
//     icon: FiAward,
//     title: "12+ Years of Trust",
//     desc: "A track record of measurable impact since 2014.",
//   },
//   {
//     icon: FiGlobe,
//     title: "28 Partner Schools",
//     desc: "Working hand-in-hand with local schools and communities.",
//   },
// ];

// const partners = [
//   "United Way India",
//   "Teach For India",
//   "Rotary Club Khandwa",
//   "GiveIndia",
//   "Akshaya Patra",
//   "CRY Foundation",
// ];

// export default function Home() {
//   const { content } = useContent();
//   const [campaigns, setCampaigns] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     api.get("/campaigns?active=true").then((r) => setCampaigns(r.data.slice(0, 1))).catch(() => {});
//     api.get("/testimonials").then((r) => setTestimonials(r.data.slice(0, 3))).catch(() => {});
//     api.get("/events?type=upcoming").then((r) => setEvents(r.data.slice(0, 3))).catch(() => {});
//   }, []);

//   const campaign = campaigns[0];
//   const progressPct = campaign
//     ? Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100))
//     : 0;


//   return (
//     <div>
//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         <div className="absolute inset-0 ruled-bg opacity-40"></div>
//         <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-marigold/25 blur-3xl float-blob"></div>
//         <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-leaf/15 blur-3xl float-blob" style={{ animationDelay: "3s" }}></div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
//           <div className="animate-fade-up">
//             <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
//               <span className="w-8 h-px bg-marigold inline-block"></span> Bright Futures Foundation
//             </p>
//             <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-ink">
//               {content.hero_title?.split(" Education")[0] || "Empowering Children"}{" "}
//               <span className="marker-underline">Through Education</span>
//             </h1>
//             <p className="mt-6 text-ink-light text-base md:text-lg max-w-xl">
//               {content.hero_subtitle}
//             </p>
//             <div className="mt-8 flex flex-wrap gap-4">
//               <Link
//                 to="/donate"
//                 className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-7 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all glow-ring"
//               >
//                 <FiHeart /> Donate Now
//               </Link>
//               <Link
//                 to="/volunteer"
//                 className="flex items-center gap-2 glass text-ink font-semibold px-7 py-3.5 rounded-full hover:border-marigold/50 transition-colors"
//               >
//                 Become a Volunteer <FiArrowRight />
//               </Link>
//             </div>
//           </div>

//           <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
//             <div className="aspect-[4/5] rounded-card overflow-hidden border border-white/10 shadow-2xl shadow-marigold/10">
//               <img
//                 src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1200&auto=format&fit=crop"
//                 alt="Children studying together in a classroom"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div className="absolute -bottom-6 -left-6 glass rounded-card p-5 shadow-xl max-w-[220px] hidden sm:block">
//               <p className="font-display font-bold text-3xl text-terracotta">
//                 <Counter value={content.stat_beneficiaries} suffix="+" />
//               </p>
//               <p className="text-sm text-slate mt-1">Children supported across India</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* STATS BAR */}
//       <section className="border-y border-white/5 bg-white/[0.02]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//           {[
//             { value: content.stat_beneficiaries, label: "Children Educated", suffix: "+" },
//             { value: content.stat_volunteers, label: "Active Volunteers", suffix: "+" },
//             { value: content.stat_schools, label: "Partner Schools", suffix: "" },
//             { value: content.stat_years, label: "Years of Impact", suffix: "+" },
//           ].map((s, i) => (
//             <div key={i}>
//               <p className="font-display font-bold text-3xl md:text-4xl text-ink">
//                 <Counter value={s.value} suffix={s.suffix} />
//               </p>
//               <p className="text-sm text-slate mt-1">{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* TRUST BADGES */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {trustBadges.map((b, i) => (
//             <div key={i} className="glass rounded-card p-6 text-center hover-lift">
//               <div className="w-12 h-12 rounded-2xl bg-marigold/15 text-marigold flex items-center justify-center mx-auto mb-3">
//                 <b.icon size={20} />
//               </div>
//               <h3 className="font-display font-bold text-base mb-1 text-ink">{b.title}</h3>
//               <p className="text-xs text-slate leading-relaxed">{b.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* MISSION & VISION */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-10">
//         <div className="glass rounded-card p-8 hover-lift">
//           <div className="w-12 h-12 rounded-2xl bg-leaf/15 text-leaf flex items-center justify-center mb-4">
//             <FiTarget size={22} />
//           </div>
//           <h3 className="font-display font-bold text-2xl mb-3 text-ink">Our Mission</h3>
//           <p className="text-slate leading-relaxed">{content.mission}</p>
//         </div>
//         <div className="glass rounded-card p-8 hover-lift">
//           <div className="w-12 h-12 rounded-2xl bg-marigold/15 text-marigold flex items-center justify-center mb-4">
//             <FiCheckCircle size={22} />
//           </div>
//           <h3 className="font-display font-bold text-2xl mb-3 text-ink">Our Vision</h3>
//           <p className="text-slate leading-relaxed">{content.vision}</p>
//         </div>
//       </section>

//       {/* PROGRAMS */}
//       <section className="py-20 bg-white/[0.015]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
//               What We Do
//             </p>
//             <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Our Core Programs</h2>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {programs.map((p, i) => (
//               <div key={i} className="glass rounded-card p-6 hover-lift">
//                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${p.color}`}>
//                   <p.icon size={22} />
//                 </div>
//                 <h3 className="font-display font-bold text-lg mb-2 text-ink">{p.title}</h3>
//                 <p className="text-sm text-slate leading-relaxed">{p.desc}</p>
//               </div>
//             ))}
//           </div>
//           <div className="text-center mt-10">
//             <Link
//               to="/programs"
//               className="inline-flex items-center gap-2 text-ink font-semibold hover:text-marigold transition-colors"
//             >
//               View All Programs <FiArrowRight />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* LIVE DONATION TRACKER */}
//       {campaign && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="glass rounded-card overflow-hidden grid md:grid-cols-2 relative">
//             <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-marigold/20 blur-3xl"></div>
//             <div className="p-8 md:p-12 relative">
//               <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-3">
//                 Active Campaign
//               </p>
//               <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 text-ink">{campaign.title}</h3>
//               <p className="text-slate mb-6 leading-relaxed">{campaign.description}</p>

//               <div className="mb-2 flex justify-between text-sm">
//                 <span className="text-marigold font-semibold">
//                   ₹{campaign.raisedAmount?.toLocaleString()} raised
//                 </span>
//                 <span className="text-slate">of ₹{campaign.targetAmount?.toLocaleString()}</span>
//               </div>
//               <div className="h-3 rounded-full bg-white/5 overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-marigold to-terracotta rounded-full transition-all duration-1000"
//                   style={{ width: `${progressPct}%` }}
//                 ></div>
//               </div>
//               <p className="text-xs text-slate mt-2">{progressPct}% of goal achieved</p>

//               <Link
//                 to="/donate"
//                 className="inline-flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-7 py-3 rounded-full mt-6 hover:shadow-lg hover:shadow-marigold/30 transition-all"
//               >
//                 <FiHeart /> Contribute Now
//               </Link>
//             </div>
//             <div className="hidden md:block">
//               <img
//                 src="https://images.unsplash.com/photo-1497375638960-ca80c8c1d3a6?q=80&w=1200&auto=format&fit=crop"
//                 alt="Students reading books donated by the campaign"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </section>
//       )}

//       {/* IMPACT CALCULATOR */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <ImpactCalculator />
//       </section>

//       {/* UPCOMING EVENTS */}
//       {events.length > 0 && (
//         <section className="py-20 bg-white/[0.015]">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
//               <div>
//                 <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
//                   Get Involved
//                 </p>
//                 <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Upcoming Events</h2>
//               </div>
//               <Link to="/events" className="text-ink font-semibold hover:text-marigold flex items-center gap-2">
//                 View All <FiArrowRight />
//               </Link>
//             </div>
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {events.map((e) => (
//                 <div key={e._id} className="glass rounded-card overflow-hidden hover-lift">
//                   <div className="h-40 bg-white/5 overflow-hidden">
//                     <img
//                       src={e.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop"}
//                       alt={e.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-5">
//                     <p className="text-xs font-semibold text-marigold uppercase tracking-wide">
//                       {new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//                     </p>
//                     <h3 className="font-display font-bold text-lg mt-1 mb-2 text-ink">{e.title}</h3>
//                     <p className="text-sm text-slate line-clamp-2">{e.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* TESTIMONIALS */}
//       {testimonials.length > 0 && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//           <div className="text-center max-w-2xl mx-auto mb-12">
//             <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
//               Voices
//             </p>
//             <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">What People Say</h2>
//           </div>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {testimonials.map((t) => (
//               <div key={t._id} className="glass rounded-card p-6 hover-lift">
//                 <div className="flex gap-1 text-marigold mb-3">
//                   {Array.from({ length: t.rating }).map((_, i) => (
//                     <FiHeart key={i} className="fill-marigold" />
//                   ))}
//                 </div>
//                 <p className="text-slate leading-relaxed mb-4 italic">"{t.message}"</p>
//                 <p className="font-semibold text-ink">{t.name}</p>
//                 <p className="text-xs text-slate capitalize">{t.role}</p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* PARTNERS MARQUEE */}
//       <section className="py-12 border-y border-white/5 bg-white/[0.015] overflow-hidden">
//         <p className="text-center text-xs uppercase tracking-widest text-slate mb-6">
//           Trusted by & Partnered with
//         </p>
//         <div className="relative flex overflow-x-hidden">
//           <div className="flex gap-12 animate-marquee whitespace-nowrap">
//             {[...partners, ...partners].map((p, i) => (
//               <span key={i} className="font-display font-semibold text-lg text-ink-light/60">
//                 {p}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center max-w-2xl mx-auto mb-12">
//           <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
//             Have Questions?
//           </p>
//           <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Frequently Asked Questions</h2>
//         </div>
//         <FAQAccordion />
//       </section>

//       {/* CTA */}
//       <section className="py-16 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-marigold/20 via-transparent to-terracotta/10"></div>
//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-ink">
//             Every Child Deserves a Chance to Learn
//           </h2>
//           <p className="text-ink-light mb-8 max-w-xl mx-auto">
//             Your support — big or small — helps us bring books, teachers, and hope to children who need it most.
//           </p>
//           <div className="flex flex-wrap justify-center gap-4">
//             <Link
//               to="/donate"
//               className="bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all glow-ring"
//             >
//               Donate Now
//             </Link>
//             <Link
//               to="/volunteer"
//               className="glass text-ink font-semibold px-8 py-3.5 rounded-full hover:border-marigold/50 transition-colors"
//             >
//               Join as Volunteer
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }










// import { Link } from "react-router-dom";
// import {
//   FiArrowRight, FiHeart, FiUsers, FiBookOpen, FiTarget,
//   FiCheckCircle, FiShield, FiAward, FiTrendingUp, FiGlobe,
//   FiPlay, FiMapPin, FiCalendar, FiChevronRight, FiMail,
//   FiPhone, FiInstagram, FiFacebook, FiTwitter
// } from "react-icons/fi";
// import { useContent } from "../context/ContentContext";
// import { useEffect, useState, useRef } from "react";
// import api from "../utils/api";
// import Counter from "../components/Counter";
// import ImpactCalculator from "../components/ImpactCalculator";
// import FAQAccordion from "../components/FAQAccordion";

// const programs = [
//   {
//     icon: FiBookOpen,
//     title: "Education Support",
//     desc: "Scholarships, free tuition centers, books and stationery for underprivileged children.",
//     color: "bg-marigold/15 text-marigold",
//     bg: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     icon: FiHeart,
//     title: "Healthcare Camps",
//     desc: "Free health checkups, vaccination drives and nutrition support in rural schools.",
//     color: "bg-terracotta/15 text-terracotta",
//     bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     icon: FiUsers,
//     title: "Women Empowerment",
//     desc: "Skill training, employment assistance and legal awareness sessions for women.",
//     color: "bg-leaf/15 text-leaf",
//     bg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
//   },
//   {
//     icon: FiTarget,
//     title: "Child Welfare",
//     desc: "Sponsorship programs, education tracking and direct support for vulnerable children.",
//     color: "bg-white/10 text-ink",
//     bg: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
//   },
// ];

// const trustBadges = [
//   { icon: FiShield, title: "80G Tax Exempt", desc: "Registered NGO with full transparency and audited financials." },
//   { icon: FiTrendingUp, title: "100% Fund Utilization", desc: "Every rupee donated goes directly to program delivery." },
//   { icon: FiAward, title: "12+ Years of Trust", desc: "A track record of measurable impact since 2014." },
//   { icon: FiGlobe, title: "28 Partner Schools", desc: "Working hand-in-hand with local schools and communities." },
// ];

// const partners = [
//   "United Way India", "Teach For India", "Rotary Club Khandwa",
//   "GiveIndia", "Akshaya Patra", "CRY Foundation",
// ];

// const teamMembers = [
//   {
//     name: "Priya Sharma",
//     role: "Founder & Director",
//     img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop",
//     quote: "Education is the most powerful weapon we can give our children.",
//   },
//   {
//     name: "Rahul Gupta",
//     role: "Program Head",
//     img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
//     quote: "Every child's smile is proof that our work matters.",
//   },
//   {
//     name: "Ananya Verma",
//     role: "Community Lead",
//     img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
//     quote: "Change starts from within the community itself.",
//   },
// ];

// const impactStories = [
//   {
//     name: "Ravi, Age 14",
//     location: "Khandwa, MP",
//     story: "From working in fields to topping his district exams — Ravi's scholarship changed his family's future.",
//     img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop",
//     tag: "Education",
//   },
//   {
//     name: "Sunita Bai",
//     location: "Burhanpur, MP",
//     story: "After our skill training, Sunita now runs her own tailoring unit and employs 3 other women.",
//     img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop",
//     tag: "Women Empowerment",
//   },
//   {
//     name: "Govt. School #42",
//     location: "Harda, MP",
//     story: "Our library project transformed this school's dropout rate from 40% to under 5% in 2 years.",
//     img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop",
//     tag: "Community",
//   },
// ];

// // Scroll reveal hook
// function useScrollReveal() {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisible(true); },
//       { threshold: 0.12 }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, visible];
// }

// function RevealSection({ children, className = "", delay = 0 }) {
//   const [ref, visible] = useScrollReveal();
//   return (
//     <div
//       ref={ref}
//       className={className}
//       style={{
//         opacity: visible ? 1 : 0,
//         transform: visible ? "translateY(0)" : "translateY(40px)",
//         transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
//       }}
//     >
//       {children}
//     </div>
//   );
// }

// export default function Home() {
//   const { content } = useContent();
//   const [campaigns, setCampaigns] = useState([]);
//   const [testimonials, setTestimonials] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [videoOpen, setVideoOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(false);

//   useEffect(() => {
//     api.get("/campaigns?active=true").then((r) => setCampaigns(r.data.slice(0, 1))).catch(() => {});
//     api.get("/testimonials").then((r) => setTestimonials(r.data.slice(0, 3))).catch(() => {});
//     api.get("/events?type=upcoming").then((r) => setEvents(r.data.slice(0, 3))).catch(() => {});
//   }, []);

//   const campaign = campaigns[0];
//   const progressPct = campaign
//     ? Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100))
//     : 0;

//   return (
//     <div>
//       {/* ===== HERO — full-bleed background image with overlay ===== */}
//       <section className="relative min-h-screen flex items-center overflow-hidden">
//         {/* BG Image */}
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1600&auto=format&fit=crop"
//             alt="Children in classroom"
//             className="w-full h-full object-cover scale-105"
//             style={{ transform: "scale(1.07)", transition: "transform 8s ease" }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/20"></div>
//           <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent"></div>
//         </div>

//         {/* Floating orbs */}
//         <div className="absolute -right-32 top-20 w-96 h-96 rounded-full bg-marigold/20 blur-3xl float-blob pointer-events-none"></div>
//         <div className="absolute left-1/2 bottom-0 w-72 h-72 rounded-full bg-leaf/10 blur-3xl float-blob pointer-events-none" style={{ animationDelay: "3s" }}></div>

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
//           {/* Left */}
//           <div className="animate-fade-up">
//             <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
//               <span className="w-8 h-px bg-marigold inline-block"></span>
//               Bright Futures Foundation
//             </p>
//             <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-white">
//               {content.hero_title?.split(" Education")[0] || "Empowering Children"}{" "}
//               <span className="text-marigold marker-underline">Through Education</span>
//             </h1>
//             <p className="mt-6 text-white/75 text-base md:text-lg max-w-xl leading-relaxed">
//               {content.hero_subtitle || "We believe every child deserves a chance to learn, grow, and dream — regardless of where they were born."}
//             </p>

//             {/* Quick stats inline */}
//             <div className="mt-6 flex gap-6 flex-wrap">
//               {[
//                 { val: "12K+", label: "Children" },
//                 { val: "28", label: "Schools" },
//                 { val: "₹2Cr+", label: "Donated" },
//               ].map((s, i) => (
//                 <div key={i} className="text-center">
//                   <p className="font-display font-bold text-2xl text-marigold">{s.val}</p>
//                   <p className="text-xs text-white/60">{s.label}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 flex flex-wrap gap-4">
//               <Link
//                 to="/donate"
//                 className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-7 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/40 transition-all glow-ring"
//               >
//                 <FiHeart /> Donate Now
//               </Link>
//               <Link
//                 to="/volunteer"
//                 className="flex items-center gap-2 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:border-marigold/70 hover:bg-white/5 transition-colors backdrop-blur-sm"
//               >
//                 Become a Volunteer <FiArrowRight />
//               </Link>
//               {/* Watch video button */}
//               <button
//                 onClick={() => setVideoOpen(true)}
//                 className="flex items-center gap-2 text-white/80 font-medium hover:text-marigold transition-colors"
//               >
//                 <span className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center hover:border-marigold transition-colors">
//                   <FiPlay size={14} />
//                 </span>
//                 Watch Our Story
//               </button>
//             </div>
//           </div>

//           {/* Right — floating card stack */}
//           <div className="relative hidden lg:flex justify-end animate-fade-up" style={{ animationDelay: "0.2s" }}>
//             <div className="relative w-80">
//               {/* Main card */}
//               <div className="glass rounded-card p-6 backdrop-blur-md border border-white/20 shadow-2xl">
//                 <p className="text-white/60 text-xs uppercase tracking-widest mb-3">Latest Campaign</p>
//                 <p className="font-display font-bold text-white text-xl mb-2">
//                   {campaign?.title || "Back to School Drive 2024"}
//                 </p>
//                 <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-2">
//                   <div
//                     className="h-full bg-gradient-to-r from-marigold to-terracotta rounded-full"
//                     style={{ width: `${campaign ? progressPct : 68}%` }}
//                   ></div>
//                 </div>
//                 <div className="flex justify-between text-xs text-white/60">
//                   <span className="text-marigold font-semibold">
//                     ₹{campaign?.raisedAmount?.toLocaleString() || "1,84,000"} raised
//                   </span>
//                   <span>{campaign ? progressPct : 68}% funded</span>
//                 </div>
//                 <Link
//                   to="/donate"
//                   className="mt-4 w-full block text-center bg-white/10 hover:bg-marigold/80 text-white text-sm font-semibold py-2.5 rounded-full transition-all border border-white/20"
//                 >
//                   Support This Campaign →
//                 </Link>
//               </div>

//               {/* Floating badge — volunteers */}
//               <div className="absolute -bottom-6 -left-10 glass rounded-2xl p-4 shadow-xl border border-white/15 backdrop-blur-md">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-leaf/30 flex items-center justify-center text-leaf">
//                     <FiUsers size={16} />
//                   </div>
//                   <div>
//                     <p className="font-display font-bold text-white text-lg leading-none">320+</p>
//                     <p className="text-xs text-white/55">Active Volunteers</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs">
//           <span>Scroll</span>
//           <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-bounce"></div>
//         </div>
//       </section>

//       {/* Video Modal */}
//       {videoOpen && (
//         <div
//           className="fixed inset-0 bg-ink/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setVideoOpen(false)}
//         >
//           <div className="glass rounded-card p-4 w-full max-w-3xl aspect-video flex items-center justify-center text-slate" onClick={(e) => e.stopPropagation()}>
//             <div className="text-center">
//               <FiPlay size={48} className="mx-auto mb-4 text-marigold" />
//               <p className="text-ink">Video player — embed your YouTube/Vimeo link here</p>
//               <button onClick={() => setVideoOpen(false)} className="mt-4 text-slate hover:text-marigold text-sm">✕ Close</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ===== STATS BAR ===== */}
//       <section className="border-y border-white/5 bg-white/[0.02]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//           {[
//             { value: content.stat_beneficiaries, label: "Children Educated", suffix: "+" },
//             { value: content.stat_volunteers, label: "Active Volunteers", suffix: "+" },
//             { value: content.stat_schools, label: "Partner Schools", suffix: "" },
//             { value: content.stat_years, label: "Years of Impact", suffix: "+" },
//           ].map((s, i) => (
//             <RevealSection key={i} delay={i * 0.1}>
//               <p className="font-display font-bold text-3xl md:text-4xl text-ink">
//                 <Counter value={s.value} suffix={s.suffix} />
//               </p>
//               <p className="text-sm text-slate mt-1">{s.label}</p>
//             </RevealSection>
//           ))}
//         </div>
//       </section>

//       {/* ===== TRUST BADGES ===== */}
//       <RevealSection className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {trustBadges.map((b, i) => (
//             <RevealSection key={i} delay={i * 0.08}>
//               <div className="glass rounded-card p-6 text-center hover-lift h-full">
//                 <div className="w-12 h-12 rounded-2xl bg-marigold/15 text-marigold flex items-center justify-center mx-auto mb-3">
//                   <b.icon size={20} />
//                 </div>
//                 <h3 className="font-display font-bold text-base mb-1 text-ink">{b.title}</h3>
//                 <p className="text-xs text-slate leading-relaxed">{b.desc}</p>
//               </div>
//             </RevealSection>
//           ))}
//         </div>
//       </RevealSection>

//       {/* ===== MISSION & VISION — with background ===== */}
//       <section className="relative py-24 overflow-hidden">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
//             alt="Mission background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm"></div>
//         </div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10">
//           {[
//             { icon: FiTarget, color: "text-leaf bg-leaf/15", title: "Our Mission", key: "mission" },
//             { icon: FiCheckCircle, color: "text-marigold bg-marigold/15", title: "Our Vision", key: "vision" },
//           ].map((item, i) => (
//             <RevealSection key={i} delay={i * 0.15}>
//               <div className="glass rounded-card p-8 hover-lift h-full border border-white/10">
//                 <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${item.color}`}>
//                   <item.icon size={22} />
//                 </div>
//                 <h3 className="font-display font-bold text-2xl mb-3 text-white">{item.title}</h3>
//                 <p className="text-white/70 leading-relaxed">{content[item.key] || "Placeholder text for this section."}</p>
//               </div>
//             </RevealSection>
//           ))}
//         </div>
//       </section>

//       {/* ===== PROGRAMS — with image cards ===== */}
//       <section className="py-24 bg-white/[0.015]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <RevealSection className="text-center max-w-2xl mx-auto mb-14">
//             <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">What We Do</p>
//             <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Our Core Programs</h2>
//           </RevealSection>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {programs.map((p, i) => (
//               <RevealSection key={i} delay={i * 0.1}>
//                 <div className="group relative rounded-card overflow-hidden hover-lift cursor-pointer h-72">
//                   <img
//                     src={p.bg}
//                     alt={p.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"></div>
//                   <div className="absolute bottom-0 left-0 right-0 p-5">
//                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${p.color}`}>
//                       <p.icon size={18} />
//                     </div>
//                     <h3 className="font-display font-bold text-white text-lg mb-1">{p.title}</h3>
//                     <p className="text-white/70 text-sm leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
//                       {p.desc}
//                     </p>
//                   </div>
//                 </div>
//               </RevealSection>
//             ))}
//           </div>

//           <RevealSection className="text-center mt-12">
//             <Link
//               to="/programs"
//               className="inline-flex items-center gap-2 text-ink font-semibold hover:text-marigold transition-colors"
//             >
//               View All Programs <FiArrowRight />
//             </Link>
//           </RevealSection>
//         </div>
//       </section>

//       {/* ===== IMPACT STORIES ===== */}
//       <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <RevealSection className="text-center max-w-2xl mx-auto mb-14">
//           <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">Real Lives, Real Change</p>
//           <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Stories of Impact</h2>
//         </RevealSection>

//         <div className="grid md:grid-cols-3 gap-8">
//           {impactStories.map((story, i) => (
//             <RevealSection key={i} delay={i * 0.1}>
//               <div className="group glass rounded-card overflow-hidden hover-lift h-full flex flex-col">
//                 <div className="relative h-52 overflow-hidden">
//                   <img
//                     src={story.img}
//                     alt={story.name}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//                   />
//                   <span className="absolute top-3 left-3 bg-marigold text-white text-xs font-semibold px-3 py-1 rounded-full">
//                     {story.tag}
//                   </span>
//                 </div>
//                 <div className="p-6 flex flex-col flex-1">
//                   <p className="text-slate leading-relaxed flex-1 italic mb-4">"{story.story}"</p>
//                   <div className="border-t border-white/5 pt-4">
//                     <p className="font-display font-bold text-ink">{story.name}</p>
//                     <p className="text-xs text-slate flex items-center gap-1 mt-1">
//                       <FiMapPin size={11} /> {story.location}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </RevealSection>
//           ))}
//         </div>
//       </section>

//       {/* ===== LIVE DONATION TRACKER ===== */}
//       {campaign && (
//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
//           <RevealSection>
//             <div className="glass rounded-card overflow-hidden grid md:grid-cols-2 relative">
//               <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-marigold/20 blur-3xl pointer-events-none"></div>
//               <div className="p-8 md:p-12 relative">
//                 <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-3">Active Campaign</p>
//                 <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 text-ink">{campaign.title}</h3>
//                 <p className="text-slate mb-6 leading-relaxed">{campaign.description}</p>
//                 <div className="mb-2 flex justify-between text-sm">
//                   <span className="text-marigold font-semibold">₹{campaign.raisedAmount?.toLocaleString()} raised</span>
//                   <span className="text-slate">of ₹{campaign.targetAmount?.toLocaleString()}</span>
//                 </div>
//                 <div className="h-3 rounded-full bg-white/5 overflow-hidden">
//                   <div
//                     className="h-full bg-gradient-to-r from-marigold to-terracotta rounded-full transition-all duration-1000"
//                     style={{ width: `${progressPct}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-xs text-slate mt-2">{progressPct}% of goal achieved</p>
//                 <Link
//                   to="/donate"
//                   className="inline-flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-7 py-3 rounded-full mt-6 hover:shadow-lg hover:shadow-marigold/30 transition-all"
//                 >
//                   <FiHeart /> Contribute Now
//                 </Link>
//               </div>
//               <div className="hidden md:block relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1497375638960-ca80c8c1d3a6?q=80&w=1200&auto=format&fit=crop"
//                   alt="Campaign"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ink/20"></div>
//               </div>
//             </div>
//           </RevealSection>
//         </section>
//       )}

//       {/* ===== IMPACT CALCULATOR ===== */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <ImpactCalculator />
//       </section>

//       {/* ===== MEET THE TEAM ===== */}
//       <section className="py-24 bg-white/[0.015]">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <RevealSection className="text-center max-w-2xl mx-auto mb-14">
//             <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">The People Behind the Work</p>
//             <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Meet Our Team</h2>
//           </RevealSection>

//           <div className="grid md:grid-cols-3 gap-8">
//             {teamMembers.map((member, i) => (
//               <RevealSection key={i} delay={i * 0.12}>
//                 <div className="glass rounded-card overflow-hidden hover-lift text-center group">
//                   <div className="relative h-64 overflow-hidden">
//                     <img
//                       src={member.img}
//                       alt={member.name}
//                       className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"></div>
//                   </div>
//                   <div className="p-6">
//                     <h3 className="font-display font-bold text-xl text-ink">{member.name}</h3>
//                     <p className="text-marigold text-sm font-medium mb-3">{member.role}</p>
//                     <p className="text-slate text-sm italic">"{member.quote}"</p>
//                   </div>
//                 </div>
//               </RevealSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== UPCOMING EVENTS ===== */}
//       {events.length > 0 && (
//         <section className="py-24">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <RevealSection className="flex items-end justify-between mb-12 flex-wrap gap-4">
//               <div>
//                 <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">Get Involved</p>
//                 <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Upcoming Events</h2>
//               </div>
//               <Link to="/events" className="text-ink font-semibold hover:text-marigold flex items-center gap-2">
//                 View All <FiArrowRight />
//               </Link>
//             </RevealSection>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {events.map((e, i) => (
//                 <RevealSection key={e._id} delay={i * 0.1}>
//                   <div className="glass rounded-card overflow-hidden hover-lift group">
//                     <div className="relative h-44 overflow-hidden">
//                       <img
//                         src={e.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop"}
//                         alt={e.title}
//                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                       />
//                       <div className="absolute top-3 left-3 glass rounded-lg px-3 py-1.5 backdrop-blur-md border border-white/15">
//                         <p className="text-xs font-bold text-marigold flex items-center gap-1">
//                           <FiCalendar size={10} />
//                           {new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="p-5">
//                       <h3 className="font-display font-bold text-lg mt-1 mb-2 text-ink">{e.title}</h3>
//                       <p className="text-sm text-slate line-clamp-2">{e.description}</p>
//                       <Link
//                         to="/events"
//                         className="mt-3 text-marigold text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
//                       >
//                         Learn More <FiChevronRight size={14} />
//                       </Link>
//                     </div>
//                   </div>
//                 </RevealSection>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ===== TESTIMONIALS ===== */}
//       {testimonials.length > 0 && (
//         <section className="relative py-24 overflow-hidden">
//           <div className="absolute inset-0">
//             <img
//               src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=1600&auto=format&fit=crop"
//               alt="Background"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-ink/85 backdrop-blur-sm"></div>
//           </div>
//           <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <RevealSection className="text-center max-w-2xl mx-auto mb-14">
//               <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">Voices</p>
//               <h2 className="font-display font-bold text-3xl md:text-4xl text-white">What People Say</h2>
//             </RevealSection>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {testimonials.map((t, i) => (
//                 <RevealSection key={t._id} delay={i * 0.1}>
//                   <div className="glass rounded-card p-6 hover-lift border border-white/10 h-full flex flex-col">
//                     <div className="flex gap-1 text-marigold mb-3">
//                       {Array.from({ length: t.rating }).map((_, i) => (
//                         <FiHeart key={i} className="fill-marigold" size={14} />
//                       ))}
//                     </div>
//                     <p className="text-white/75 leading-relaxed flex-1 italic mb-4">"{t.message}"</p>
//                     <div className="flex items-center gap-3 border-t border-white/10 pt-4">
//                       <div className="w-9 h-9 rounded-full bg-marigold/20 flex items-center justify-center text-marigold font-bold text-sm">
//                         {t.name?.[0]}
//                       </div>
//                       <div>
//                         <p className="font-semibold text-white text-sm">{t.name}</p>
//                         <p className="text-xs text-white/50 capitalize">{t.role}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </RevealSection>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* ===== PARTNERS MARQUEE ===== */}
//       <section className="py-12 border-y border-white/5 bg-white/[0.015] overflow-hidden">
//         <p className="text-center text-xs uppercase tracking-widest text-slate mb-6">
//           Trusted by &amp; Partnered with
//         </p>
//         <div className="relative flex overflow-x-hidden">
//           <div className="flex gap-12 animate-marquee whitespace-nowrap">
//             {[...partners, ...partners].map((p, i) => (
//               <span key={i} className="font-display font-semibold text-lg text-ink-light/50 hover:text-marigold transition-colors cursor-default">
//                 {p}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== FAQ ===== */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//         <RevealSection className="text-center max-w-2xl mx-auto mb-14">
//           <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">Have Questions?</p>
//           <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Frequently Asked Questions</h2>
//         </RevealSection>
//         <FAQAccordion />
//       </section>

//       {/* ===== NEWSLETTER SIGNUP ===== */}
//       <section className="py-16 bg-white/[0.015] border-y border-white/5">
//         <div className="max-w-2xl mx-auto px-4 text-center">
//           <RevealSection>
//             <FiMail size={32} className="mx-auto mb-4 text-marigold" />
//             <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-2">Stay in the Loop</h2>
//             <p className="text-slate mb-6 text-sm">Monthly updates on our campaigns, events, and impact — no spam, ever.</p>
//             {subscribed ? (
//               <div className="inline-flex items-center gap-2 bg-leaf/20 text-leaf px-6 py-3 rounded-full font-semibold">
//                 <FiCheckCircle /> Thank you! You're subscribed.
//               </div>
//             ) : (
//               <div className="flex gap-3 max-w-md mx-auto">
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="your@email.com"
//                   className="flex-1 glass rounded-full px-5 py-3 text-sm text-ink placeholder:text-slate border border-white/10 focus:outline-none focus:border-marigold/50 transition-colors bg-transparent"
//                 />
//                 <button
//                   onClick={() => { if (email) setSubscribed(true); }}
//                   className="bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all whitespace-nowrap"
//                 >
//                   Subscribe
//                 </button>
//               </div>
//             )}
//           </RevealSection>
//         </div>
//       </section>

//       {/* ===== FINAL CTA — with parallax bg ===== */}
//       <section className="relative py-28 overflow-hidden">
//         <div className="absolute inset-0">
//           <img
//             src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop"
//             alt="CTA background"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/75 to-marigold/30"></div>
//         </div>

//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <RevealSection>
//             <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-3">Make a Difference Today</p>
//             <h2 className="font-display font-bold text-3xl md:text-5xl mb-4 text-white leading-tight">
//               Every Child Deserves<br />a Chance to Learn
//             </h2>
//             <p className="text-white/70 mb-10 max-w-xl mx-auto text-base leading-relaxed">
//               Your support — big or small — helps us bring books, teachers, and hope to children who need it most.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <Link
//                 to="/donate"
//                 className="bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-10 py-4 rounded-full hover:shadow-xl hover:shadow-marigold/40 transition-all glow-ring text-base"
//               >
//                 Donate Now
//               </Link>
//               <Link
//                 to="/volunteer"
//                 className="border border-white/40 text-white font-semibold px-10 py-4 rounded-full hover:border-marigold/70 hover:bg-white/5 transition-colors text-base backdrop-blur-sm"
//               >
//                 Join as Volunteer
//               </Link>
//             </div>

//             {/* Social links */}
//             <div className="flex justify-center gap-5 mt-12">
//               {[
//                 { icon: FiInstagram, label: "Instagram" },
//                 { icon: FiFacebook, label: "Facebook" },
//                 { icon: FiTwitter, label: "Twitter" },
//                 { icon: FiPhone, label: "Contact" },
//               ].map((s, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   aria-label={s.label}
//                   className="w-10 h-10 rounded-full border border-white/25 flex items-center justify-center text-white/60 hover:border-marigold hover:text-marigold transition-colors"
//                 >
//                   <s.icon size={16} />
//                 </a>
//               ))}
//             </div>
//           </RevealSection>
//         </div>
//       </section>
//     </div>
//   );
// }


import { Link } from "react-router-dom";
import {
  FiArrowRight, FiHeart, FiUsers, FiBookOpen, FiTarget,
  FiCheckCircle, FiShield, FiAward, FiTrendingUp, FiGlobe,
  FiPlay, FiMapPin, FiCalendar, FiChevronRight, FiMail,
  FiPhone, FiInstagram, FiFacebook, FiTwitter, FiStar
} from "react-icons/fi";
import { useContent } from "../context/ContentContext";
import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import Counter from "../components/Counter";
import ImpactCalculator from "../components/ImpactCalculator";
import FAQAccordion from "../components/FAQAccordion";

/* ─── DATA ─────────────────────────────────────────────────────── */
const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1800&auto=format&fit=crop",
    tag: "Education",
    headline: "Lighting the Path\nFor Every Child",
    sub: "We bring books, mentors, and hope to children who need it most — across 28 schools in Madhya Pradesh.",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop",
    tag: "Healthcare",
    headline: "Healthy Children,\nBrighter Futures",
    sub: "Free medical camps, nutrition drives, and vaccination support reaching 12,000+ children every year.",
  },
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1800&auto=format&fit=crop",
    tag: "Empowerment",
    headline: "Women Rising,\nCommunities Thriving",
    sub: "Skill training, employment links, and legal awareness giving women the tools to lead.",
  },
];

const programs = [
  { icon: FiBookOpen, title: "Education Support", desc: "Scholarships, free tuition centers, books and stationery for underprivileged children.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" },
  { icon: FiHeart,    title: "Healthcare Camps",  desc: "Free health checkups, vaccination drives and nutrition support in rural schools.",      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" },
  { icon: FiUsers,    title: "Women Empowerment", desc: "Skill training, employment assistance and legal awareness sessions for women.",          img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
  { icon: FiTarget,   title: "Child Welfare",     desc: "Sponsorship programs, education tracking and direct support for vulnerable children.",    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" },
];

const trustBadges = [
  { icon: FiShield,     title: "80G Tax Exempt",        desc: "Registered NGO with full transparency and audited financials." },
  { icon: FiTrendingUp, title: "100% Fund Utilization", desc: "Every rupee donated goes directly to program delivery." },
  { icon: FiAward,      title: "12+ Years of Trust",    desc: "A track record of measurable impact since 2014." },
  { icon: FiGlobe,      title: "28 Partner Schools",    desc: "Working hand-in-hand with local schools and communities." },
];

const impactStories = [
  { name: "Ravi, Age 14",    location: "Khandwa, MP",   tag: "Education",         story: "From working in fields to topping his district exams — Ravi's scholarship changed his family's future.",           img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop" },
  { name: "Sunita Bai",      location: "Burhanpur, MP", tag: "Women Empowerment", story: "After our skill training, Sunita now runs her own tailoring unit and employs 3 other women in her village.",       img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop" },
  { name: "Govt. School #42",location: "Harda, MP",     tag: "Community",         story: "Our library project transformed this school's dropout rate from 40% to under 5% in just two years.",              img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop" },
];

const teamMembers = [
  { name: "Priya Sharma", role: "Founder & Director", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop", quote: "Education is the most powerful weapon we can give our children." },
  { name: "Rahul Gupta",  role: "Program Head",       img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", quote: "Every child's smile is proof that our work matters." },
  { name: "Ananya Verma", role: "Community Lead",     img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", quote: "Change starts from within the community itself." },
];

const partners = ["United Way India","Teach For India","Rotary Club Khandwa","GiveIndia","Akshaya Patra","CRY Foundation"];

/* ─── PALETTE ─────────────────────────────────────────────────── */
const C = {
  bg:      "#0b0f1a",
  navy:    "#0d1120",
  gold:    "#f5c842",
  goldDim: "rgba(245,200,66,0.35)",
  text:    "#e8e0d0",
  muted:   "rgba(232,224,208,0.55)",
  card:    { background:"rgba(255,255,255,0.035)", border:"1px solid rgba(245,200,66,0.10)", borderRadius:"16px" },
};

/* ─── HELPERS ──────────────────────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {}, className = "" }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(32px)",
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}>{children}</div>
  );
}

function GoldDivider() {
  return <div style={{ height:1, background:"linear-gradient(to right,transparent,rgba(245,200,66,0.45),transparent)" }} />;
}

function Eyebrow({ children }) {
  return (
    <p style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"12px", color:C.gold, fontWeight:700, fontSize:"11px", letterSpacing:"0.22em", textTransform:"uppercase", marginBottom:"12px" }}>
      <span style={{ width:24, height:1, background:C.goldDim, display:"inline-block" }}/>
      {children}
      <span style={{ width:24, height:1, background:C.goldDim, display:"inline-block" }}/>
    </p>
  );
}

/* ─── MAIN COMPONENT ───────────────────────────────────────────── */
export default function Home() {
  const { content } = useContent();
  const [campaigns, setCampaigns]       = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [events, setEvents]             = useState([]);
  const [slide, setSlide]               = useState(0);
  const [videoOpen, setVideoOpen]       = useState(false);
  const [email, setEmail]               = useState("");
  const [subscribed, setSubscribed]     = useState(false);
  const [hoveredProgram, setHoveredProgram] = useState(null);

  useEffect(() => {
    api.get("/campaigns?active=true").then(r => setCampaigns(r.data.slice(0,1))).catch(()=>{});
    api.get("/testimonials").then(r => setTestimonials(r.data.slice(0,3))).catch(()=>{});
    api.get("/events?type=upcoming").then(r => setEvents(r.data.slice(0,3))).catch(()=>{});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const campaign    = campaigns[0];
  const progressPct = campaign ? Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)) : 0;
  const cur         = heroSlides[slide];

  return (
    <div style={{ background:C.bg, color:C.text, fontFamily:"inherit" }}>

      {/* ══════════════════════════════════════════
          HERO — cinematic slideshow
      ══════════════════════════════════════════ */}
      <section style={{ position:"relative", height:"100vh", minHeight:640, overflow:"hidden" }}>

        {/* Slides */}
        {heroSlides.map((s,i) => (
          <div key={i} style={{ position:"absolute", inset:0, opacity:i===slide?1:0, transition:"opacity 1.3s ease", pointerEvents:"none" }}>
            <img src={s.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(8,12,24,0.93) 0%,rgba(8,12,24,0.60) 55%,rgba(8,12,24,0.20) 100%)" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(8,12,24,0.65) 0%,transparent 50%)" }}/>
          </div>
        ))}

        {/* Dot grid texture */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle,rgba(245,200,66,0.045) 1px,transparent 1px)", backgroundSize:"40px 40px", pointerEvents:"none" }}/>

        {/* Content */}
        <div style={{ position:"relative", height:"100%", maxWidth:1280, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center" }}>
          <div style={{ maxWidth:620 }}>
            <div key={slide} style={{ animation:"fadeUp 0.85s ease forwards" }}>
              <span style={{ background:"rgba(245,200,66,0.15)", color:C.gold, border:"1px solid rgba(245,200,66,0.3)", borderRadius:100, padding:"4px 14px", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>
                {cur.tag}
              </span>
              <h1 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(2.5rem,5.5vw,4rem)", lineHeight:1.13, color:"#fff", margin:"22px 0 18px", whiteSpace:"pre-line", letterSpacing:"-0.015em" }}>
                {cur.headline}
              </h1>
              <p style={{ color:C.muted, fontSize:"1.05rem", lineHeight:1.78, maxWidth:480, marginBottom:36 }}>
                {cur.sub}
              </p>
            </div>

            <div style={{ display:"flex", flexWrap:"wrap", gap:14, alignItems:"center" }}>
              <Link to="/donate" style={{ background:"linear-gradient(135deg,#f5c842,#e8a820)", color:"#0b0f1a", fontWeight:700, padding:"14px 34px", borderRadius:100, textDecoration:"none", display:"flex", alignItems:"center", gap:8, fontSize:"0.95rem", boxShadow:"0 8px 32px rgba(245,200,66,0.38)" }}>
                <FiHeart size={16}/> Donate Now
              </Link>
              <Link to="/volunteer" style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.22)", color:"#fff", fontWeight:600, padding:"13px 28px", borderRadius:100, textDecoration:"none", display:"flex", alignItems:"center", gap:8, backdropFilter:"blur(8px)" }}>
                Volunteer <FiArrowRight size={15}/>
              </Link>
              <button onClick={()=>setVideoOpen(true)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,0.65)", fontWeight:500, fontSize:"0.9rem" }}>
                <span style={{ width:44, height:44, borderRadius:"50%", border:"1.5px solid rgba(245,200,66,0.55)", display:"flex", alignItems:"center", justifyContent:"center", color:C.gold }}>
                  <FiPlay size={14}/>
                </span>
                Watch Our Story
              </button>
            </div>

            {/* Inline quick stats */}
            <div style={{ display:"flex", gap:32, marginTop:48, paddingTop:32, borderTop:"1px solid rgba(245,200,66,0.15)" }}>
              {[{v:"12,000+",l:"Children"},{v:"₹2Cr+",l:"Donated"},{v:"28",l:"Schools"}].map((s,i)=>(
                <div key={i}>
                  <p style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"1.5rem", color:C.gold, lineHeight:1 }}>{s.v}</p>
                  <p style={{ color:C.muted, fontSize:"0.72rem", marginTop:5, letterSpacing:"0.07em", textTransform:"uppercase" }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", gap:10 }}>
          {heroSlides.map((_,i)=>(
            <button key={i} onClick={()=>setSlide(i)} style={{ width:i===slide?28:8, height:8, borderRadius:100, background:i===slide?C.gold:"rgba(255,255,255,0.25)", border:"none", cursor:"pointer", transition:"all 0.4s", padding:0 }}/>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute", bottom:32, right:40, display:"flex", flexDirection:"column", alignItems:"center", gap:8, color:"rgba(255,255,255,0.28)", fontSize:10, letterSpacing:"0.15em", textTransform:"uppercase" }}>
          <span>Scroll</span>
          <div style={{ width:1, height:36, background:`linear-gradient(to bottom,${C.goldDim},transparent)`, animation:"pulse 2s infinite" }}/>
        </div>
      </section>

      {/* Video modal */}
      {videoOpen && (
        <div onClick={()=>setVideoOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:C.navy, border:"1px solid rgba(245,200,66,0.2)", borderRadius:16, padding:40, maxWidth:680, width:"100%", aspectRatio:"16/9", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:16 }}>
            <FiPlay size={48} style={{ color:C.gold }}/>
            <p style={{ color:C.muted, fontSize:"0.88rem" }}>Embed your YouTube / Vimeo URL here</p>
            <button onClick={()=>setVideoOpen(false)} style={{ background:"none", border:`1px solid ${C.goldDim}`, color:C.gold, padding:"8px 24px", borderRadius:100, cursor:"pointer", fontSize:"0.85rem" }}>✕ Close</button>
          </div>
        </div>
      )}

      {/* ══════ STATS BAR ══════ */}
      <section style={{ background:C.navy, borderTop:`1px solid rgba(245,200,66,0.1)`, borderBottom:`1px solid rgba(245,200,66,0.1)` }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"48px 24px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:32, textAlign:"center" }}>
          {[
            { value:content.stat_beneficiaries, label:"Children Educated", suffix:"+" },
            { value:content.stat_volunteers,    label:"Active Volunteers", suffix:"+" },
            { value:content.stat_schools,       label:"Partner Schools",   suffix:"" },
            { value:content.stat_years,         label:"Years of Impact",   suffix:"+" },
          ].map((s,i)=>(
            <Reveal key={i} delay={i*0.1}>
              <p style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"2.5rem", color:C.gold, lineHeight:1 }}>
                <Counter value={s.value} suffix={s.suffix}/>
              </p>
              <p style={{ color:C.muted, fontSize:"0.75rem", marginTop:8, letterSpacing:"0.08em", textTransform:"uppercase" }}>{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <GoldDivider/>

      {/* ══════ TRUST BADGES ══════ */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"80px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))", gap:20 }}>
          {trustBadges.map((b,i)=>(
            <Reveal key={i} delay={i*0.09}>
              <div style={{ ...C.card, padding:"28px 22px", textAlign:"center", transition:"all 0.3s", cursor:"default" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(245,200,66,0.06)";e.currentTarget.style.border="1px solid rgba(245,200,66,0.3)";e.currentTarget.style.transform="translateY(-4px)"}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.card.background;e.currentTarget.style.border=C.card.border;e.currentTarget.style.transform="none"}}>
                <div style={{ width:48, height:48, borderRadius:14, background:"rgba(245,200,66,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px", color:C.gold }}>
                  <b.icon size={20}/>
                </div>
                <h3 style={{ fontWeight:700, fontSize:"0.95rem", color:C.text, marginBottom:6 }}>{b.title}</h3>
                <p style={{ color:C.muted, fontSize:"0.8rem", lineHeight:1.65 }}>{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <GoldDivider/>

      {/* ══════ MISSION & VISION ══════ */}
      <section style={{ position:"relative", padding:"96px 0", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.22) saturate(0.4)" }}/>
          <div style={{ position:"absolute", inset:0, background:"rgba(8,12,24,0.78)" }}/>
        </div>
        <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <Eyebrow>Who We Are</Eyebrow>
              <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:"#fff", letterSpacing:"-0.01em" }}>
                Purpose. Principle. <span style={{ color:C.gold }}>Progress.</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
            {[
              { icon:FiTarget,      iconColor:"#4ade80", title:"Our Mission", key:"mission" },
              { icon:FiCheckCircle, iconColor:C.gold,    title:"Our Vision",  key:"vision" },
            ].map((item,i)=>(
              <Reveal key={i} delay={i*0.15}>
                <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, padding:36, backdropFilter:"blur(10px)" }}>
                  <div style={{ width:48, height:48, borderRadius:14, background:`${item.iconColor}20`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, color:item.iconColor }}>
                    <item.icon size={22}/>
                  </div>
                  <h3 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"1.4rem", color:"#fff", marginBottom:12 }}>{item.title}</h3>
                  <p style={{ color:"rgba(232,224,208,0.65)", lineHeight:1.82, fontSize:"0.95rem" }}>{content[item.key] || "Add your content from the admin panel."}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider/>

      {/* ══════ PROGRAMS ══════ */}
      <section style={{ background:C.navy, padding:"96px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <Eyebrow>What We Do</Eyebrow>
              <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:C.text }}>Our Core Programs</h2>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
            {programs.map((p,i)=>(
              <Reveal key={i} delay={i*0.1}>
                <div
                  onMouseEnter={()=>setHoveredProgram(i)}
                  onMouseLeave={()=>setHoveredProgram(null)}
                  style={{ position:"relative", borderRadius:16, overflow:"hidden", height:320, cursor:"pointer", transition:"transform 0.35s ease", transform:hoveredProgram===i?"translateY(-6px)":"none" }}>
                  <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.55s ease", transform:hoveredProgram===i?"scale(1.09)":"scale(1)" }}/>
                  {/* Gold top accent */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(to right,${C.gold},#e8a820)`, opacity:hoveredProgram===i?1:0, transition:"opacity 0.3s" }}/>
                  <div style={{ position:"absolute", inset:0, background:hoveredProgram===i?"linear-gradient(to top,rgba(8,12,24,0.97) 0%,rgba(8,12,24,0.55) 60%,rgba(8,12,24,0.08) 100%)":"linear-gradient(to top,rgba(8,12,24,0.86) 0%,rgba(8,12,24,0.25) 75%,transparent 100%)", transition:"background 0.4s ease" }}/>
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:24 }}>
                    <div style={{ width:40, height:40, borderRadius:12, background:"rgba(245,200,66,0.13)", border:"1px solid rgba(245,200,66,0.3)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:12, color:C.gold }}>
                      <p.icon size={18}/>
                    </div>
                    <h3 style={{ fontWeight:700, color:"#fff", fontSize:"1.08rem", marginBottom:8 }}>{p.title}</h3>
                    <p style={{ color:"rgba(232,224,208,0.72)", fontSize:"0.84rem", lineHeight:1.68, maxHeight:hoveredProgram===i?80:0, overflow:"hidden", opacity:hoveredProgram===i?1:0, transition:"all 0.4s ease" }}>{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ textAlign:"center", marginTop:40 }}>
              <Link to="/programs" style={{ color:C.gold, fontWeight:600, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, fontSize:"0.9rem", letterSpacing:"0.04em" }}>
                View All Programs <FiArrowRight size={15}/>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <GoldDivider/>

      {/* ══════ IMPACT STORIES ══════ */}
      <section style={{ padding:"96px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <Eyebrow>Real Lives, Real Change</Eyebrow>
              <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:C.text }}>Stories of Impact</h2>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:24 }}>
            {impactStories.map((s,i)=>(
              <Reveal key={i} delay={i*0.12}>
                <div style={{ ...C.card, overflow:"hidden", transition:"all 0.3s", display:"flex", flexDirection:"column" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(245,200,66,0.055)";e.currentTarget.style.border="1px solid rgba(245,200,66,0.28)";e.currentTarget.style.transform="translateY(-4px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background=C.card.background;e.currentTarget.style.border=C.card.border;e.currentTarget.style.transform="none"}}>
                  <div style={{ position:"relative", height:200, overflow:"hidden" }}>
                    <img src={s.img} alt={s.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(8,12,24,0.55),transparent)" }}/>
                    <span style={{ position:"absolute", top:12, left:12, background:"rgba(245,200,66,0.15)", color:C.gold, border:"1px solid rgba(245,200,66,0.3)", borderRadius:100, padding:"3px 12px", fontSize:11, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>{s.tag}</span>
                  </div>
                  <div style={{ padding:24, display:"flex", flexDirection:"column", flex:1 }}>
                    <p style={{ color:C.muted, lineHeight:1.78, fontSize:"0.88rem", fontStyle:"italic", flex:1, marginBottom:20 }}>"{s.story}"</p>
                    <div style={{ borderTop:"1px solid rgba(245,200,66,0.1)", paddingTop:16 }}>
                      <p style={{ fontWeight:700, color:C.text, fontSize:"0.9rem" }}>{s.name}</p>
                      <p style={{ color:C.muted, fontSize:"0.75rem", display:"flex", alignItems:"center", gap:4, marginTop:4 }}><FiMapPin size={11}/>{s.location}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider/>

      {/* ══════ CAMPAIGN TRACKER ══════ */}
      {campaign && (
        <section style={{ background:C.navy, padding:"80px 0" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
            <Reveal>
              <div style={{ ...C.card, overflow:"hidden", display:"grid", gridTemplateColumns:"1fr 1fr", border:"1px solid rgba(245,200,66,0.18)" }}>
                <div style={{ padding:"48px" }}>
                  <span style={{ background:"rgba(245,200,66,0.13)", color:C.gold, border:"1px solid rgba(245,200,66,0.3)", borderRadius:100, padding:"4px 14px", fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>Active Campaign</span>
                  <h3 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(1.3rem,2.5vw,1.9rem)", color:C.text, margin:"18px 0 12px", lineHeight:1.3 }}>{campaign.title}</h3>
                  <p style={{ color:C.muted, lineHeight:1.78, marginBottom:28, fontSize:"0.9rem" }}>{campaign.description}</p>
                  <div style={{ marginBottom:10, display:"flex", justifyContent:"space-between", fontSize:"0.85rem" }}>
                    <span style={{ color:C.gold }}>₹{campaign.raisedAmount?.toLocaleString()} raised</span>
                    <span style={{ color:C.muted }}>of ₹{campaign.targetAmount?.toLocaleString()}</span>
                  </div>
                  <div style={{ height:8, borderRadius:100, background:"rgba(255,255,255,0.07)", overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${progressPct}%`, borderRadius:100, background:"linear-gradient(to right,#f5c842,#e8a820)", transition:"width 1.2s ease" }}/>
                  </div>
                  <p style={{ color:C.muted, fontSize:"0.75rem", marginTop:8 }}>{progressPct}% of goal achieved</p>
                  <Link to="/donate" style={{ background:"linear-gradient(135deg,#f5c842,#e8a820)", color:"#0b0f1a", fontWeight:700, padding:"13px 30px", borderRadius:100, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:8, marginTop:28, fontSize:"0.9rem" }}>
                    <FiHeart size={15}/> Contribute Now
                  </Link>
                </div>
                <div style={{ position:"relative", minHeight:300 }}>
                  <img src="https://images.unsplash.com/photo-1497375638960-ca80c8c1d3a6?q=80&w=1200&auto=format&fit=crop" alt="Campaign" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(13,17,32,0.5),transparent)" }}/>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ══════ IMPACT CALCULATOR ══════ */}
      <section style={{ padding:"80px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <ImpactCalculator />
        </div>
      </section>

      <GoldDivider/>

      {/* ══════ TEAM ══════ */}
      <section style={{ background:C.navy, padding:"96px 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <Eyebrow>The People Behind the Work</Eyebrow>
              <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:C.text }}>Meet Our Team</h2>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:24 }}>
            {teamMembers.map((m,i)=>(
              <Reveal key={i} delay={i*0.12}>
                <div style={{ ...C.card, overflow:"hidden", textAlign:"center", transition:"all 0.3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(245,200,66,0.055)";e.currentTarget.style.border="1px solid rgba(245,200,66,0.28)";e.currentTarget.style.transform="translateY(-4px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.background=C.card.background;e.currentTarget.style.border=C.card.border;e.currentTarget.style.transform="none"}}>
                  <div style={{ position:"relative", height:240, overflow:"hidden" }}>
                    <img src={m.img} alt={m.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top" }}/>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(13,17,32,0.82) 0%,transparent 60%)" }}/>
                  </div>
                  <div style={{ padding:24 }}>
                    <h3 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"1.15rem", color:C.text }}>{m.name}</h3>
                    <p style={{ color:C.gold, fontSize:"0.78rem", fontWeight:700, marginBottom:12, letterSpacing:"0.06em", textTransform:"uppercase" }}>{m.role}</p>
                    <p style={{ color:C.muted, fontSize:"0.85rem", fontStyle:"italic", lineHeight:1.68 }}>"{m.quote}"</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider/>

      {/* ══════ EVENTS ══════ */}
      {events.length > 0 && (
        <section style={{ padding:"96px 0" }}>
          <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
            <Reveal>
              <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:48, flexWrap:"wrap", gap:16 }}>
                <div>
                  <Eyebrow>Get Involved</Eyebrow>
                  <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:C.text }}>Upcoming Events</h2>
                </div>
                <Link to="/events" style={{ color:C.gold, fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", gap:6, fontSize:"0.9rem" }}>View All <FiArrowRight size={14}/></Link>
              </div>
            </Reveal>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 }}>
              {events.map((ev,i)=>(
                <Reveal key={ev._id} delay={i*0.1}>
                  <div style={{ ...C.card, overflow:"hidden", transition:"all 0.3s" }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(245,200,66,0.055)";e.currentTarget.style.border="1px solid rgba(245,200,66,0.28)";e.currentTarget.style.transform="translateY(-4px)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background=C.card.background;e.currentTarget.style.border=C.card.border;e.currentTarget.style.transform="none"}}>
                    <div style={{ position:"relative", height:176, overflow:"hidden" }}>
                      <img src={ev.image||"https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop"} alt={ev.title} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                      <div style={{ position:"absolute", top:12, left:12, background:"rgba(13,17,32,0.88)", border:"1px solid rgba(245,200,66,0.3)", borderRadius:10, padding:"6px 12px", backdropFilter:"blur(8px)" }}>
                        <p style={{ color:C.gold, fontSize:"0.75rem", fontWeight:700, display:"flex", alignItems:"center", gap:5 }}>
                          <FiCalendar size={11}/>{new Date(ev.date).toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
                        </p>
                      </div>
                    </div>
                    <div style={{ padding:20 }}>
                      <h3 style={{ fontWeight:700, color:C.text, fontSize:"1rem", marginBottom:8 }}>{ev.title}</h3>
                      <p style={{ color:C.muted, fontSize:"0.83rem", lineHeight:1.62, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{ev.description}</p>
                      <Link to="/events" style={{ display:"inline-flex", alignItems:"center", gap:5, color:C.gold, fontWeight:600, fontSize:"0.82rem", textDecoration:"none", marginTop:14 }}>
                        Learn More <FiChevronRight size={13}/>
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <GoldDivider/>

      {/* ══════ TESTIMONIALS ══════ */}
      {testimonials.length > 0 && (
        <section style={{ position:"relative", padding:"96px 0", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0 }}>
            <img src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?q=80&w=1600&auto=format&fit=crop" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.18) saturate(0.3)" }}/>
            <div style={{ position:"absolute", inset:0, background:"rgba(8,12,24,0.84)" }}/>
          </div>
          <div style={{ position:"relative", maxWidth:1280, margin:"0 auto", padding:"0 24px" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:52 }}>
                <Eyebrow>Voices</Eyebrow>
                <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:"#fff" }}>What People Say</h2>
              </div>
            </Reveal>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:24 }}>
              {testimonials.map((t,i)=>(
                <Reveal key={t._id} delay={i*0.1}>
                  <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(245,200,66,0.12)", borderRadius:16, padding:28, backdropFilter:"blur(12px)", display:"flex", flexDirection:"column", height:"100%" }}>
                    <div style={{ display:"flex", gap:4, marginBottom:16 }}>
                      {Array.from({length:t.rating}).map((_,j)=><FiStar key={j} size={14} style={{ color:C.gold, fill:C.gold }}/>)}
                    </div>
                    <p style={{ color:"rgba(232,224,208,0.7)", lineHeight:1.82, fontStyle:"italic", flex:1, marginBottom:20, fontSize:"0.9rem" }}>"{t.message}"</p>
                    <div style={{ display:"flex", alignItems:"center", gap:12, borderTop:"1px solid rgba(245,200,66,0.1)", paddingTop:16 }}>
                      <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(245,200,66,0.13)", border:`1px solid ${C.goldDim}`, display:"flex", alignItems:"center", justifyContent:"center", color:C.gold, fontWeight:700, fontSize:"0.9rem", flexShrink:0 }}>{t.name?.[0]}</div>
                      <div>
                        <p style={{ fontWeight:700, color:C.text, fontSize:"0.88rem" }}>{t.name}</p>
                        <p style={{ color:C.muted, fontSize:"0.75rem", textTransform:"capitalize", marginTop:2 }}>{t.role}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════ PARTNERS MARQUEE ══════ */}
      <section style={{ padding:"44px 0", borderTop:"1px solid rgba(245,200,66,0.08)", borderBottom:"1px solid rgba(245,200,66,0.08)", background:C.navy, overflow:"hidden" }}>
        <p style={{ textAlign:"center", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(232,224,208,0.28)", marginBottom:18 }}>Trusted by &amp; Partnered with</p>
        <div style={{ display:"flex", overflow:"hidden" }}>
          <div className="animate-marquee" style={{ display:"flex", gap:48, whiteSpace:"nowrap" }}>
            {[...partners,...partners].map((p,i)=>(
              <span key={i} style={{ fontFamily:"Georgia,serif", fontWeight:600, fontSize:"1rem", color:"rgba(245,200,66,0.32)", transition:"color 0.3s", cursor:"default" }}
                onMouseEnter={e=>{e.target.style.color=C.gold}} onMouseLeave={e=>{e.target.style.color="rgba(245,200,66,0.32)"}}>
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section style={{ padding:"96px 0" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:52 }}>
              <Eyebrow>Have Questions?</Eyebrow>
              <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", color:C.text }}>Frequently Asked Questions</h2>
            </div>
          </Reveal>
          <FAQAccordion/>
        </div>
      </section>

      <GoldDivider/>

      {/* ══════ NEWSLETTER ══════ */}
      <section style={{ background:C.navy, padding:"72px 0" }}>
        <div style={{ maxWidth:520, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <Reveal>
            <div style={{ width:48, height:48, borderRadius:14, background:"rgba(245,200,66,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", color:C.gold }}>
              <FiMail size={22}/>
            </div>
            <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"1.8rem", color:C.text, marginBottom:10 }}>Stay in the Loop</h2>
            <p style={{ color:C.muted, fontSize:"0.88rem", marginBottom:28 }}>Monthly updates on campaigns, events, and impact — no spam, ever.</p>
            {subscribed ? (
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(74,222,128,0.1)", border:"1px solid rgba(74,222,128,0.3)", color:"#4ade80", padding:"12px 24px", borderRadius:100, fontWeight:600, fontSize:"0.9rem" }}>
                <FiCheckCircle/> You're subscribed. Thank you!
              </div>
            ) : (
              <div style={{ display:"flex", gap:10 }}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                  style={{ flex:1, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(245,200,66,0.2)", borderRadius:100, padding:"13px 20px", color:C.text, fontSize:"0.9rem", outline:"none" }}
                  onFocus={e=>{e.target.style.borderColor="rgba(245,200,66,0.5)"}}
                  onBlur={e=>{e.target.style.borderColor="rgba(245,200,66,0.2)"}}/>
                <button onClick={()=>{if(email)setSubscribed(true);}} style={{ background:"linear-gradient(135deg,#f5c842,#e8a820)", color:"#0b0f1a", fontWeight:700, padding:"13px 24px", borderRadius:100, border:"none", cursor:"pointer", whiteSpace:"nowrap", fontSize:"0.9rem" }}>
                  Subscribe
                </button>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section style={{ position:"relative", padding:"120px 0", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop" alt="" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.2) saturate(0.45)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(8,12,24,0.92) 0%,rgba(25,18,5,0.78) 100%)" }}/>
          <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,200,66,0.07) 0%,transparent 70%)", pointerEvents:"none" }}/>
        </div>
        <div style={{ position:"relative", maxWidth:800, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <Reveal>
            <Eyebrow>Make a Difference Today</Eyebrow>
            <h2 style={{ fontFamily:"Georgia,serif", fontWeight:700, fontSize:"clamp(2rem,4.5vw,3.4rem)", color:"#fff", lineHeight:1.18, marginBottom:16, letterSpacing:"-0.01em" }}>
              Every Child Deserves<br/><span style={{ color:C.gold }}>a Chance to Learn</span>
            </h2>
            <p style={{ color:"rgba(232,224,208,0.6)", fontSize:"1.05rem", lineHeight:1.82, maxWidth:520, margin:"0 auto 44px" }}>
              Your support — big or small — helps us bring books, teachers, and hope to children who need it most.
            </p>
            <div style={{ display:"flex", justifyContent:"center", flexWrap:"wrap", gap:16 }}>
              <Link to="/donate" style={{ background:"linear-gradient(135deg,#f5c842,#e8a820)", color:"#0b0f1a", fontWeight:700, padding:"16px 42px", borderRadius:100, textDecoration:"none", fontSize:"1rem", boxShadow:"0 12px 40px rgba(245,200,66,0.36)", display:"inline-flex", alignItems:"center", gap:8 }}>
                <FiHeart size={17}/> Donate Now
              </Link>
              <Link to="/volunteer" style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", fontWeight:600, padding:"15px 38px", borderRadius:100, textDecoration:"none", fontSize:"1rem", backdropFilter:"blur(8px)", display:"inline-flex", alignItems:"center", gap:8 }}>
                Join as Volunteer <FiArrowRight size={16}/>
              </Link>
            </div>
            <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:52 }}>
              {[FiInstagram,FiFacebook,FiTwitter,FiPhone].map((Icon,i)=>(
                <a key={i} href="#" style={{ width:42, height:42, borderRadius:"50%", border:`1px solid ${C.goldDim}`, display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(245,200,66,0.45)", textDecoration:"none", transition:"all 0.3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold;e.currentTarget.style.background="rgba(245,200,66,0.1)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=C.goldDim;e.currentTarget.style.color="rgba(245,200,66,0.45)";e.currentTarget.style.background="transparent"}}>
                  <Icon size={16}/>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:none} }
        @keyframes pulse { 0%,100%{opacity:.35} 50%{opacity:1} }
      `}</style>
    </div>
  );
}