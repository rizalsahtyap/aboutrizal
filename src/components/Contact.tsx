"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useRef, MouseEvent, useState } from "react";

export default function Contact() {
  const container = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.2;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.2;
    setPos({ x, y });
  };

  const whatsappLink = "https://wa.me/6281217073223";

  return (
    <section
      ref={container}
      id="contact"
      className="relative min-h-screen bg-[#050505] text-white flex flex-col justify-end overflow-hidden"
    >
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => { setHovered(false); setPos({ x: 0, y: 0 }) }}
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          className="text-center"
        >
          <p className="font-manrope text-white/50 uppercase tracking-[0.3em] font-semibold mb-6">
            Anything you want to discuss?
          </p>

          <a href={whatsappLink} target="_blank" rel="noreferrer" className="group inline-block">
            <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-syne font-bold leading-none -tracking-[0.02em] hover:text-white/80 transition-colors flex items-center gap-6">
              Let's Talk
              <motion.div
                animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }}
                className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-white text-black flex items-center justify-center"
              >
                <MessageCircle size={48} className="md:w-[64px] md:h-[64px]" />
              </motion.div>
            </h2>
          </a>
        </motion.div>
      </div>

      {/* Footer Area with Reveal */}
      <motion.footer style={{ y }} className="border-t border-white/10 p-6 md:p-12 relative bg-[#0a0a0a]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          
          <div className="font-syne font-bold text-lg md:text-2xl uppercase tracking-widest">
            Rizal Sahtya Pratama
          </div>

          <div className="flex gap-8 font-manrope text-sm uppercase tracking-widest text-white/50">
            <a href="https://www.instagram.com/rizalsahtya/" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="https://wa.me/6281217073223" className="hover:text-white transition-colors">Whatsapp</a>
          </div>

          <div className="font-manrope text-sm text-white/30">
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </div>
          
        </div>

        {/* Big Footer Reveal Text */}
        <h1 className="text-[9vw] font-syne font-black text-center mt-12 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10 uppercase leading-none select-none">
          WHYNOT?
        </h1>
      </motion.footer>
    </section>
  );
}
