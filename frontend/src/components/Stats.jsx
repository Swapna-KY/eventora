import useCountUp from '../hooks/useCountUp';
import { useData } from '../context/DataContext';
import '../styles/sections.css';

function Stat({ target, suffix, label }) {
  const [ref, value] = useCountUp(target);
  return (
    <div>
      <div className="stat-num" ref={ref}>{value.toLocaleString('en-IN')}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { stats } = useData();

  if (!stats) return null; // no fake numbers while real data is still loading (or backend is unreachable)

  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="stats-section">
        <div className="stats-grid">
          <Stat target={stats.eventsHosted} suffix="" label="Events Hosted" />
          <Stat target={stats.happyAttendees} suffix="" label="Happy Attendees" />
          <Stat target={stats.citiesCovered} suffix="" label="Cities Covered" />
          <Stat target={stats.partnerVenues} suffix="" label="Partner Venues" />
        </div>
      </div>
    </section>
  );
}
