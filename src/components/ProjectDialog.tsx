import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDialog({ isOpen, onClose }: ProjectDialogProps) {
  const [pages, setPages] = useState<number>(1);
  const [requirements, setRequirements] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [totalPrice, setTotalPrice] = useState(1500);

  useEffect(() => {
    // 1500 for the first page, 500 for each additional page
    const extraPages = Math.max(0, pages - 1);
    const price = 1500 + extraPages * 500;
    setTotalPrice(price);
  }, [pages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to an API or email service
    const subject = encodeURIComponent(`New Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Project Details:\n------------------\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Number of Pages: ${pages}\n` +
      `Estimated Total: ₹${totalPrice}\n\n` +
      `Requirements:\n${requirements}`
    );
    window.location.href = `mailto:vishalraajdnd@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors text-muted hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <span className="text-[10px] text-accent-start uppercase tracking-[0.4em] font-bold mb-3 block">
                  Project Inquiry
                </span>
                <h3 className="text-3xl font-display italic text-text-primary">
                  Let's estimate your <br /> vision
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-bg border border-stroke rounded-2xl p-4 text-sm text-text-primary placeholder:text-muted/50 focus:border-accent-start outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 00000 00000"
                      className="w-full bg-bg border border-stroke rounded-2xl p-4 text-sm text-text-primary placeholder:text-muted/50 focus:border-accent-start outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="w-full bg-bg border border-stroke rounded-2xl p-4 text-sm text-text-primary placeholder:text-muted/50 focus:border-accent-start outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
                    Project Requirements
                  </label>
                  <textarea
                    required
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    placeholder="Briefly describe what you're looking to build..."
                    className="w-full bg-bg border border-stroke rounded-2xl p-4 text-sm text-text-primary placeholder:text-muted/50 focus:border-accent-start outline-none transition-colors min-h-[80px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
                      Pages
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={pages}
                      onChange={(e) => setPages(parseInt(e.target.value) || 1)}
                      className="w-full bg-bg border border-stroke rounded-2xl p-4 text-sm text-text-primary focus:border-accent-start outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
                      Est. Cost
                    </label>
                    <div className="h-[54px] flex items-center px-4 bg-accent-start/10 border border-accent-start/20 rounded-2xl">
                      <span className="text-accent-start font-display text-lg">
                        ₹{totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full group bg-text-primary text-bg py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-accent-start hover:text-white transition-all transform active:scale-95"
                  >
                    Send Proposal <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-center text-[10px] text-muted uppercase tracking-widest leading-relaxed">
                  Home page: ₹1500 • Additional: ₹500/pg
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
