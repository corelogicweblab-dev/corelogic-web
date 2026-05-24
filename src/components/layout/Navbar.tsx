"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { CONTACT_HREF } from "@/lib/site-config";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "holo-glass border-b border-cyan-400/20 shadow-lg shadow-cyan-500/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-12 lg:px-20">
        <Logo size="md" />

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link
                href={link.href}
                className="group relative font-[family-name:var(--font-orbitron)] text-[11px] font-semibold tracking-widest text-slate-400 uppercase transition-colors hover:text-cyan-400"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href={CONTACT_HREF} className="btn-primary hidden !text-[11px] sm:inline-flex">
            Start Project
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            className="rounded-lg border border-cyan-400/30 bg-slate-900/60 p-2 text-cyan-300 backdrop-blur lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="holo-glass border-t border-cyan-400/20 lg:hidden"
          >
            <ul className="flex flex-col gap-3 px-6 py-5">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-[family-name:var(--font-orbitron)] text-sm font-semibold tracking-wide text-slate-300 uppercase hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <li>
                <Link href={CONTACT_HREF} onClick={() => setMobileOpen(false)} className="btn-primary w-full">
                  Start Project
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
