"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const movies = [
  { title: "The Dark Knight", year: "2008", image: "/hobbies/TheDarkKnight.jpg" },
  { title: "Whiplash", year: "2014", image: "/hobbies/whiplash.jpg" },
  { title: "Zodiac", year: "2007", image: "/hobbies/zodiac.jpg" },
];

const songs = [
  { title: "Bitter Sweet Symphony", artist: "The Verve", image: "/hobbies/bss.jpg" },
  { title: "Let Down", artist: "Radiohead", image: "/hobbies/let-down.jpg" },
  { title: "Let It Happen", artist: "Tame Impala", image: "/hobbies/LetItHappen.jpg" },
];

const hobbies = ["Watching Movies", "Listening to Music"];

interface HoverItem {
  image: string;
  label: string;
}

function HoverListItem({
  label,
  sublabel,
  image,
  onEnter,
  onLeave,
  index,
}: {
  label: string;
  sublabel?: string;
  image: string;
  onEnter: (item: HoverItem) => void;
  onLeave: () => void;
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseEnter={() => onEnter({ image, label })}
      onMouseLeave={onLeave}
      className="group flex items-center justify-between py-3 border-b border-white/5 cursor-default relative overflow-hidden"
    >
      {/* Hover background sweep */}
      <div className="absolute inset-0 bg-white/3 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-in-out rounded" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-300" />
        <span className="font-syne text-lg text-white/80 group-hover:text-white transition-colors duration-300">
          {label}
        </span>
      </div>

      {sublabel && (
        <span className="relative z-10 font-manrope text-xs text-white/30 group-hover:text-white/50 transition-colors duration-300">
          {sublabel}
        </span>
      )}
    </motion.li>
  );
}

export default function Hobbies() {
  const [hovered, setHovered] = useState<HoverItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleEnter = (item: HoverItem) => setHovered(item);
  const handleLeave = () => setHovered(null);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="py-24 px-6 md:px-12 bg-[#0a0a0a] text-white relative"
    >
      {/* Floating image that follows cursor */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered.image}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed pointer-events-none z-50"
            style={{
              left: mousePos.x + 24,
              top: mousePos.y - 60,
            }}
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10"
              style={{ width: 180, height: 230 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hovered.image}
                alt={hovered.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* Hobbies */}
        <div>
          <h4 className="font-syne text-3xl font-bold mb-8 uppercase tracking-wider">Hobbies</h4>
          <ul className="space-y-4 font-manrope text-lg text-white/70">
            {hobbies.map((hobby, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-white/20" />
                {hobby}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Favorites */}
        <div>
          <h4 className="font-syne text-3xl font-bold mb-8 uppercase tracking-wider">Favorites</h4>

          <div className="space-y-8">
            {/* Movies */}
            <div>
              <p className="font-manrope text-sm uppercase text-white/40 mb-3 tracking-widest">Movies</p>
              <ul>
                {movies.map((movie, i) => (
                  <HoverListItem
                    key={movie.title}
                    label={movie.title}
                    sublabel={movie.year}
                    image={movie.image}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                    index={i}
                  />
                ))}
              </ul>
            </div>

            {/* Songs */}
            <div>
              <p className="font-manrope text-sm uppercase text-white/40 mb-3 tracking-widest">Songs</p>
              <ul>
                {songs.map((song, i) => (
                  <HoverListItem
                    key={song.title}
                    label={song.title}
                    sublabel={song.artist}
                    image={song.image}
                    onEnter={handleEnter}
                    onLeave={handleLeave}
                    index={i}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
