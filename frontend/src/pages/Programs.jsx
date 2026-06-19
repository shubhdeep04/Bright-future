import PageHero from "../components/PageHero";
import { FiBookOpen, FiHeart, FiUsers, FiShield, FiFeather, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const programs = [
  {
    icon: FiBookOpen,
    title: "Education Support",
    desc: "We run free tuition centers, provide scholarships, textbooks, and stationery, and offer online classes and career counseling for students from underserved communities.",
    points: ["Scholarship programs", "Free after-school tuition centers", "Career counseling for high schoolers", "Digital learning kits"],
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop",
    color: "marigold",
  },
  {
    icon: FiHeart,
    title: "Healthcare Camps",
    desc: "Regular health checkup camps, vaccination drives, and telemedicine support bring basic healthcare to schools and villages where access is limited.",
    points: ["Free health camp bookings", "Telemedicine consultations", "Vaccination drives", "Nutrition awareness programs"],
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop",
    color: "terracotta",
  },
  {
    icon: FiUsers,
    title: "Women Empowerment",
    desc: "We equip women with vocational skills, connect them with employment opportunities, and run legal awareness sessions to help them understand their rights.",
    points: ["Skill training programs (tailoring, crafts)", "Employment assistance", "Legal awareness sessions", "Microfinance guidance"],
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop",
    color: "leaf",
  },
  {
    icon: FiShield,
    title: "Child Welfare",
    desc: "Through our sponsorship program, donors can directly support a child's education journey. We track each child's academic progress and respond to support requests.",
    points: ["Individual sponsorship programs", "Continuous education tracking", "Emergency support requests", "Counseling services"],
    img: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?q=80&w=1000&auto=format&fit=crop",
    color: "ink",
  },
  {
    icon: FiFeather,
    title: "Environmental Projects",
    desc: "Building a sustainable future alongside education — we run tree plantation drives, school cleanliness campaigns, and environmental awareness workshops.",
    points: ["Tree plantation registration drives", "School cleanliness campaigns", "Eco-club workshops for students", "Carbon footprint awareness"],
    img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
    color: "leaf",
  },
];

const colorMap = {
  marigold: "bg-marigold/15 text-marigold",
  terracotta: "bg-terracotta/15 text-terracotta",
  leaf: "bg-leaf/15 text-leaf",
  ink: "bg-white/5 text-ink",
};

export default function Programs() {
  return (
    <div>
      <PageHero
        eyebrow="Programs & Services"
        title="Programs That Change Lives"
        subtitle="From classrooms to clinics, our work spans the areas that matter most for a child's future and their family's wellbeing."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {programs.map((p, i) => (
          <div
            key={i}
            className={`grid lg:grid-cols-2 gap-10 items-center ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="aspect-[5/3] rounded-card overflow-hidden border border-white/10 shadow-lg">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${colorMap[p.color]}`}>
                <p.icon size={22} />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">{p.title}</h2>
              <p className="text-slate leading-relaxed mb-5">{p.desc}</p>
              <ul className="space-y-2 mb-6">
                {p.points.map((point, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-marigold shrink-0"></span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 font-semibold text-ink hover:text-terracotta transition-colors"
              >
                Support this program <FiArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-leaf/20 via-transparent to-marigold/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4 text-ink">
            Want to Sponsor a Specific Program?
          </h2>
          <p className="text-ink-light mb-8 max-w-xl mx-auto">
            Reach out to our team to discuss corporate partnerships or focused sponsorships for any program.
          </p>
          <Link
            to="/contact"
            className="bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-colors inline-block glow-ring"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
