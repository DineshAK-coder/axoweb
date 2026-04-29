import { useRef, useEffect } from "react";
import Hls from "hls.js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

const HLS_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

interface FooterProps {
  onProjectRequest: () => void;
}

export default function Footer({ onProjectRequest }: FooterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useGSAP(() => {
    gsap.to(".marquee-inner", {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  });

  return (
    <footer className="relative bg-bg pt-20 pb-12 overflow-hidden">
      {/* Flipped Video BG */}
      <div className="absolute inset-x-0 top-0 h-[600px] z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-40 scale-y-[-1]"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-bg to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        {/* Marquee */}
        <div ref={marqueeRef} className="overflow-hidden whitespace-nowrap mb-32 border-y border-white/5 py-12">
          <div className="marquee-inner inline-flex items-center gap-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="text-6xl md:text-8xl font-display uppercase tracking-tighter text-white/10 italic">
                Building the future •
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div id="contact" className="flex flex-col items-center text-center gap-12 mb-40">
          <h2 className="text-5xl md:text-8xl font-display leading-tight italic">
            Ready to build <br /> something powerful?
          </h2>
          <p className="text-muted text-lg max-w-md">
            Let’s turn your ideas into scalable digital solutions.
          </p>
          <div className="accent-gradient-border rounded-full p-[1px] hover:scale-110 transition-transform cursor-pointer">
            <button 
              onClick={onProjectRequest}
              className="bg-surface px-12 py-6 rounded-full flex items-center gap-4 text-xl md:text-2xl font-medium text-text-primary w-full"
            >
              Start Your Project <ArrowUpRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-12 mb-32 text-center md:text-left border-y border-white/5 py-20">
          <div>
            <span className="text-[10px] text-muted uppercase tracking-[0.4em] mb-4 block">Email</span>
            <a href="mailto:vishalraajdnd@gmail.com" className="text-xl md:text-2xl text-text-primary hover:text-accent-start transition-colors">
              vishalraajdnd@gmail.com
            </a>
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase tracking-[0.4em] mb-4 block">Phone</span>
            <span className="text-xl md:text-2xl text-text-primary">
              +91 9176257316
            </span>
          </div>
          <div>
            <span className="text-[10px] text-muted uppercase tracking-[0.4em] mb-4 block">Location</span>
            <span className="text-xl md:text-2xl text-text-primary">
              India
            </span>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="border-t border-stroke pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <span className="text-xs text-text-primary font-medium tracking-widest uppercase">Axoweb</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
              <div className="relative w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <span className="text-[10px] text-muted uppercase tracking-[0.2em]">Open for collaborations</span>
          </div>

          <span className="text-[10px] text-muted tracking-widest uppercase">©2026 Axoweb • Building the Future of Digital Experiences</span>
        </div>
      </div>
    </footer>
  );
}
