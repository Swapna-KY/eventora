import useCountdown from '../hooks/useCountdown';

export default function CountdownTimer({ date }) {
  const t = useCountdown(date);

  if (!t.valid) return null;
  if (t.isPast) return <div className="countdown countdown-past">This event has already happened</div>;

  return (
    <div className="countdown">
      <span className="countdown-label">Starts in</span>
      <div className="countdown-units">
        <div className="countdown-unit"><strong>{t.days}</strong><span>Days</span></div>
        <div className="countdown-unit"><strong>{t.hours}</strong><span>Hours</span></div>
        <div className="countdown-unit"><strong>{t.minutes}</strong><span>Minutes</span></div>
      </div>
    </div>
  );
}
