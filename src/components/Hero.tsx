import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];
const HLS_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

interface HeroProps {
  onProjectRequest: () => void;
}

export default function Hero({ onProjectRequest }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(HLS_URL);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = HLS_URL;
      }
    }

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".name-reveal", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      delay: 0.1,
    })
      .from(".blur-in", {
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
        duration: 1,
        stagger: 0.1,
      }, "-=1.0");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-24">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-60"
        />
        <div className="absolute inset-0 video-overlay" />
        <div className="absolute inset-0 halftone opacity-30" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.h2
          className="blur-in text-[10px] md:text-[12px] text-accent-start uppercase tracking-[0.6em] mb-6 font-bold"
        >
          Axoweb Technologies
        </motion.h2>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-[112px] font-display italic leading-[0.85] tracking-tight text-text-primary mb-8 max-w-4xl mx-auto">
          Build Smarter. Scale Faster.
        </h1>

        <p className="blur-in text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          We design high-performance websites, intelligent automations, and AI-powered solutions that help businesses grow, streamline operations, and stay ahead.
        </p>

        <div className="blur-in flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-text-primary text-bg px-10 py-4 rounded-full text-xs font-bold tracking-wide hover:scale-105 transition-transform"
          >
            VIEW PORTFOLIO
          </button>

          <button
            onClick={onProjectRequest}
            className="border border-stroke text-text-primary px-10 py-4 rounded-full text-xs font-bold tracking-wide hover:border-accent-start transition-colors"
          >
            START A PROJECT
          </button>
        </div>
      </div>
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
