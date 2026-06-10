'use client';
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
  from?: Direction;
  distance?: number;
  once?: boolean;
}

const directionOffset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
};

export function FadeIn({
  children,
  className,
  stagger = 0.08,
  duration = 0.5,
  delay = 0,
  from = 'up',
  distance = 24,
  once = true,
}: FadeInProps) {
  const offset = directionOffset[from];
  const scaledOffset = {
    x: offset.x ? (offset.x / 24) * distance : 0,
    y: offset.y ? (offset.y / 24) * distance : 0,
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, ...scaledOffset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={item}>{children}</motion.div>
      }
    </motion.div>
  );
}
