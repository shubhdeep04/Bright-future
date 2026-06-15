import { FiX } from "react-icons/fi";

export default function AdminModal({ title, onClose, children, wide }) {
  return (
    <div className="fixed inset-0 bg-ink/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className={`bg-paper rounded-card w-full p-6 md:p-8 relative animate-fade-up my-8 ${wide ? "max-w-2xl" : "max-w-md"}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate hover:text-ink">
          <FiX size={22} />
        </button>
        <h3 className="font-display font-bold text-xl mb-5">{title}</h3>
        {children}
      </div>
    </div>
  );
}
