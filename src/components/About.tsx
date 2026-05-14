import { motion } from "motion/react";

export default function About() {
  return (
    <section id="about" className="bg-bg py-20 md:py-40 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">About Us</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-display leading-tight mb-10">
              Transforming <span className="italic">Vision</span> into <span className="italic">Impact</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <p className="text-xl md:text-2xl text-text-primary/90 leading-relaxed font-light">
              Axoweb is an AI-native systems company focused on building scalable digital infrastructure for modern founders and businesses.
            </p>
            <p className="text-lg text-muted leading-relaxed">
              We combine clean architecture, intelligent automations, and cutting-edge AI. From workflow automation to complex application systems, we replace manual operations with connected digital ecosystems to give you maximum leverage.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
