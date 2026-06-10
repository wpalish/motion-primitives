'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  splitBy?: 'words' | 'chars';
  className?: string;
  once?: boolean;
}

export function TextReveal({
  text,
  delay = 0,
  duration = 0.6,
  stagger = 0.03,
  splitBy = 'words',
  className,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });

  const tokens = splitBy === 'chars' ? text.split('') : text.split(' ');

  return (
    <span ref={ref} className={className} aria-label={text} style={{ display: 'inline' }}>
      {tokens.map((token, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {token}
            {splitBy === 'words' && i < tokens.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
