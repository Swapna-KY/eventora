import { useEffect, useRef, useState } from 'react';

/**
 * Animates 0 -> target once the element scrolls into view, and re-animates to any
 * new target afterwards (e.g. when a stat updates after a booking is made).
 */
export default function useCountUp(target) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);

  // Detect when the element first scrolls into view (only needs to happen once).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate towards the current target whenever it changes, as long as it's visible.
  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(interval); }
      setValue(current);
    }, 22);
    return () => clearInterval(interval);
  }, [target, visible]);

  return [ref, value];
}
