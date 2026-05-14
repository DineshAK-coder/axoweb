import { motion, useScroll } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/src/lib/utils";

const LINKS = ["Home", "About", "Services", "Contact"];

interface NavbarProps {
  onProjectRequest: () => void;
}

export default function Navbar({ onProjectRequest }: NavbarProps) {
  const { scrollY } = useScroll();
  const [activeTab, setActiveTab] = useState("Home");

  // Handle active tab based on scroll or click
  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">

      <div className={cn(
        "glass-nav transition-all duration-500 pointer-events-auto",
        scrolled ? "scale-95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]" : "scale-100 shadow-xl"
      )}>
        {/* Glass layers */}
        <div className={cn("glass-overlay transition-colors duration-500", scrolled ? "bg-black" : "bg-black/70")} />

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
                  "relative px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 flex items-center justify-center",
                  activeTab === link 
                    ? "bg-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] text-white" 
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                <span className="relative z-10">{link}</span>
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-white/20 mx-3" />

          <button 
            onClick={onProjectRequest}
            className="group relative bg-white/10 text-[12px] font-bold uppercase tracking-wider text-white px-6 py-2.5 rounded-full border border-white/20 flex items-center gap-2 hover:bg-white hover:text-black transition-all mr-1 whitespace-nowrap shrink-0"
          >
            Say hi <span className="text-[12px]">↗</span>
          </button>
        </div>
      </div>

    </nav>
  );
}
