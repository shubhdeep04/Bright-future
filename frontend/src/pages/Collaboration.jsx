import {
  FiBriefcase, FiBookOpen, FiUsers, FiHeart, FiAward, FiMoreHorizontal,
  FiArrowRight, FiCheckCircle,
} from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import CollaborationForm from "../components/CollaborationForm";

/* ─── PALETTE (matches Home.jsx) ──────────────────────────────── */
const C = {
  bg:      "#0b0f1a",
  navy:    "#0d1120",
  gold:    "#f5c842",
  goldDim: "rgba(245,200,66,0.35)",
  text:    "#e8e0d0",
  muted:   "rgba(232,224,208,0.55)",
  card:    { background:"rgba(255,255,255,0.035)", border:"1px solid rgba(245,200,66,0.10)", borderRadius:"16px" },
};

/* ─── HELPERS (matches Home.jsx) ──────────────────────────────── */
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

/* ─── DATA ─────────────────────────────────────────────────────── */
const collaborationTypes = [
  { icon: FiBriefcase, title: "CSR Partnership", desc: "Corporate social responsibility partnerships that align your company's giving with measurable community impact." },
  { icon: FiBookOpen,  title: "School / Institution Partnership", desc: "Partner with us to bring education support, library projects, or skill programs directly to your students." },
  { icon: FiHeart,     title: "NGO Collaboration", desc: "Join hands with other non-profits to co-run programs, share resources, and expand collective reach." },
  { icon: FiUsers,     title: "Volunteer Group", desc: "Bring your volunteer group, college club, or community collective on board for hands-on field work." },
  { icon: FiAward,     title: "Corporate Sponsorship", desc: "Sponsor a specific program, event, or campaign and get visibility as a supporting partner." },
  { icon: FiMoreHorizontal, title: "Something Else?", desc: "Have an idea that doesn't fit a category above? We're always open to creative partnerships." },
];

const whyPartner = [
  "Full transparency with audited financials and impact reports",
  "Co-branded recognition across our website and events",
  "Direct, on-ground visibility into how contributions are used",
  "A dedicated point of contact for the entire partnership",
];

/* ─── PAGE ─────────────────────────────────────────────────────── */
export default function Collaboration() {
  return (
    <div style={{ background:C.bg, color:C.text, fontFamily:"inherit" }}>

      {/* ══════════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════════ */}
      <section style={{ background:C.navy, borderBottom:"1px solid rgba(245,200,66,0.1)", padding:"120px 0 80px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <Reveal>
            <Eyebrow>Get Involved</Eyebrow>
            <h1 style={{ fontSize:"clamp(2rem,4.5vw,3.2rem)", fontWeight:800, marginBottom:18, lineHeight:1.15 }}>
              Collaborate With Us
            </h1>
            <p style={{ color:C.muted, fontSize:"1.05rem", lineHeight:1.78, maxWidth:640, margin:"0 auto" }}>
              Whether you're a company, a school, a fellow non-profit, or a group of passionate volunteers —
              there's a way to work together. Explore the partnership options below and reach out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          COLLABORATION TYPES
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:1280, margin:"0 auto", padding:"96px 24px" }}>
        <Reveal style={{ textAlign:"center", marginBottom:48 }}>
          <Eyebrow>Ways To Partner</Eyebrow>
          <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:800 }}>Partnership Opportunities</h2>
        </Reveal>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20 }}>
          {collaborationTypes.map((t, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ ...C.card, padding:"32px 26px", height:"100%", transition:"all 0.3s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(245,200,66,0.05)";e.currentTarget.style.border="1px solid rgba(245,200,66,0.28)";e.currentTarget.style.transform="translateY(-4px)"}}
                onMouseLeave={e=>{e.currentTarget.style.background=C.card.background;e.currentTarget.style.border=C.card.border;e.currentTarget.style.transform="none"}}>
                <div style={{ width:48, height:48, borderRadius:14, background:"rgba(245,200,66,0.1)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, color:C.gold }}>
                  <t.icon size={20} />
                </div>
                <h3 style={{ fontWeight:700, fontSize:"1.05rem", marginBottom:10 }}>{t.title}</h3>
                <p style={{ color:C.muted, fontSize:"0.88rem", lineHeight:1.72 }}>{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY PARTNER
      ══════════════════════════════════════════ */}
      <section style={{ background:C.navy, padding:"80px 0" }}>
        <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
          <Reveal style={{ textAlign:"center", marginBottom:36 }}>
            <Eyebrow>Why Partner With Us</Eyebrow>
            <h2 style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:800 }}>What You Can Expect</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display:"grid", gap:16 }}>
              {whyPartner.map((point, i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                  <FiCheckCircle size={18} style={{ color:C.gold, flexShrink:0, marginTop:2 }} />
                  <p style={{ color:C.text, fontSize:"0.98rem", lineHeight:1.7 }}>{point}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          INQUIRY FORM
      ══════════════════════════════════════════ */}
      <section style={{ maxWidth:800, margin:"0 auto", padding:"96px 24px" }}>
        <Reveal style={{ textAlign:"center", marginBottom:40 }}>
          <Eyebrow>Start The Conversation</Eyebrow>
          <h2 style={{ fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:800, marginBottom:14 }}>
            Tell Us About Your Organization
          </h2>
          <p style={{ color:C.muted, fontSize:"0.98rem", maxWidth:520, margin:"0 auto" }}>
            Fill in the form below and our team will get back to you within 3–5 working days.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ ...C.card, padding:"36px 30px" }}>
            <CollaborationForm />
          </div>
        </Reveal>
      </section>

    </div>
  );
}