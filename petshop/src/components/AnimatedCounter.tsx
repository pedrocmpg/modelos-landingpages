import { useEffect, useRef } from "react";
import { useInView, animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const displayRef = useRef<HTMLSpanElement>(null);

  useMotionValueEvent(motionValue, "change", (latest) => {
    if (displayRef.current) {
      displayRef.current.textContent = latest.toFixed(decimals);
    }
  });

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      motionValue.set(value);
      if (displayRef.current) displayRef.current.textContent = value.toFixed(decimals);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, value, reducedMotion]);

  return (
    <span ref={ref}>
      {prefix}
      <span ref={displayRef}>{(0).toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}
