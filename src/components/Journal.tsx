import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const ENTRIES = [
  {
    title: "The nuance of digital typography",
    readTime: "5 min read",
    date: "MAR 2026",
    image: "https://images.unsplash.com/photo-1512486133939-0c44b0c5d4a5?auto=format&fit=crop&q=80&w=200",
  },
  {
    title: "Minimalism in high-end design",
    readTime: "4 min read",
    date: "FEB 2026",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=200",
  },
  {
    title: "Building motion systems with GSAP",
    readTime: "8 min read",
    date: "JAN 2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=200",
  },
  {
    title: "The future of interactive interfaces",
    readTime: "6 min read",
    date: "DEC 2025",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=200",
  },
];

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
           className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Recent Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display leading-tight mb-6">
              Recent <span className="italic font-display">thoughts</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              A collection of insights, experiences, and technical explorations.
            </p>
          </div>
          <button className="text-sm font-medium text-text-primary tracking-wide hover:opacity-70 transition-opacity">
            View all journal
          </button>
        </motion.div>

        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, idx) => (
            <motion.div
              key={entry.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-4 sm:p-5 bg-surface/30 hover:bg-surface border border-stroke rounded-[2rem] sm:rounded-full transition-all duration-500 cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-stroke shrink-0">
                   <img src={entry.image} alt={entry.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg sm:text-xl font-medium tracking-tight text-text-primary group-hover:pl-2 transition-all">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-4 text-[10px] text-muted tracking-widest uppercase">
                    <span>{entry.readTime}</span>
                    <div className="w-1 h-1 rounded-full bg-stroke" />
                    <span>{entry.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end sm:pr-4">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-stroke flex items-center justify-center group-hover:bg-text-primary group-hover:border-transparent transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-text-primary group-hover:text-bg transition-colors" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
