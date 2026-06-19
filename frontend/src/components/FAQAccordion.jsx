import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "Is my donation tax-deductible?",
    a: "Yes. Bright Futures Foundation is registered under Section 80G of the Income Tax Act. You'll receive an official receipt and tax certificate via email immediately after donating, downloadable anytime from your Donor Dashboard.",
  },
  {
    q: "How is my donation used?",
    a: "100% of your donation goes directly toward program costs — scholarships, learning materials, healthcare camps, and teacher salaries. We publish quarterly impact reports detailing exactly how funds are utilized.",
  },
  {
    q: "Can I sponsor a specific child or program?",
    a: "Absolutely. Choose an active campaign during checkout, or contact our team directly to set up an individual child sponsorship through our Child Welfare program.",
  },
  {
    q: "How can I volunteer if I don't live nearby?",
    a: "We offer remote volunteering opportunities including online tutoring, content writing, and social media support. Select 'Flexible' availability and mention your remote interest in the application form.",
  },
  {
    q: "Do volunteers receive certificates?",
    a: "Yes. After completing your assigned activities, our team issues a digital Certificate of Appreciation, downloadable from your Volunteer Dashboard.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((item, i) => (
        <div key={i} className="glass rounded-card mb-3 overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left"
          >
            <span className="font-semibold text-ink">{item.q}</span>
            <FiChevronDown
              className={`shrink-0 text-marigold transition-transform duration-300 ${
                open === i ? "rotate-180" : ""
              }`}
              size={20}
            />
          </button>
          <div
            className={`px-5 overflow-hidden transition-all duration-300 ${
              open === i ? "max-h-40 pb-5" : "max-h-0"
            }`}
          >
            <p className="text-sm text-slate leading-relaxed">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
