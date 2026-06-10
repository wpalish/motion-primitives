'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  translateY?: [string | number, string | number];
  opacity?: [number, number];
  scale?: [number, number];
  blur?: [string, string];
  offset?: [string, string];
  spring?: boolean;
}

export function ScrollReveal({
  children,
  className,
  translateY = ['30px', '0px'],
  opacity = [0, 1],
  scale = [0.97, 1],
  blur = ['6px', '0px'],
  offset = ['start end', 'start 60%'],
  spring = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  const rawY = useTransform(scrollYProgress, [0, 1], translateY);
  const rawOpacity = useTransform(scrollYProgress, [0, 1], opacity);
  const rawScale = useTransform(scrollYProgress, [0, 1], scale);
  const rawBlur = useTransform(scrollYProgress, [0, 1], blur);

  const springCfg = { stiffness: 100, damping: 25, restDelta: 0.001 };
  const y = spring ? useSpring(rawY, springCfg) : rawY;
  const o = spring ? useSpring(rawOpacity, springCfg) : rawOpacity;
  const s = spring ? useSpring(rawScale, springCfg) : rawScale;

  const filter = useTransform(rawBlur, (b) => `blur(${b})`);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, opacity: o, scale: s, filter }}
    >
      {children}
    </motion.div>
  );
}
