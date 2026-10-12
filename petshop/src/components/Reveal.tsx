import type { ReactNode } from "react";
import { motion, useReducedMotion as useMotionReducedMotion } from "motion/react";
import type { Variants } from "motion/react";

type RevealDirection = "up" | "left" | "right" | "scale";

const DISTANCE = 28;

function getVariants(direction: RevealDirection, rotate: number): Variants {
  const base = { opacity: 0 };
  const offsets: Record<RevealDirection, Record<string, number>> = {
    up: { y: DISTANCE },
    left: { x: -DISTANCE },
    right: { x: DISTANCE },
    scale: { scale: 0.94 },
  };

  return {
    hidden: { ...base, ...offsets[direction], rotate },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  rotate = 0,
  className,
  as = "div",
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  rotate?: number;
  className?: string;
  as?: "div" | "li" | "article";
  once?: boolean;
  amount?: number;
}) {
  const prefersReduced = useMotionReducedMotion();
  const MotionTag = motion[as];

  if (prefersReduced) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={getVariants(direction, rotate)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  style,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
