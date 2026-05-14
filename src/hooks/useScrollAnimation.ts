import { useRef, useState, useEffect } from "react";
import { useSpring, SpringValue } from "@react-spring/web";

interface ScrollAnimationResult {
  ref: React.RefObject<HTMLDivElement | null>;
  spring: { opacity: SpringValue<number>; transform: SpringValue<string> };
}

interface ScrollAnimationOptions {
  delay?: number;
  threshold?: number;
  fromY?: number;
}

export const useScrollAnimation = (
  options: ScrollAnimationOptions = {},
): ScrollAnimationResult => {
  const { delay = 0, threshold = 0.12, fromY = 40 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  const spring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : `translateY(${fromY}px)`,
    delay,
    config: { tension: 260, friction: 58 },
  });

  return { ref, spring };
};

export const useCountAnimation = (
  target: number,
  inView: boolean,
  duration = 1800,
): number => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return count;
};
