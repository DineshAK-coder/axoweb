import { motion } from "motion/react";

const WHY_US = [
  "Modern tech stack built with latest tools",
  "Performance-focused approach",
  "Clean, minimal, user-friendly UI/UX",
  "End-to-end solutions",
  "Future-ready systems"
];

const PROCESS = [
  { step: "01", title: "Discovery", desc: "Understanding your goals and requirements" },
  { step: "02", title: "Planning", desc: "Defining structure, features, and timelines" },
  { step: "03", title: "Design", desc: "Creating intuitive and modern interfaces" },
  { step: "04", title: "Development", desc: "Building fast and scalable systems" },
  { step: "05", title: "Launch", desc: "Deploying and continuously improving" }
];

export default function Process() {
  return (
    <section className="bg-bg py-20 md:py-40 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display leading-tight mb-12">
              The <span className="italic">Axoweb</span> Edge
            </h2>
            <div className="space-y-6">
              {WHY_US.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 rounded-full bg-accent-start" />
                  <span className="text-lg text-text-primary/80 group-hover:text-text-primary transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Our Process */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Our Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display leading-tight mb-12">
              How we <span className="italic">Build</span>
            </h2>
            <div className="space-y-12">
              {PROCESS.map((item, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <span className="text-xs font-mono text-muted pt-1">{item.step}</span>
                  <div>
                    <h3 className="text-xl font-medium text-text-primary mb-2 group-hover:text-accent-start transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
