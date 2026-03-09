import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";

// Runs off the main thread — no setState on every scroll tick
export function useScrollProgress() {
  const ref = useRef(null);
  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return { ref, progress };
}

// Fires once when element enters view, then disconnects
export function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}