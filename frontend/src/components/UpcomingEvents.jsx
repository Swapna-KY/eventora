import EventCard from './EventCard';
import CardSkeleton from './CardSkeleton';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import { useData } from '../context/DataContext';

export default function UpcomingEvents() {
  const { events, eventsLoading } = useData();
  const headRef = useReveal();
  const gridRef = useReveal();

  const activeEvents = events.filter(e => new Date(e.date).getTime() >= Date.now());
  const sorted = [...activeEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <section className="section" id="upcoming">
      <div className="container">
        <div className="section-top-row reveal" ref={headRef}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">Don't miss out</p>
            <h2>Upcoming <span className="text-grad">Events</span></h2>
          </div>
        </div>
        <div className="cards-grid reveal" ref={gridRef} style={{ marginTop: 40 }}>
          {eventsLoading
            ? <CardSkeleton count={3} />
            : sorted.map((e) => <EventCard key={e.id} event={e} />)
          }
        </div>
      </div>
    </section>
  );
}
