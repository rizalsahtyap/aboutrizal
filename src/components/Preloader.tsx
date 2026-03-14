"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.floor((currentStep / steps) * 100)));

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1500); // Wait for the clip path animation
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          animate={
            progress === 100
              ? { clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)" }
              : { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
          }
          exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-[#050505] text-white p-6 md:p-12 pointer-events-none"
        >
          <div className="flex justify-between items-end mb-8 overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <h1 className="text-4xl md:text-6xl font-syne font-bold uppercase leading-none">
                Rizal Sahtya
              </h1>
              <h1 className="text-4xl md:text-6xl font-syne font-bold uppercase leading-none">
                Pratama
              </h1>
              <p className="text-sm md:text-xl font-manrope text-white/60 mt-2">
                "Hi! Great to see you."
              </p>
            </motion.div>

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              className="text-6xl md:text-8xl font-syne font-bold leading-none"
            >
              {progress}%
            </motion.div>
          </div>

          <div className="w-full h-[2px] bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
