"use client";

import { useState, useEffect } from "react";
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

interface FavItem {
  title: string;
  sublabel: string;
  image: string;
}

function FavoriteList({
  items,
  activeIndex,
  onSelect,
}: {
  items: FavItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ul>
      {items.map((item, i) => (
        <motion.li
          key={item.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          onClick={() => onSelect(i)}
          className={`group flex items-center justify-between py-3 border-b border-white/5 cursor-pointer relative overflow-hidden transition-colors duration-300 ${
            activeIndex === i ? "text-white" : "text-white/50"
          }`}
        >
          {/* Active background sweep */}
          <div
            className={`absolute inset-0 bg-white/5 origin-left transition-transform duration-500 ease-in-out rounded ${
              activeIndex === i ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
            }`}
          />

          <div className="relative z-10 flex items-center gap-4">
            <div
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                activeIndex === i ? "bg-white" : "bg-white/20 group-hover:bg-white/60"
              }`}
            />
            <span className="font-syne text-lg">{item.title}</span>
          </div>

          <span className="relative z-10 font-manrope text-xs text-white/30">
            {item.sublabel}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

function PreviewPanel({ item }: { item: FavItem }) {
  return (
    <div className="relative w-full h-full min-h-[280px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={item.image}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl overflow-hidden ring-1 ring-white/10"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Label di bawah */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-syne text-white font-semibold text-base leading-tight">
              {item.title}
            </p>
            <p className="font-manrope text-white/50 text-xs mt-1">
              {item.sublabel}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Hobbies() {
  const [activeMovie, setActiveMovie] = useState(0);
  const [activeSong, setActiveSong] = useState(0);

  const movieItems: FavItem[] = movies.map((m) => ({
    title: m.title,
    sublabel: m.year,
    image: m.image,
  }));

  const songItems: FavItem[] = songs.map((s) => ({
    title: s.title,
    sublabel: s.artist,
    image: s.image,
  }));

  return (
    <section className="py-24 px-6 md:px-12 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* Hobbies */}
        <div>
          <h4 className="font-syne text-3xl font-bold mb-8 uppercase tracking-wider">
            Hobbies
          </h4>
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
          <h4 className="font-syne text-3xl font-bold mb-10 uppercase tracking-wider">
            Favorites
          </h4>

          <div className="space-y-16">

            {/* Movies */}
            <div>
              <p className="font-manrope text-sm uppercase text-white/40 mb-5 tracking-widest">
                Movies
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* List */}
                <FavoriteList
                  items={movieItems}
                  activeIndex={activeMovie}
                  onSelect={setActiveMovie}
                />
                {/* Preview panel */}
                <PreviewPanel item={movieItems[activeMovie]} />
              </div>
            </div>

            {/* Songs */}
            <div>
              <p className="font-manrope text-sm uppercase text-white/40 mb-5 tracking-widest">
                Songs
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* List */}
                <FavoriteList
                  items={songItems}
                  activeIndex={activeSong}
                  onSelect={setActiveSong}
                />
                {/* Preview panel */}
                <PreviewPanel item={songItems[activeSong]} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}