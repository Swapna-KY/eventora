import { useEffect, useState } from 'react';

function getParts(targetDateString) {
  const target = new Date(targetDateString).getTime();
  if (Number.isNaN(target)) return { valid: false };
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return { valid: true, isPast: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { valid: true, isPast: false, days, hours, minutes, seconds };
}

/** Live countdown to an event date string like "June 25, 2026". Updates every minute. */
export default function useCountdown(dateString) {
  const [parts, setParts] = useState(() => getParts(dateString));

  useEffect(() => {
    setParts(getParts(dateString));
    const interval = setInterval(() => setParts(getParts(dateString)), 60000);
    return () => clearInterval(interval);
  }, [dateString]);

  return parts;
}
