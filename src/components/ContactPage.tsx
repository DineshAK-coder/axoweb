import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();
  const [needs, setNeeds] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [briefInfo, setBriefInfo] = useState("");

  const NEEDS_OPTIONS = [
    "AI Workflow Systems",
    "CRM Intelligence Layer",
    "Scalable Web App",
    "Android Application",
    "Dashboard System",
    "Automation Pipeline",
    "Other"
  ];

  const toggleNeed = (need: string) => {
    setNeeds(prev => 
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New System Inquiry from ${name}`);
    const body = encodeURIComponent(
      `System Architecture Details:\n--------------------------\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n\n` +
      `Selected Needs: ${needs.join(", ") || "None selected"}\n\n` +
      `Brief Info:\n${briefInfo}`
    );
    window.location.href = `mailto:vishalraajdnd@gmail.com,studyusage2008@gmail.com?subject=${subject}&body=${body}`;
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary px-6 py-24 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors mb-16"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-[10px] text-accent-start uppercase tracking-[0.4em] font-bold mb-4 block">
            System Architecture Inquiry
          </span>
          <h1 className="text-5xl md:text-7xl font-display italic leading-tight mb-6">
            Let's build your <br /> <span className="not-italic text-white">infrastructure.</span>
          </h1>
          <p className="text-muted text-sm md:text-base max-w-lg leading-relaxed">
            We don't just build websites; we design intelligent workflows, AI automations, and scalable systems for modern founders. Tell us what you're trying to achieve.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Needs Selection */}
          <div className="space-y-6">
            <h3 className="text-sm uppercase tracking-widest text-white font-medium">What do you need to build?</h3>
            <div className="flex flex-wrap gap-3">
              {NEEDS_OPTIONS.map(option => (
                <button
                  type="button"
                  key={option}
                  onClick={() => toggleNeed(option)}
                  className={`px-5 py-3 rounded-full text-xs font-medium transition-all duration-300 border ${
                    needs.includes(option)
                      ? "bg-accent-start border-accent-start text-white shadow-[0_0_20px_rgba(137,170,204,0.3)]"
                      : "bg-surface border-stroke text-muted hover:text-white hover:border-white/20"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-surface border border-stroke rounded-2xl p-4 text-sm text-text-primary placeholder:text-muted/50 focus:border-accent-start outline-none transition-colors"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 00000 00000"
                className="w-full bg-surface border border-stroke rounded-2xl p-4 text-sm text-text-primary placeholder:text-muted/50 focus:border-accent-start outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="founder@startup.com"
              className="w-full bg-surface border border-stroke rounded-2xl p-4 text-sm text-text-primary placeholder:text-muted/50 focus:border-accent-start outline-none transition-colors"
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-muted font-bold">
              Brief Info / Architecture Requirements
            </label>
            <textarea
              required
              value={briefInfo}
              onChange={(e) => setBriefInfo(e.target.value)}
              placeholder="Briefly describe your current operational bottlenecks or the system you want to build..."
              className="w-full bg-surface border border-stroke rounded-2xl p-5 text-sm text-text-primary placeholder:text-muted/50 focus:border-accent-start outline-none transition-colors min-h-[120px] resize-none"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full group bg-white text-black py-5 rounded-2xl font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-accent-start hover:text-white transition-all transform active:scale-95"
            >
              Initialize System <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[10px] text-muted mt-4 uppercase tracking-widest">
              We will contact you shortly after receiving this brief.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
