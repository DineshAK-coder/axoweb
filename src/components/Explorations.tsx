import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const EXPLORATIONS = [
  { id: 1, title: "Meredith 2K26", image: "/site1.png", link: "https://m2k26.vercel.app/" },
  { id: 2, title: "Dawoodiyya", image: "/site2.png", link: "https://dawoodiyya.in/" },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const handleProjectClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  useGSAP(() => {
    // Pinning the center content
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: contentRef.current,
      pinSpacing: false,
    });

    // Parallax columns
    gsap.to(leftColRef.current, {
      y: -200,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(rightColRef.current, {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section id="portfolio" ref={containerRef} className="relative min-h-[300vh] bg-bg overflow-hidden border-t border-stroke">
      {/* Layer 1: Pinned Center */}
      <div ref={contentRef} className="sticky top-0 h-screen w-full flex items-center justify-center z-10 pointer-events-none">
        <div className="text-center max-w-xl px-6 pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-[10px] text-muted uppercase tracking-[0.4em] font-bold">Portfolio</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display italic leading-tight mb-8">
            Past <br /> Projects
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-10 max-w-sm mx-auto">
            A collective of abstract ideas, experiments, and technical visions captured through digital mediums.
          </p>
          <button className="group flex items-center gap-3 mx-auto text-[10px] font-bold uppercase tracking-widest text-text-primary hover:text-accent-start transition-colors">
            VIEW ON DRIBBBLE <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Layer 2: Parallax Columns */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 h-full flex justify-between gap-12 md:gap-40 h-full py-20 pointer-events-none">
          {/* Left Column */}
          <div ref={leftColRef} className="flex-1 space-y-40 mt-40">
            {EXPLORATIONS.slice(0, 1).map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleProjectClick(item.link)}
                className="group relative aspect-square max-w-[320px] mx-auto pointer-events-auto cursor-pointer transition-transform hover:scale-105 hover:rotate-2"
              >
                <div className="absolute inset-0 bg-surface rounded-2xl overflow-hidden border border-white/5">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-6 left-6 text-[10px] font-bold uppercase tracking-widest text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="flex-1 space-y-40 -mt-20">
            {EXPLORATIONS.slice(1, 2).map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleProjectClick(item.link)}
                className="group relative aspect-square max-w-[320px] mx-auto pointer-events-auto cursor-pointer transition-transform hover:scale-105 hover:-rotate-2"
              >
                <div className="absolute inset-0 bg-surface rounded-2xl overflow-hidden border border-white/5">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-6 left-6 text-[10px] font-bold uppercase tracking-widest text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
