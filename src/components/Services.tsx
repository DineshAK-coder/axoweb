import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const SERVICES = [
  {
    title: "Website Development",
    description: "We architect and engineer high-performance, visually striking digital experiences. From lightning-fast landing pages to complex, responsive web applications, our custom development process ensures your brand stands out with flawless functionality across every device.",
    items: ["Business websites", "Portfolio sites", "Landing pages", "Custom web applications"],
    image: "/services/websiteDevelopment.jpeg"
  },
  {
    title: "Automation Solutions",
    description: "Reclaim your time and drastically scale your operations by eliminating redundant tasks. We integrate intelligent automation workflows and seamless data pipelines that connect your tools, turning manual bottlenecks into frictionless systems.",
    items: ["Workflow automation", "CRM integrations", "Data pipelines", "No-code/low-code solutions"],
    image: "/services/automation.jpeg"
  },
  {
    title: "AI Agents & Tools",
    description: "Step into the future of business with custom artificial intelligence integrations. We deploy advanced AI chatbots, predictive analytics tools, and autonomous agents designed to hyper-personalize customer interactions and accelerate your core decision-making.",
    items: ["AI chatbots", "Custom AI agents", "Business intelligence tools", "AI integrations"],
    image: "/services/agent_and_tools.jpeg"
  },
  {
    title: "Custom Digital Solutions",
    description: "Your most ambitious ideas require engineering that goes beyond off-the-shelf software. We collaborate with you to design, prototype, and build scalable, proprietary digital ecosystems—whether it's a disruptive SaaS platform or an intricate internal dashboard.",
    items: ["SaaS prototypes", "Internal tools", "Dashboard systems", "Scalable architectures"],
    image: "/services/custom_tech_solutions.jpeg"
  },
  {
    title: "Event & Cultural Websites",
    description: "Transform the way attendees experience your events. We build robust, high-traffic cultural platforms equipped with interactive schedules, secure live ticketing, and real-time updates to ensure your festival or convention runs flawlessly from launch to closing night.",
    items: ["Event landing pages", "Registration systems", "Ticketing management", "Live updates"],
    image: "/services/event_and_culturals.jpeg"
  },
  {
    title: "Digital Marketing",
    description: "Amplify your brand's reach with precision-targeted digital campaigns. We leverage data-driven SEO, dynamic social advertising, and high-conversion content strategies to ensure your platform doesn't just look incredible, but dominates the market.",
    items: ["SEO Optimization", "Social Campaigns", "Performance Marketing", "Content Strategy"],
    image: "/services/digital_marketing.jpeg"
  }
];

export default function Services() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const total = SERVICES.length;
  const anglePerItem = 120; // Massive gap to prevent any overlap
  
  // Right Dial (Images): Rotates Clockwise
  const rightDialRotate = useTransform(scrollYProgress, [0, 1], [0, (total - 1) * anglePerItem]);
  
  // Left Dial (Text): Rotates Counter-Clockwise
  const leftDialRotate = useTransform(scrollYProgress, [0, 1], [0, -(total - 1) * anglePerItem]);

  return (
    <section 
      id="services" 
      ref={containerRef} 
      className="relative bg-[#050505]"
      style={{ height: "900vh" }} // Even more scroll depth for spatial precision
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex bg-[#030303]">
        
        {/* Global Section Tag */}
        <div className="absolute top-10 left-10 md:left-20 z-50 pointer-events-none">
          <span className="text-[10px] md:text-xs text-accent-start uppercase tracking-[0.4em] font-medium">Our Services</span>
        </div>

        {/* Left Column - The Text Dial */}
        <motion.div 
          style={{ x: "-50%", y: "-50%", rotate: leftDialRotate }}
          className="absolute top-1/2 left-[-35vw] md:left-[-20vw] w-[200vw] h-[200vw] md:w-[100vw] md:h-[100vw] rounded-full border border-white/5 z-20 will-change-transform"
        >
           {/* Hub */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-1 h-1 bg-white/50 rounded-full" />
           </div>

           {SERVICES.map((service, index) => {
             const baseAngle = index * anglePerItem;
             return (
               <OrbitingTextCard 
                 key={service.title} 
                 service={service} 
                 index={index}
                 total={total}
                 baseAngle={baseAngle} 
                 dialRotate={leftDialRotate} 
                 progress={scrollYProgress}
                 radius="clamp(400px, 50vw, 1200px)"
               />
             );
           })}
        </motion.div>

        {/* Right Column - The Image Dial */}
        <motion.div 
          style={{ x: "-50%", y: "-50%", rotate: rightDialRotate }}
          className="absolute top-1/2 left-[135vw] md:left-[120vw] w-[200vw] h-[200vw] md:w-[100vw] md:h-[100vw] rounded-full border border-white/5 z-10 will-change-transform"
        >
           {/* Hub */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-1 h-1 bg-white/50 rounded-full" />
           </div>

           {SERVICES.map((service, index) => {
             const baseAngle = 180 - index * anglePerItem;
             return (
               <OrbitingImageCard 
                 key={service.title} 
                 service={service}
                 index={index}
                 total={total}
                 baseAngle={baseAngle} 
                 dialRotate={rightDialRotate} 
                 progress={scrollYProgress}
                 radius="clamp(400px, 50vw, 1200px)"
               />
             );
           })}
        </motion.div>
      </div>
    </section>
  );
}

function OrbitingTextCard({ service, index, total, baseAngle, dialRotate, progress, radius }: any) {
  const counterRotate = useTransform(dialRotate, (r: number) => -r - baseAngle);
  
  // Calculate exactly when this item is centered
  const centerPoint = index / (total - 1);
  
  // Narrow range: [center - 0.05, center, center + 0.05]
  const opacity = useTransform(
    progress,
    [centerPoint - 0.05, centerPoint, centerPoint + 0.05],
    [0, 1, 0]
  );
  
  const scale = useTransform(
    progress,
    [centerPoint - 0.05, centerPoint, centerPoint + 0.05],
    [0.8, 1, 0.8]
  );

  return (
    <div 
      className="absolute top-1/2 left-1/2 w-[70vw] md:w-[35vw] -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `rotate(${baseAngle}deg) translateX(${radius})`,
      }}
    >
      <motion.div 
        style={{ rotate: counterRotate, opacity, scale }}
        className="w-full text-left will-change-transform pl-10"
      >
        <span className="font-display italic text-5xl md:text-7xl text-accent-start/80 block mb-6">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-display tracking-tight text-white mb-6 leading-[1.1]">
          {service.title}
        </h3>
        <p className="text-white text-sm md:text-base leading-relaxed max-w-sm font-light mb-6">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.items.map((item: string) => (
            <span key={item} className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-md text-[10px] text-white uppercase tracking-widest font-medium">
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function OrbitingImageCard({ service, index, total, baseAngle, dialRotate, progress, radius }: any) {
  const counterRotate = useTransform(dialRotate, (r: number) => -r - baseAngle);
  
  // Calculate exactly when this item is centered
  const centerPoint = index / (total - 1);
  
  // Narrow range: [center - 0.05, center, center + 0.05]
  const opacity = useTransform(
    progress,
    [centerPoint - 0.05, centerPoint, centerPoint + 0.05],
    [0, 1, 0]
  );
  
  const scale = useTransform(
    progress,
    [centerPoint - 0.05, centerPoint, centerPoint + 0.05],
    [0.9, 1, 0.9]
  );

  return (
    <div 
      className="absolute top-1/2 left-1/2 w-[75vw] h-[45vh] md:w-[40vw] md:h-[55vh] -translate-x-1/2 -translate-y-1/2"
      style={{
        transform: `rotate(${baseAngle}deg) translateX(${radius})`,
      }}
    >
      <motion.div 
        style={{ rotate: counterRotate, opacity, scale }}
        className="w-full h-full rounded-[2.5rem] overflow-hidden bg-transparent border border-white/5 will-change-transform relative group"
      >
         <img 
           src={service.image} 
           alt={service.title} 
           className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out" 
         />
      </motion.div>
    </div>
  );
}
