"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  as?: "section" | "div";
  id?: string;
}

export function AnimatedSection({
  children,
  className = "",
  stagger = false,
  as = "section",
  id,
}: AnimatedSectionProps) {
  const Component = motion[as];

  return (
    <Component
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? container : item}
      className={className}
    >
      {children}
    </Component>
  );
}

export function AnimatedItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
}
