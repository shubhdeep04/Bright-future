// 
// import { useState } from "react";
// import PageHero from "../components/PageHero";
// import { FiMail, FiPhone, FiMapPin, FiSend, FiUpload, FiCheck } from "react-icons/fi";
// import { useContent } from "../context/ContentContext";
// import api from "../utils/api";
// import toast from "react-hot-toast";

// export default function Contact() {
//   const { content } = useContent();
  
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     inquiryType: "",
//     message: "",
//     attachment: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [charCount, setCharCount] = useState(0);
//   const [previewUrl, setPreviewUrl] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
    
//     if (name === "message") {
//       setCharCount(value.length);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         toast.error("File size should be less than 5MB");
//         return;
//       }
//       setForm({ ...form, attachment: file });
      
//       // Preview for images
//       if (file.type.startsWith("image/")) {
//         const url = URL.createObjectURL(file);
//         setPreviewUrl(url);
//       } else {
//         setPreviewUrl(null);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!form.name || !form.email || !form.message) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
    
//     Object.keys(form).forEach(key => {
//       if (form[key] !== null && form[key] !== "") {
//         formData.append(key, form[key]);
//       }
//     });

//     try {
//       const { data } = await api.post("/contact", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
      
//       toast.success(data.message || "Message sent successfully!");
//       setSubmitted(true);
      
//       // Reset form after success
//       setTimeout(() => {
//         setForm({
//           name: "", email: "", phone: "", subject: "", 
//           inquiryType: "", message: "", attachment: null
//         });
//         setPreviewUrl(null);
//         setCharCount(0);
//         setSubmitted(false);
//       }, 2500);
      
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <PageHero
//         eyebrow="Contact Us"
//         title="Get in Touch"
//         subtitle="Have questions about our programs, donations, or volunteering? We'd love to hear from you."
//       />

//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
//         {/* Contact Info Cards - Enhanced with Images */}
//         <div className="lg:col-span-1 space-y-6">
//           <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift group">
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 rounded-full bg-marigold/15 text-marigold flex items-center justify-center mb-3 flex-shrink-0">
//                 <FiMapPin size={20} />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-display font-bold text-lg mb-1">Visit Us</h3>
//                 <p className="text-sm text-slate mb-3">{content.contact_address}</p>
//                 {/* Added Office Image */}
//                 {content.office_image && (
//                   <img 
//                     src={content.office_image} 
//                     alt="Our Office" 
//                     className="w-full h-32 object-cover rounded-xl mt-3 opacity-90 group-hover:opacity-100 transition-opacity"
//                   />
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift group">
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 rounded-full bg-terracotta/15 text-terracotta flex items-center justify-center mb-3 flex-shrink-0">
//                 <FiMail size={20} />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-display font-bold text-lg mb-1">Email Us</h3>
//                 <p className="text-sm text-slate">{content.contact_email}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-chalk border border-white/10 rounded-card p-6 hover-lift group">
//             <div className="flex items-start gap-4">
//               <div className="w-12 h-12 rounded-full bg-leaf/15 text-leaf flex items-center justify-center mb-3 flex-shrink-0">
//                 <FiPhone size={20} />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-display font-bold text-lg mb-1">Call Us</h3>
//                 <p className="text-sm text-slate">{content.contact_phone}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Contact Form - Advanced Features */}
//         <div className="lg:col-span-2">
//           <form onSubmit={handleSubmit} className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 space-y-5 shadow-sm">
//             <div className="grid sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Full Name *</label>
//                 <input
//                   name="name"
//                   required
//                   value={form.name}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Email *</label>
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   value={form.email}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Phone</label>
//                 <input
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Inquiry Type</label>
//                 <select
//                   name="inquiryType"
//                   value={form.inquiryType}
//                   onChange={handleChange}
//                   className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-transparent"
//                 >
//                   <option value="">Select...</option>
//                   <option value="program">Program Information</option>
//                   <option value="donation">Donation / Sponsorship</option>
//                   <option value="volunteer">Volunteering</option>
//                   <option value="partnership">Partnership</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2">Subject</label>
//               <input
//                 name="subject"
//                 value={form.subject}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold mb-2 flex justify-between">
//                 Message * 
//                 <span className="text-xs text-slate">{charCount}/500</span>
//               </label>
//               <textarea
//                 name="message"
//                 required
//                 rows={5}
//                 maxLength={500}
//                 value={form.message}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none"
//               />
//             </div>

//             {/* Attachment Upload */}
//             <div>
//               <label className="block text-sm font-semibold mb-2">Attachment (Optional)</label>
//               <div className="border-2 border-dashed border-white/20 rounded-xl p-4 hover:border-marigold transition-colors">
//                 <input
//                   type="file"
//                   id="attachment"
//                   onChange={handleFileChange}
//                   className="hidden"
//                   accept="image/*,.pdf,.doc,.docx"
//                 />
//                 <label htmlFor="attachment" className="cursor-pointer flex flex-col items-center justify-center py-2">
//                   <FiUpload className="text-2xl mb-2 text-marigold" />
//                   <span className="text-sm text-slate">Click to upload document or image (max 5MB)</span>
//                 </label>
//               </div>
//               {previewUrl && (
//                 <div className="mt-3">
//                   <img src={previewUrl} alt="Preview" className="h-24 rounded-lg object-cover" />
//                 </div>
//               )}
//               {form.attachment && !previewUrl && (
//                 <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
//                   <FiCheck /> {form.attachment.name}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               disabled={loading || submitted}
//               className="flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-60 w-full sm:w-auto"
//             >
//               {submitted ? (
//                 <>✅ Message Sent</>
//               ) : loading ? (
//                 "Sending..."
//               ) : (
//                 <>
//                   <FiSend /> Send Message
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* Map Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
//         <div className="rounded-card overflow-hidden border border-white/10 h-80 relative">
//           <iframe
//             title="Bright Futures Foundation Location"
//             src="https://www.openstreetmap.org/export/embed.html?bbox=76.30%2C21.80%2C76.40%2C21.90&layer=mapnik"
//             className="w-full h-full"
//             loading="lazy"
//           ></iframe>
//           <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
//             📍 Indore, Madhya Pradesh
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }






import { useState } from "react";
import PageHero from "../components/PageHero";
import { FiMail, FiPhone, FiMapPin, FiSend, FiUpload, FiCheck, FiClock, FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { useContent } from "../context/ContentContext";
import api from "../utils/api";
import toast from "react-hot-toast";

const INQUIRY_TYPES = [
  { value: "", label: "Select..." },
  { value: "program", label: "Program Information" },
  { value: "donation", label: "Donation / Sponsorship" },
  { value: "volunteer", label: "Volunteering" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const { content } = useContent();

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    subject: "", inquiryType: "", message: "", attachment: null,
  });
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === "message") setCharCount(value.length);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("File size should be less than 5MB"); return; }
    setForm(f => ({ ...f, attachment: file }));
    setPreviewUrl(file.type.startsWith("image/") ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error("Please fill in all required fields"); return; }

    const healthy = await api.isHealthy();
    if (!healthy) {
      toast.error("Service unavailable. Please try again later.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.keys(form).forEach(k => { if (form[k] !== null && form[k] !== "") formData.append(k, form[k]); });
    try {
      const { data } = await api.post("/contact", formData, { headers: { "Content-Type": "multipart/form-data" } });
      toast.success(data.message || "Message sent successfully!");
      setSubmitted(true);
      setTimeout(() => {
        setForm({ name:"", email:"", phone:"", subject:"", inquiryType:"", message:"", attachment:null });
        setPreviewUrl(null); setCharCount(0); setSubmitted(false);
      }, 2500);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fallbacks if admin hasn't set content yet
  const address  = content.contact_address  || "123, Nehru Nagar, Khandwa, Madhya Pradesh - 450001";
  const email    = content.contact_email    || "info@brightfutures.org";
  const phone    = content.contact_phone    || "+91 98765 43210";
  const hours    = content.contact_hours    || "Mon – Sat: 9:00 AM – 6:00 PM";
  const mapUrl   = content.contact_map_url  || "https://www.openstreetmap.org/export/embed.html?bbox=76.30%2C21.80%2C76.40%2C21.90&layer=mapnik";
  const mapLabel = content.contact_map_label || "📍 Khandwa, Madhya Pradesh";
  const fbUrl    = content.contact_facebook  || "#";
  const igUrl    = content.contact_instagram || "#";
  const twUrl    = content.contact_twitter   || "#";

  const infoCards = [
    {
      icon: FiMapPin, color: "text-marigold bg-marigold/15",
      title: "Visit Us", value: address,
      image: content.office_image || null,
    },
    { icon: FiMail,  color: "text-terracotta bg-terracotta/15", title: "Email Us",  value: email },
    { icon: FiPhone, color: "text-leaf bg-leaf/15",             title: "Call Us",   value: phone },
    { icon: FiClock, color: "text-sky-400 bg-sky-400/15",       title: "Office Hours", value: hours },
  ];

  return (
    <div>
      <PageHero
        eyebrow={content.contact_eyebrow || "Contact Us"}
        title={content.contact_hero_title || "Get in Touch"}
        subtitle={content.contact_hero_subtitle || "Have questions about our programs, donations, or volunteering? We'd love to hear from you."}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">

        {/* ── Info Cards ── */}
        <div className="lg:col-span-1 space-y-5">
          {infoCards.map((card, i) => (
            <div key={i} className="bg-chalk border border-white/10 rounded-card p-5 hover-lift group transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${card.color}`}>
                  <card.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-base mb-1">{card.title}</h3>
                  <p className="text-sm text-slate leading-relaxed break-words">{card.value}</p>
                  {card.image && (
                    <img
                      src={card.image}
                      alt="Our Office"
                      className="w-full h-28 object-cover rounded-xl mt-3 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Social Links */}
          {(content.contact_facebook || content.contact_instagram || content.contact_twitter) && (
            <div className="bg-chalk border border-white/10 rounded-card p-5">
              <h3 className="font-display font-bold text-base mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {fbUrl !== "#" && (
                  <a href={fbUrl} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-500/15 text-blue-400 flex items-center justify-center hover:bg-blue-500/30 transition-colors">
                    <FiFacebook size={16} />
                  </a>
                )}
                {igUrl !== "#" && (
                  <a href={igUrl} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-pink-500/15 text-pink-400 flex items-center justify-center hover:bg-pink-500/30 transition-colors">
                    <FiInstagram size={16} />
                  </a>
                )}
                {twUrl !== "#" && (
                  <a href={twUrl} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-sky-500/15 text-sky-400 flex items-center justify-center hover:bg-sky-500/30 transition-colors">
                    <FiTwitter size={16} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Contact Form ── */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-chalk border border-white/10 rounded-card p-6 md:p-8 space-y-5 shadow-sm">

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Full Name *</label>
                <input name="name" required value={form.name} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-transparent" />
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-transparent" />
              </div>
              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-transparent" />
              </div>
              {/* Inquiry Type */}
              <div>
                <label className="block text-sm font-semibold mb-2">Inquiry Type</label>
                <select name="inquiryType" value={form.inquiryType} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-transparent">
                  {INQUIRY_TYPES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors bg-transparent" />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2 flex justify-between">
                <span>Message *</span>
                <span className={`text-xs ${charCount > 450 ? "text-terracotta" : "text-slate"}`}>{charCount}/500</span>
              </label>
              <textarea name="message" required rows={5} maxLength={500}
                value={form.message} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-white/10 focus:border-marigold focus:bg-white/[0.04] outline-none transition-colors resize-none bg-transparent" />
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-semibold mb-2">Attachment (Optional)</label>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-4 hover:border-marigold/60 transition-colors">
                <input type="file" id="attachment" onChange={handleFileChange} className="hidden" accept="image/*,.pdf,.doc,.docx" />
                <label htmlFor="attachment" className="cursor-pointer flex flex-col items-center justify-center py-1">
                  <FiUpload className="text-2xl mb-2 text-marigold" />
                  <span className="text-sm text-slate">Click to upload document or image (max 5MB)</span>
                </label>
              </div>
              {previewUrl && <img src={previewUrl} alt="Preview" className="h-24 rounded-lg object-cover mt-3" />}
              {form.attachment && !previewUrl && (
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1"><FiCheck />{form.attachment.name}</p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading || submitted}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-marigold to-terracotta text-white font-bold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-marigold/30 transition-all disabled:opacity-60 w-full sm:w-auto">
              {submitted ? <>✅ Message Sent!</> : loading ? "Sending..." : <><FiSend /> Send Message</>}
            </button>
          </form>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-card overflow-hidden border border-white/10 h-80 relative">
          <iframe title="Office Location" src={mapUrl} className="w-full h-full" loading="lazy" />
          <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {mapLabel}
          </div>
        </div>
      </section>
    </div>
  );
}