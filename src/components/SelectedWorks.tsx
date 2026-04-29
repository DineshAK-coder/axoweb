import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const PROJECTS = [
  {
    title: "EcoSmart Automation",
    category: "Workflow — 2026",
    span: "md:col-span-7",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Nova CRM Integration",
    category: "SaaS — 2025",
    span: "md:col-span-5",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Ethos AI Assistant",
    category: "AI Agent — 2026",
    span: "md:col-span-5",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "TechFest '26 Platform",
    category: "Event Portal — 2026",
    span: "md:col-span-7",
    image: "https://images.unsplash.com/photo-1540575861501-7c00117fb3c9?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function SelectedWorks() {
  return (
    <section id="portfolio" className="bg-bg py-12 md:py-24 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-[10px] text-muted uppercase tracking-[0.4em] font-bold">Portfolio</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display italic leading-tight mb-6">
              Real-world <span className="italic">Impact</span>
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              Explore a range of projects across web development, automation, and AI solutions. Each project reflects a strong focus on performance and quality.
            </p>
          </div>

          <button className="hidden md:inline-flex items-center gap-4 group">
            <span className="text-xs font-bold uppercase tracking-widest text-text-primary">View all work</span>
            <div className="w-12 h-12 rounded-full border border-stroke flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:border-accent-start">
               <ArrowRight className="w-5 h-5 text-text-primary relative z-10 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative bg-surface border border-stroke rounded-[2rem] overflow-hidden aspect-[4/3] md:aspect-auto h-[400px] md:h-[500px]",
                project.span
              )}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Halftone Overlay */}
              <div 
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-bg/70 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
                <span className="text-xs text-muted uppercase tracking-[0.2em] mb-4">{project.category}</span>
                <div className="accent-gradient-border rounded-full p-[1px] mb-6 animate-gradient-shift">
                  <div className="bg-white px-6 py-3 rounded-full">
                    <span className="text-black text-sm font-medium">
                      View — <span className="font-display italic">{project.title}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
