
import PageHero from "../components/PageHero";
import { useContent } from "../context/ContentContext";
import {
  FiAward,
  FiFileText,
  FiTarget,
  FiHeart,
  FiUsers,
  FiTrendingUp,
} from "react-icons/fi";

const team = [
  {
    name: "Mrs. Pragya Bhatnagar",
    role: "Founder & Director",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Mr. Abhishek Tiwari",
    role: "Project Manager",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Mr. Mahendra Telang",
    role: "Field Manager",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "MS. Vidhya Yadav",
    role: "Program Coordinator",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },


{
    name: "MS. Trisha Dhoke",
    role: "Program Coordinator",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },


{
    name: "MS. Deepa Gautam",
    role: "Office Administrator",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },

{
    name: "Mr. Aniket Thakur",
    role: "Trainer",
    img: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
  },





];

    





const stats = [
  {
    number: "3+",
    label: "Years of Service",
  },
  {
    number: "15K+",
    label: "Children Supported",
  },
  {
    number: "200+",
    label: "Active Volunteers",
  },
  {
    number: "50+",
    label: "Communities Reached",
  },
];

const values = [
  {
    title: "Integrity",
    desc: "Transparency, honesty, and accountability guide every initiative.",
  },
  {
    title: "Education",
    desc: "We believe quality education is the foundation of lasting change.",
  },
  {
    title: "Inclusion",
    desc: "Every child deserves equal opportunities regardless of background.",
  },
  {
    title: "Impact",
    desc: "We focus on measurable outcomes that transform lives.",
  },
];

export default function About() {
  const { content } = useContent();

  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="Our Story, Our People, Our Promise"
        subtitle="Three years of working alongside communities to make education accessible for every child."
      />

      {/* History */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
            Our History
          </p>

          <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">
            How It All Began
          </h2>

          <p className="text-slate leading-relaxed">
            {content.ngo_history}
          </p>
        </div>

        <div className="aspect-[4/3] rounded-card overflow-hidden border border-white/10 shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop"
            alt="NGO Education"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              Our Journey
            </p>

            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Milestones That Define Us
            </h2>
          </div>

          <div className="space-y-8">
            <div className="border-l-4 border-marigold pl-6">
              <h3 className="font-bold text-lg">2024</h3>
              <p className="text-slate">
                NGO established with a mission to support education for
                underserved children.
              </p>
            </div>

            <div className="border-l-4 border-marigold pl-6">
              <h3 className="font-bold text-lg">2025</h3>
              <p className="text-slate">
                Expanded learning programs into rural communities.
              </p>
            </div>

            {/* <div className="border-l-4 border-marigold pl-6">
              <h3 className="font-bold text-lg">2021</h3>
              <p className="text-slate">
                Reached over 10,000 beneficiaries through educational support.
              </p>
            </div> */}

            <div className="border-l-4 border-marigold pl-6">
              <h3 className="font-bold text-lg">2026</h3>
              <p className="text-slate">
                Operating across multiple regions and transforming thousands of
                lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              Our Impact
            </p>

            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Numbers That Matter
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-chalk rounded-card p-6 border border-white/10 text-center"
              >
                <h3 className="text-4xl font-bold text-marigold mb-2">
                  {item.number}
                </h3>

                <p className="text-slate">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Message */}
      <section className="py-16 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-marigold/15 via-transparent to-terracotta/10"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-marigold/20 text-marigold flex items-center justify-center mx-auto mb-6">
            <FiAward size={28} />
          </div>

          <p className="font-display text-xl md:text-2xl leading-relaxed italic mb-6 text-ink">
            "{content.founder_message}"
          </p>

          <p className="text-marigold font-semibold">
            {content.founder_name}
          </p>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-chalk rounded-card p-8 border border-white/10">
              <div className="mb-4 text-marigold">
                <FiTarget size={30} />
              </div>

              <h3 className="font-display text-2xl font-bold mb-4">
                Our Vision
              </h3>

              <p className="text-slate leading-relaxed">
                To create an empowered and self-reliant society through quality education, skill development, innovation,and social transformation.
              </p>
            </div>

            <div className="bg-chalk rounded-card p-8 border border-white/10">
              <div className="mb-4 text-marigold">
                <FiHeart size={30} />
              </div>

              <h3 className="font-display text-2xl font-bold mb-4">
                Our Mission
              </h3>

              <p className="text-slate leading-relaxed">
                To empower communities through education, skill development,
                mentorship, and sustainable programs that create lasting social
                impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
              Core Values
            </p>

            <h2 className="font-display font-bold text-3xl md:text-4xl">
              What We Stand For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-chalk p-6 rounded-card border border-white/10"
              >
                <h3 className="font-bold text-lg mb-3">{value.title}</h3>

                <p className="text-slate text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
            Our People
          </p>

          <h2 className="font-display font-bold text-3xl md:text-4xl">
            Meet the Team
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <div key={i} className="text-center group">
              <div className="aspect-square rounded-card overflow-hidden mb-4 border border-white/10">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <h3 className="font-display font-bold text-lg">{m.name}</h3>

              <p className="text-sm text-slate">{m.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white/[0.03]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl">
              Why Communities Trust Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-chalk rounded-card p-6 border border-white/10">
              <FiUsers size={28} className="mb-4 text-marigold" />
              <h3 className="font-bold mb-3">Community Focused</h3>
              <p className="text-slate">
                Every program is designed around the real needs of communities.
              </p>
            </div>

            <div className="bg-chalk rounded-card p-6 border border-white/10">
              <FiAward size={28} className="mb-4 text-marigold" />
              <h3 className="font-bold mb-3">Experienced Team</h3>
              <p className="text-slate">
                Dedicated professionals and volunteers working together.
              </p>
            </div>

            <div className="bg-chalk rounded-card p-6 border border-white/10">
              <FiTrendingUp size={28} className="mb-4 text-marigold" />
              <h3 className="font-bold mb-3">Proven Impact</h3>
              <p className="text-slate">
                Measurable outcomes that create long-term positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="bg-white/[0.03] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-chalk rounded-card p-8 border border-white/10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-leaf/15 text-leaf flex items-center justify-center shrink-0">
              <FiFileText size={22} />
            </div>

            <div>
              <h3 className="font-display font-bold text-xl mb-2">
                Registration & Legal Status
              </h3>

              <p className="text-slate leading-relaxed">
                {content.registration_details}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl font-bold mb-4">
            Join Our Mission
          </h2>

          <p className="text-slate mb-8">
            Together, we can create opportunities, transform lives, and build a
            brighter future for every child.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-marigold font-semibold hover:opacity-90 transition">
              Become a Volunteer
            </button>

            <button className="px-8 py-3 rounded-full border border-marigold font-semibold hover:bg-marigold/10 transition">
              Donate Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}