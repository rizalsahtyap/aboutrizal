"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import React, { useState, MouseEvent } from "react";

const projects = [
  {
    title: "Home Page Web",
    category: "Design & Development",
    image: "/projects/project_1.png",
  },
  {
    title: "laravel framework",
    category: "database",
    image: "/projects/project_2.png",
  },
];

export default function Projects() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="works"
      className="relative z-10 w-full min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 md:px-12 rounded-t-[3rem] shadow-2xl overflow-hidden"
    // Added negative margin top visually using relative placement or from parent layout wrapper
    // Actually the prompt says: "wrap all other section after the scroll section pages with a -mt-[100vh]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-syne font-bold uppercase tracking-wide">
              Selected Works
            </h2>
            <p className="font-manrope text-white/50 mt-4 md:text-lg max-w-sm">
              An ongoing collection of my best projects, highlighting digital experiences and interactions.
            </p>
          </motion.div>

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="group flex items-center gap-3 font-manrope uppercase tracking-widest text-sm hover:text-white/70 transition-colors"
          >
            Projects
            <span className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
              <ArrowUpRight size={16} />
            </span>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              onMouseMove={handleMouseMove}
              className="group relative overflow-hidden rounded-2xl bg-white/5 cursor-none"
            >
              {/* Subtle hover gradient glow */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                }}
              />

              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay details */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-6 md:p-8">
                  <div className="flex justify-between items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-manrope text-xs md:text-sm uppercase tracking-widest bg-white text-black px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center transform -rotate-45 group-hover:rotate-0 transition-transform duration-500 delay-100">
                      <ArrowUpRight size={20} />
                    </span>
                  </div>

                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <h3 className="text-3xl md:text-5xl font-syne font-bold">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
