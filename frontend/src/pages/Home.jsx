import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiUsers, FiBookOpen, FiTarget, FiCheckCircle, FiShield, FiAward, FiTrendingUp, FiGlobe } from "react-icons/fi";
import { useContent } from "../context/ContentContext";
import { useEffect, useState } from "react";
import api from "../utils/api";
import Counter from "../components/Counter";
import ImpactCalculator from "../components/ImpactCalculator";
import FAQAccordion from "../components/FAQAccordion";

const programs = [
  {
    icon: FiBookOpen,
    title: "Education Support",
    desc: "Scholarships, free tuition centers, books and stationery for underprivileged children.",
    color: "bg-marigold/15 text-marigold",
  },
  {
    icon: FiHeart,
    title: "Healthcare Camps",
    desc: "Free health checkups, vaccination drives and nutrition support in rural schools.",
    color: "bg-terracotta/15 text-terracotta",
  },
  {
    icon: FiUsers,
    title: "Women Empowerment",
    desc: "Skill training, employment assistance and legal awareness sessions for women.",
    color: "bg-leaf/15 text-leaf",
  },
  {
    icon: FiTarget,
    title: "Child Welfare",
    desc: "Sponsorship programs, education tracking and direct support for vulnerable children.",
    color: "bg-white/10 text-ink",
  },
];

const trustBadges = [
  {
    icon: FiShield,
    title: "80G Tax Exempt",
    desc: "Registered NGO with full transparency and audited financials.",
  },
  {
    icon: FiTrendingUp,
    title: "100% Fund Utilization",
    desc: "Every rupee donated goes directly to program delivery.",
  },
  {
    icon: FiAward,
    title: "12+ Years of Trust",
    desc: "A track record of measurable impact since 2014.",
  },
  {
    icon: FiGlobe,
    title: "28 Partner Schools",
    desc: "Working hand-in-hand with local schools and communities.",
  },
];

const partners = [
  "United Way India",
  "Teach For India",
  "Rotary Club Khandwa",
  "GiveIndia",
  "Akshaya Patra",
  "CRY Foundation",
];

export default function Home() {
  const { content } = useContent();
  const [campaigns, setCampaigns] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/campaigns?active=true").then((r) => setCampaigns(r.data.slice(0, 1))).catch(() => {});
    api.get("/testimonials").then((r) => setTestimonials(r.data.slice(0, 3))).catch(() => {});
    api.get("/events?type=upcoming").then((r) => setEvents(r.data.slice(0, 3))).catch(() => {});
  }, []);

  const campaign = campaigns[0];
  const progressPct = campaign
    ? Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100))
    : 0;


  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 ruled-bg opacity-40"></div>
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-marigold/25 blur-3xl float-blob"></div>
        <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-leaf/15 blur-3xl float-blob" style={{ animationDelay: "3s" }}></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-8 h-px bg-marigold inline-block"></span> Bright Futures Foundation
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-ink">
              {content.hero_title?.split(" Education")[0] || "Empowering Children"}{" "}
              <span className="marker-underline">Through Education</span>
            </h1>
            <p className="mt-6 text-ink-light text-base md:text-lg max-w-xl">
              {content.hero_subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-7 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all glow-ring"
              >
                <FiHeart /> Donate Now
              </Link>
              <Link
                to="/volunteer"
                className="flex items-center gap-2 glass text-ink font-semibold px-7 py-3.5 rounded-full hover:border-marigold/50 transition-colors"
              >
                Become a Volunteer <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <div className="aspect-[4/5] rounded-card overflow-hidden border border-white/10 shadow-2xl shadow-marigold/10">
              <img
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1200&auto=format&fit=crop"
                alt="Children studying together in a classroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass rounded-card p-5 shadow-xl max-w-[220px] hidden sm:block">
              <p className="font-display font-bold text-3xl text-terracotta">
                <Counter value={content.stat_beneficiaries} suffix="+" />
              </p>
              <p className="text-sm text-slate mt-1">Children supported across India</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: content.stat_beneficiaries, label: "Children Educated", suffix: "+" },
            { value: content.stat_volunteers, label: "Active Volunteers", suffix: "+" },
            { value: content.stat_schools, label: "Partner Schools", suffix: "" },
            { value: content.stat_years, label: "Years of Impact", suffix: "+" },
          ].map((s, i) => (
            <div key={i}>
              <p className="font-display font-bold text-3xl md:text-4xl text-ink">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-sm text-slate mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((b, i) => (
            <div key={i} className="glass rounded-card p-6 text-center hover-lift">
              <div className="w-12 h-12 rounded-2xl bg-marigold/15 text-marigold flex items-center justify-center mx-auto mb-3">
                <b.icon size={20} />
              </div>
              <h3 className="font-display font-bold text-base mb-1 text-ink">{b.title}</h3>
              <p className="text-xs text-slate leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-10">
        <div className="glass rounded-card p-8 hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-leaf/15 text-leaf flex items-center justify-center mb-4">
            <FiTarget size={22} />
          </div>
          <h3 className="font-display font-bold text-2xl mb-3 text-ink">Our Mission</h3>
          <p className="text-slate leading-relaxed">{content.mission}</p>
        </div>
        <div className="glass rounded-card p-8 hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-marigold/15 text-marigold flex items-center justify-center mb-4">
            <FiCheckCircle size={22} />
          </div>
          <h3 className="font-display font-bold text-2xl mb-3 text-ink">Our Vision</h3>
          <p className="text-slate leading-relaxed">{content.vision}</p>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="py-20 bg-white/[0.015]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              What We Do
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Our Core Programs</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((p, i) => (
              <div key={i} className="glass rounded-card p-6 hover-lift">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${p.color}`}>
                  <p.icon size={22} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2 text-ink">{p.title}</h3>
                <p className="text-sm text-slate leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-ink font-semibold hover:text-marigold transition-colors"
            >
              View All Programs <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE DONATION TRACKER */}
      {campaign && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="glass rounded-card overflow-hidden grid md:grid-cols-2 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-marigold/20 blur-3xl"></div>
            <div className="p-8 md:p-12 relative">
              <p className="text-marigold font-semibold text-sm uppercase tracking-widest mb-3">
                Active Campaign
              </p>
              <h3 className="font-display font-bold text-2xl md:text-3xl mb-3 text-ink">{campaign.title}</h3>
              <p className="text-slate mb-6 leading-relaxed">{campaign.description}</p>

              <div className="mb-2 flex justify-between text-sm">
                <span className="text-marigold font-semibold">
                  ₹{campaign.raisedAmount?.toLocaleString()} raised
                </span>
                <span className="text-slate">of ₹{campaign.targetAmount?.toLocaleString()}</span>
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-marigold to-terracotta rounded-full transition-all duration-1000"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate mt-2">{progressPct}% of goal achieved</p>

              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-7 py-3 rounded-full mt-6 hover:shadow-lg hover:shadow-marigold/30 transition-all"
              >
                <FiHeart /> Contribute Now
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1497375638960-ca80c8c1d3a6?q=80&w=1200&auto=format&fit=crop"
                alt="Students reading books donated by the campaign"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* IMPACT CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <ImpactCalculator />
      </section>

      {/* UPCOMING EVENTS */}
      {events.length > 0 && (
        <section className="py-20 bg-white/[0.015]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
                  Get Involved
                </p>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Upcoming Events</h2>
              </div>
              <Link to="/events" className="text-ink font-semibold hover:text-marigold flex items-center gap-2">
                View All <FiArrowRight />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((e) => (
                <div key={e._id} className="glass rounded-card overflow-hidden hover-lift">
                  <div className="h-40 bg-white/5 overflow-hidden">
                    <img
                      src={e.image || "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop"}
                      alt={e.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold text-marigold uppercase tracking-wide">
                      {new Date(e.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <h3 className="font-display font-bold text-lg mt-1 mb-2 text-ink">{e.title}</h3>
                    <p className="text-sm text-slate line-clamp-2">{e.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              Voices
            </p>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">What People Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t._id} className="glass rounded-card p-6 hover-lift">
                <div className="flex gap-1 text-marigold mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FiHeart key={i} className="fill-marigold" />
                  ))}
                </div>
                <p className="text-slate leading-relaxed mb-4 italic">"{t.message}"</p>
                <p className="font-semibold text-ink">{t.name}</p>
                <p className="text-xs text-slate capitalize">{t.role}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PARTNERS MARQUEE */}
      <section className="py-12 border-y border-white/5 bg-white/[0.015] overflow-hidden">
        <p className="text-center text-xs uppercase tracking-widest text-slate mb-6">
          Trusted by & Partnered with
        </p>
        <div className="relative flex overflow-x-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[...partners, ...partners].map((p, i) => (
              <span key={i} className="font-display font-semibold text-lg text-ink-light/60">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
            Have Questions?
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion />
      </section>

      {/* CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-marigold/20 via-transparent to-terracotta/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-ink">
            Every Child Deserves a Chance to Learn
          </h2>
          <p className="text-ink-light mb-8 max-w-xl mx-auto">
            Your support — big or small — helps us bring books, teachers, and hope to children who need it most.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/donate"
              className="bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all glow-ring"
            >
              Donate Now
            </Link>
            <Link
              to="/volunteer"
              className="glass text-ink font-semibold px-8 py-3.5 rounded-full hover:border-marigold/50 transition-colors"
            >
              Join as Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
