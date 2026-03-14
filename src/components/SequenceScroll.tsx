"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowRight } from "lucide-react";

const FRAME_COUNT = 240;

export default function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const onFinish = (imgs: HTMLImageElement[]) => {
      setImages(imgs);
      setIsLoaded(true);
      // Draw frame 0 immediately so canvas isn't blank on load
      requestAnimationFrame(() => {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !imgs[0]) return;
        const canvas = canvasRef.current!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const img = imgs[0];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let w, h, x, y;
        if (canvasRatio > imgRatio) {
          w = canvas.width; h = canvas.width / imgRatio;
          x = 0; y = (canvas.height - h) / 2;
        } else {
          w = canvas.height * imgRatio; h = canvas.height;
          x = (canvas.width - w) / 2; y = 0;
        }
        ctx.drawImage(img, x, y, w, h);
      });
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg?v=2`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) onFinish(loadedImages);
      };
      img.onerror = () => {
        // Count failed images too so we don't block forever
        loadedCount++;
        if (loadedCount === FRAME_COUNT) onFinish(loadedImages);
      };
      loadedImages.push(img);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  const drawFrame = (index: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || images.length === 0 || !images[index]) return;

    const img = images[index];
    const canvas = canvasRef.current!;

    // Object-fit: cover logic
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let w, h, x, y;

    if (canvasRatio > imgRatio) {
      w = canvas.width;
      h = canvas.width / imgRatio;
      x = 0;
      y = (canvas.height - h) / 2;
    } else {
      w = canvas.height * imgRatio;
      h = canvas.height;
      x = (canvas.width - w) / 2;
      y = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, w, h);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      drawFrame(Math.round(latest));
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-draw current frame
        drawFrame(Math.round(frameIndex.get()));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded]);

  // Text overlay opacity arrays
  // Section 1: Center
  const op1 = useTransform(scrollYProgress, [0.01, 0.05, 0.15, 0.2], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.01, 0.05, 0.15, 0.2], [50, 0, 0, -50]);

  // Section 2: Left
  const op2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [-50, 0, 0, -50]);

  // Section 3: Right
  const op3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [50, 0, 0, 50]);

  // Section 4: Center Bottom
  const op4 = useTransform(scrollYProgress, [0.85, 0.9, 0.98, 1], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.85, 0.9, 0.98, 1], [50, 0, 0, -50]);

  return (
    <div ref={containerRef} className="relative w-full bg-black" style={{ height: "500vh" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden text-white">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        {/* Shadow overlays for distinct text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 pointer-events-none" />

        {/* Text Overlays */}
        <div className="absolute inset-0 w-[90%] max-w-7xl mx-auto flex items-center justify-center pointer-events-none">

          {/* Section 1 - 5% */}
          <motion.div
            style={{ opacity: op1, y: y1 }}
            className="absolute text-center flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-7xl font-syne font-bold mb-4 uppercase tracking-widest leading-none">
              RizalSahtya<br />Pratama
            </h2>
            <p className="text-lg md:text-2xl font-manrope font-light tracking-wide text-white/80">
              Still learning
            </p>
          </motion.div>

          {/* Section 2 - 30% */}
          <motion.div
            style={{ opacity: op2, x: x2 }}
            className="absolute left-0 text-left max-w-xl"
          >
            <p className="text-sm md:text-base text-white/50 uppercase tracking-widest mb-4 font-manrope">
              About The Journey
            </p>
            <h3 className="text-3xl md:text-5xl font-syne font-bold leading-tight">
              "Just a 20-something trying to figure out life while everything feels like a question mark."
            </h3>
          </motion.div>

          {/* Section 3 - 60% */}
          <motion.div
            style={{ opacity: op3, x: x3 }}
            className="absolute right-0 text-right max-w-xl"
          >
            <p className="text-sm md:text-base text-white/50 uppercase tracking-widest mb-4 font-manrope">
              
            </p> 
            <h3 className="text-3xl md:text-5xl font-syne font-bold leading-tight">
              "Don't try to be perfect, just do it." 
            </h3>
          </motion.div>

          {/* Section 4 - 90% */}
          <motion.div
            style={{ opacity: op4, y: y4 }}
            className="absolute text-center flex flex-col items-center pointer-events-auto"
          >
            <h2 className="text-5xl md:text-8xl font-syne font-bold mb-6">
              keep going down.
            </h2>
            <a
              href="#contact"
              className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-manrope font-semibold hover:bg-white/90 transition-all duration-300 overflow-hidden relative"
            >
              <span className="relative z-10">Start a Project</span>
              <motion.div
                className="relative z-10 w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300"
              >
                <ArrowRight size={16} />
              </motion.div>
            </a>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
