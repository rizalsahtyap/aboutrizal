"use client";

import { motion } from "motion/react";

const words = [
  "vibe coding",
];

export default function Marquee() {
  return (
    <div className="w-full bg-[#111] overflow-hidden py-10 rotate-[-2deg] scale-110 flex items-center shadow-2xl relative z-20">
      <motion.div
        className="flex whitespace-nowrap gap-12"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 15,
        }}
        // Using enough repetitions for infinite scroll visually
      >
        {Array(10).fill(words).flat().map((word, i) => (
          <span
            key={i}
            className="font-syne font-black text-5xl md:text-7xl uppercase text-transparent tracking-widest"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.4)",
            }}
          >
            {word}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
