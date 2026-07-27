import { useEffect, useState, useCallback } from 'react';

/**
 * Attach the returned ref to an element with className="reveal" or "reveal-stagger".
 * Once the element scrolls into view, "is-visible" is added and the observer disconnects.
 */
export default function useReveal() {
  const [el, setEl] = useState(null);

  const ref = useCallback((node) => {
    if (node !== null) {
      setEl(node);
    }
  }, []);

  useEffect(() => {
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [el]);

  return ref;
}
