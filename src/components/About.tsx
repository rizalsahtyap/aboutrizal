"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const text = "A developer still in the learning phase. Currently exploring the combination of code, design, and animation.";

export default function About() {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <section ref={container} id="about" className="py-32 px-6 md:px-12 bg-[#050505] text-white flex items-center min-h-[70vh]">
      <div className="max-w-6xl mx-auto">
        <p className="font-manrope text-sm uppercase tracking-widest text-white/40 mb-12">
          About Me
        </p>
        <h3 className="text-4xl md:text-6xl lg:text-7xl font-syne font-bold leading-tight md:leading-tight flex flex-wrap gap-x-3 gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            
            return (
              <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
            );
          })}
        </h3>
      </div>
    </section>
  );
}

function Word({ word, progress, range }: { word: string; progress: any; range: number[] }) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative inline-block">
      <span className="absolute opacity-10">{word}</span>
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}
