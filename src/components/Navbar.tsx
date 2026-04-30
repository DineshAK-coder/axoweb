import { motion, useScroll, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";

const LINKS = ["Home", "About", "Services", "Contact"];

interface NavbarProps {
  onProjectRequest: () => void;
}

export default function Navbar({ onProjectRequest }: NavbarProps) {
  const { scrollY } = useScroll();
  const [activeTab, setActiveTab] = useState("Home");
  const [clickSequence, setClickSequence] = useState<string[]>([]);
  const [showAnaconda, setShowAnaconda] = useState(false);

  const TARGET_SEQUENCE = ["About", "Contact", "Home", "Services", "About", "Contact", "Home", "Services"];
  const [lastClickTime, setLastClickTime] = useState(0);

  // Handle active tab based on scroll or click
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    
    // Easter Egg Logic
    const now = Date.now();
    let newSequence = [...clickSequence];
    
    // Reset sequence if more than 3 seconds between clicks
    if (now - lastClickTime > 3000) {
      newSequence = [id];
    } else {
      newSequence = [...newSequence, id].slice(-8);
    }
    
    setClickSequence(newSequence);
    setLastClickTime(now);

    if (newSequence.length === 8 && JSON.stringify(newSequence) === JSON.stringify(TARGET_SEQUENCE)) {
      setShowAnaconda(true);
      setClickSequence([]); // Reset after trigger
      setTimeout(() => setShowAnaconda(false), 3000); // Hide after 3 seconds
    }

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
    } else if (id === "Home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setActiveTab(id);
    }
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const unsub = scrollY.on("change", (latest) => {
      setScrolled(latest > 100);
    });
    return () => unsub();
  }, [scrollY]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4">
      {/* Secret Anaconda Display */}
      <AnimatePresence>
        {showAnaconda && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 2, rotate: 10 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="relative flex flex-col items-center gap-8">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-[20vw] aspect-square rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl relative"
              >
                <img 
                  src="https://i.ibb.co/39znfxkt/image.png" 
                  alt="Anaconda"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.log("Easter egg image load failed from URL, trying local fallback...");
                    e.currentTarget.src = "/ANACONDA.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              <div className="relative">
                <motion.h1 
                  initial={{ letterSpacing: "2em", opacity: 0 }}
                  animate={{ letterSpacing: "0.2em", opacity: 1 }}
                  transition={{ duration: 1, ease: "circOut" }}
                  className="text-[10vw] font-display italic font-black text-white mix-blend-difference"
                >
                  ANACONDA
                </motion.h1>
                <div className="absolute inset-0 bg-accent-start blur-[100px] opacity-30 -z-10 animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn(
        "glass-nav transition-all duration-500",
        scrolled ? "scale-95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]" : "scale-100 shadow-xl"
      )}>
        {/* Glass layers */}
        <div className="glass-overlay bg-black/70" />

        <div className="glass-content flex items-center gap-1">
          {/* Logo & Brand */}
          <div 
            onClick={() => scrollTo("Home")}
            className="group flex items-center cursor-pointer ml-1"
          >
            <div className="relative w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
               <img 
                src="/logo.png" 
                alt="Axoweb Logo" 
                className="w-8 h-8 object-contain z-10 group-hover:scale-110 transition-all"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = '<span class="font-display italic text-[11px] text-white">AT</span>';
                }}
              />
              <div className="absolute inset-0 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors" />
            </div>
            
            <div className="max-w-0 opacity-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:max-w-[250px] group-hover:opacity-100 group-hover:ml-3">
              <span className="text-[11px] font-display italic tracking-[0.1em] whitespace-nowrap text-white">
                Axoweb Technologies
              </span>
            </div>
          </div>

          <div className="w-px h-6 bg-white/20 mx-3" />

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            {LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={cn(
                  "nav-item-glass group/btn",
                  activeTab === link && "active"
                )}
              >
                <span className={cn(
                  "transition-colors",
                  activeTab === link ? "text-white" : "text-white/60 group-hover/btn:text-white"
                )}>
                  {link}
                </span>
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-white/20 mx-3" />

          {/* Action Button */}
          <button 
            onClick={onProjectRequest}
            className="group relative bg-white/10 text-[11px] font-bold uppercase tracking-wider text-white px-5 py-2 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white hover:text-black transition-all mr-1"
          >
            Say hi <span className="text-[10px]">↗</span>
          </button>
        </div>
      </div>

      {/* SVG Filters for Liquid Glass Effect */}
      <svg style={{ display: 'none' }}>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="0.02" result="blur" />
          <feDisplacementMap in="SourceGraphic" in2="blur" scale="77" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="btn-glass" primitiveUnits="objectBoundingBox">
          <feImage href="data:image/png;base64,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" x="0" y="0" width="1" height="1" result="map"></feImage>
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur"></feGaussianBlur>
          <feDisplacementMap id="disp" in="blur" in2="map" scale="1" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
    </nav>
  );
}
