import {
  FiHeart, FiUsers, FiBookOpen, FiTarget, FiShield, FiAward,
  FiTrendingUp, FiGlobe, FiCheckCircle, FiStar, FiMapPin, FiCalendar,
} from "react-icons/fi";

// Maps a stored icon-name string (saved in DB) to the actual react-icons component.
// Used by Home.jsx to render icons, and by AdminContent.jsx to build the icon dropdown.
export const ICON_MAP = {
  FiHeart, FiUsers, FiBookOpen, FiTarget, FiShield, FiAward,
  FiTrendingUp, FiGlobe, FiCheckCircle, FiStar, FiMapPin, FiCalendar,
};

export const ICON_OPTIONS = Object.keys(ICON_MAP);

// These are only used as a fallback the very first time the site loads
// (before an admin has saved anything for these sections in the DB).
export const defaultHeroSlides = [
  {
    img: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1800&auto=format&fit=crop",
    tag: "Education",
    headline: "Lighting the Path\nFor Every Child",
    sub: "Pragya Education Society is a registered non profit educational and social development organization committed to promoting education , skill decelopment, digital literacy, employability, and community empowerment.",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1800&auto=format&fit=crop",
    tag: "Awareness",
    headline: "Healthy Children,\nBrighter Futures",
    sub: "Free medical camps, nutrition drives, and vaccination support reaching 12,000+ children every year.",
  },
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1800&auto=format&fit=crop",
    tag: "Awareness",
    headline: "Healthy Children,\nBrighter Futures",
    sub: "Free medical camps, nutrition drives, and vaccination support reaching 12,000+ children every year.",
  },
];

export const defaultPrograms = [
  { icon: "FiBookOpen", title: "Education Support", desc: "Scholarships, free tuition centers, books and stationery for underprivileged children.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" },
  { icon: "FiHeart", title: "Healthcare Camps", desc: "Free health checkups, vaccination drives and nutrition support in rural schools.", img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" },
  { icon: "FiUsers", title: "Women Empowerment", desc: "Skill training, employment assistance and legal awareness sessions for women.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
  { icon: "FiTarget", title: "Child Welfare", desc: "Sponsorship programs, education tracking and direct support for vulnerable children.", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" },
];

export const defaultTrustBadges = [
  { icon: "FiShield", title: "80G Tax Exempt", desc: "Registered NGO with full transparency and audited financials." },
  { icon: "FiTrendingUp", title: "100% Fund Utilization", desc: "Every rupee donated goes directly to program delivery." },
  { icon: "FiAward", title: "12+ Years of Trust", desc: "A track record of measurable impact since 2014." },
  { icon: "FiGlobe", title: "28 Partner Schools", desc: "Working hand-in-hand with local schools and communities." },
];

export const defaultImpactStories = [
  { name: "Ravi, Age 14", location: "Khandwa, MP", tag: "Education", story: "From working in fields to topping his district exams — Ravi's scholarship changed his family's future.", img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600&auto=format&fit=crop" },
  { name: "Sunita Bai", location: "Burhanpur, MP", tag: "Women Empowerment", story: "After our skill training, Sunita now runs her own tailoring unit and employs 3 other women in her village.", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop" },
  { name: "Govt. School #42", location: "Harda, MP", tag: "Community", story: "Our library project transformed this school's dropout rate from 40% to under 5% in just two years.", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop" },
];

export const defaultTeamMembers = [
  { name: "Priya Sharma", role: "Founder & Director", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop", quote: "Education is the most powerful weapon we can give our children." },
  { name: "Rahul Gupta", role: "Program Head", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop", quote: "Every child's smile is proof that our work matters." },
  { name: "Ananya Verma", role: "Community Lead", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop", quote: "Change starts from within the community itself." },
];

export const defaultPartners = ["United Way India", "Teach For India", "Rotary Club Khandwa", "GiveIndia", "Akshaya Patra", "CRY Foundation"];