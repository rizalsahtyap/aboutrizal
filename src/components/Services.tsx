"use client";

import { motion } from "motion/react";

const services = [
  {
    title: "Frontend",
    description: "Exploring Next.js, Tailwind, and how to make things move nicely on screen.",
  },
  {
    title: "Design",
    description: "Learning to care about spacing, typography, and why some things just look good.",
  },
  {
    title: "Motion",
    description: "Obsessed with scroll animations and the way transitions can change how something feels.",
  },
];

export default function Services() {
  return (
    <section className="py-32 px-6 md:px-12 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        <div className="md:w-1/3">
          <motion.h4
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne text-4xl md:text-5xl font-bold uppercase tracking-wider sticky top-32"
          >
            Currently Into
          </motion.h4>
        </div>

        <div className="md:w-2/3 space-y-16">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="border-t border-white/20 pt-8"
            >
              <h5 className="font-syne text-3xl font-semibold mb-6">{service.title}</h5>
              <p className="font-manrope text-white/50 text-lg leading-relaxed max-w-xl">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
