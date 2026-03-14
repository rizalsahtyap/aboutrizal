"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Works", href: "#works" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  return (
    <>
      {/* Floating Navbar */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-[60] flex items-center justify-between mix-blend-difference text-white"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <Link href="/" className="font-syne font-bold text-xl uppercase tracking-wider">
          Rizal.
        </Link>
        
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 font-manrope text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
        >
          Menu <Menu size={20} />
        </button>
      </motion.nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[70] bg-[#111] text-white flex flex-col justify-between p-6 md:p-12"
          >
            <div className="flex justify-between items-center mt-6 w-[90%] max-w-7xl mx-auto mb-10">
              <span className="font-syne font-bold text-xl uppercase tracking-wider">
                Rizal.
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 font-manrope text-sm uppercase tracking-widest hover:opacity-70 transition-opacity"
              >
                Close <X size={20} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center w-[90%] max-w-7xl mx-auto">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.76, 0, 0.24, 1],
                      delay: isOpen ? 0.3 + i * 0.1 : 0,
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-6xl md:text-8xl lg:text-[10rem] font-syne font-bold uppercase hover:text-white/50 transition-colors leading-[0.9]"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="w-[90%] max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6 text-white/50 font-manrope text-sm pb-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="max-w-xs"
              >
                <p>Someone who still learning.</p>
                <p>Just a 20-something trying to figure out life while everything feels like a question mark.</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-col md:text-right"
              >
                <p>Mari berdiskusi</p>
                <a href="https://wa.me/6281217073223" className="hover:text-white transition-colors">
                  +62 812 1707 3223
                </a>
                <a href="mailto:hello@rizal.com" className="hover:text-white transition-colors">
                  Contact Me
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
