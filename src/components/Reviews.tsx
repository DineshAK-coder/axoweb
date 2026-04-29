import { motion } from "motion/react";

const REVIEWS = [
  {
    name: "Alex Rivera",
    role: "CEO, TechFlow",
    text: "Axoweb transformed our vision into a digital masterpiece. Their attention to detail is unparalleled.",
  },
  {
    name: "Sarah Chen",
    role: "Product Lead, Nexus AI",
    text: "Working with this team was a game-changer. They don't just build websites; they build experiences.",
  },
  {
    name: "Marcus Thorne",
    role: "Founder, Horizon Labs",
    text: "The technical depth and creative flair they bring to every project is truly refreshing.",
  },
  {
    name: "Elena Petrov",
    role: "Director, Voda Design",
    text: "Exceptional quality, timely delivery, and a seamless collaborative process. Highly recommended.",
  },
  {
    name: "James Wilson",
    role: "CTO, BitScale",
    text: "They delivered a platform that is not only beautiful but incredibly performant and scalable.",
  },
];

export default function Reviews() {
  // Duplicate reviews for infinite scroll
  const scrollingReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-bg py-24 border-t border-stroke overflow-hidden">
      <div className="mb-16 px-6 text-center">
        <span className="text-[10px] text-muted uppercase tracking-[0.4em] font-bold mb-4 block">Testimonials</span>
        <h2 className="text-4xl md:text-5xl font-display italic text-text-primary">What they say</h2>
      </div>

      <div className="relative">
        {/* Gradients to fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />

        <motion.div
          className="flex gap-8 px-4"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {scrollingReviews.map((review, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[350px] md:w-[450px] p-8 rounded-3xl bg-surface border border-stroke hover:border-accent-start transition-colors group"
            >
              <div className="flex flex-col h-full justify-between">
                <p className="text-muted text-lg leading-relaxed mb-8 italic group-hover:text-text-primary transition-colors">
                  "{review.text}"
                </p>
                <div>
                  <h4 className="text-text-primary font-bold text-sm uppercase tracking-widest">{review.name}</h4>
                  <p className="text-muted text-[10px] uppercase tracking-widest mt-1">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
