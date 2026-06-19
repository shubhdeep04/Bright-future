import { useState } from "react";
import { Link } from "react-router-dom";
import { FiBook, FiUsers, FiHeart, FiArrowRight } from "react-icons/fi";

const presets = [500, 1000, 2500, 5000, 10000];

// Rough impact conversion rates (illustrative)
const impactFor = (amount) => ({
  books: Math.floor(amount / 50),
  meals: Math.floor(amount / 25),
  schoolDays: Math.floor(amount / 100),
});

export default function ImpactCalculator() {
  const [amount, setAmount] = useState(1000);
  const impact = impactFor(amount);

  return (
    <div className="glass rounded-card p-6 md:p-10">
      <div className="text-center max-w-xl mx-auto mb-8">
        <p className="text-terracotta font-semibold text-sm uppercase tracking-widest mb-2">
          See Your Impact
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
          Calculate What Your Donation Can Do
        </h2>
        <p className="text-slate mt-3">
          Move the slider to see how your contribution directly translates into resources for children.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate">Donation Amount</span>
          <span className="font-display font-bold text-2xl text-marigold">
            ₹{amount.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={100}
          max={20000}
          step={100}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10 accent-marigold"
        />
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors ${
                amount === p
                  ? "bg-marigold border-marigold text-white"
                  : "border-white/10 text-slate hover:border-marigold/50"
              }`}
            >
              ₹{p.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-10">
        <div className="rounded-card p-5 bg-white/5 text-center hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-marigold/15 text-marigold flex items-center justify-center mx-auto mb-3">
            <FiBook size={20} />
          </div>
          <p className="font-display font-bold text-2xl text-ink">{impact.books}</p>
          <p className="text-sm text-slate mt-1">Books & Stationery Kits</p>
        </div>
        <div className="rounded-card p-5 bg-white/5 text-center hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-leaf/15 text-leaf flex items-center justify-center mx-auto mb-3">
            <FiHeart size={20} />
          </div>
          <p className="font-display font-bold text-2xl text-ink">{impact.meals}</p>
          <p className="text-sm text-slate mt-1">Nutritious Meals</p>
        </div>
        <div className="rounded-card p-5 bg-white/5 text-center hover-lift">
          <div className="w-12 h-12 rounded-2xl bg-terracotta/15 text-terracotta flex items-center justify-center mx-auto mb-3">
            <FiUsers size={20} />
          </div>
          <p className="font-display font-bold text-2xl text-ink">{impact.schoolDays}</p>
          <p className="text-sm text-slate mt-1">Days of Schooling</p>
        </div>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/donate"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-semibold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all glow-ring"
        >
          Donate ₹{amount.toLocaleString()} Now <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}
