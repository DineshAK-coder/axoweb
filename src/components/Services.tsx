import { motion } from "motion/react";
import { Check } from "lucide-react";

const SERVICES = [
  {
    title: "Website Development",
    description: "We create fast, responsive, and visually engaging websites tailored to your brand.",
    items: ["Business websites", "Portfolio sites", "Landing pages", "Custom web applications"]
  },
  {
    title: "Automation Solutions",
    description: "Reduce repetitive work and improve productivity with smart automation.",
    items: ["Workflow automation", "CRM integrations", "Data pipelines", "No-code/low-code solutions"]
  },
  {
    title: "AI Agents & Tools",
    description: "Leverage AI to enhance decision-making and customer experience.",
    items: ["AI chatbots", "Custom AI agents", "Business intelligence tools", "AI integrations"]
  },
  {
    title: "Custom Digital Solutions",
    description: "Have a unique idea? We build tailored solutions to match your needs.",
    items: ["SaaS prototypes", "Internal tools", "Dashboard systems", "Scalable architectures"]
  },
  {
    title: "Event & Cultural Websites",
    description: "We design and develop dynamic websites for college fests and large-scale events.",
    items: ["Event landing pages", "Registration systems", "Ticketing management", "Live updates"]
  }
];

export default function Services() {
  return (
    <section id="services" className="bg-surface/30 py-20 md:py-40 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           viewport={{ once: true }}
           className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display leading-tight">
            Specialized in <span className="italic">Digital Excellence</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-bg border border-stroke hover:border-accent-start transition-colors flex flex-col gap-6"
            >
              <h3 className="text-2xl font-medium tracking-tight text-text-primary">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
              <ul className="flex flex-col gap-3 mt-auto pt-6 border-t border-stroke/50">
                {service.items.map(item => (
                  <li key={item} className="flex items-center gap-3 text-xs text-muted">
                    <Check className="w-3 h-3 text-accent-start" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
