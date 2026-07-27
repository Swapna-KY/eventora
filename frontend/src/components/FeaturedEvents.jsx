import { useMemo, useState } from 'react';
import EventCard from './EventCard';
import CardSkeleton from './CardSkeleton';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import { useData } from '../context/DataContext';

export default function FeaturedEvents({ heroFilter, onClearHeroFilter }) {
  const { events, eventsError, eventsLoading, loadEvents } = useData();
  const [activeCategory, setActiveCategory] = useState('All');
  const headRef = useReveal();
  const chipsRef = useReveal();
  const gridRef = useReveal();

  const activeEvents = useMemo(() => events.filter(e => new Date(e.date).getTime() >= Date.now()), [events]);
  const categories = useMemo(() => ['All', ...new Set(activeEvents.map((e) => e.category))], [activeEvents]);

  const isFiltered = !!(heroFilter?.city || heroFilter?.q) || activeCategory !== 'All';

  const list = useMemo(() => {
    const hasHeroFilter = !!(heroFilter?.city || heroFilter?.q);
    const hasCategoryFilter = !hasHeroFilter && activeCategory !== 'All';

    // Default "All" view with no filter: curated featured events only.
    // Any explicit category pick or search should show every matching event,
    // not just the ones flagged "featured" - otherwise a category can show
    // "1 event" on its card but "no events match this filter" here.
    let result = (hasHeroFilter || hasCategoryFilter) ? activeEvents : activeEvents.filter((e) => e.featured);

    if (heroFilter?.city) result = result.filter((e) => e.city === heroFilter.city);
    if (heroFilter?.q) {
      const q = heroFilter.q.toLowerCase();
      result = result.filter((e) => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
    }
    if (hasCategoryFilter) {
      result = result.filter((e) => e.category === activeCategory);
    }
    return result;
  }, [activeEvents, heroFilter, activeCategory]);

  return (
    <section className="section" id="featured">
      <div className="container">
        <div className="section-top-row reveal" ref={headRef}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <p className="eyebrow">{isFiltered ? 'Browsing' : 'Handpicked for you'}</p>
            <h2>{isFiltered ? <>All <span className="text-grad">Events</span></> : <>Featured <span className="text-grad">Events</span></>}</h2>
            <p>{isFiltered ? 'Every event matching your search, not just the curated picks.' : "The experiences everyone's talking about — curated, trending, and almost sold out."}</p>
          </div>
        </div>

        <div className="filter-row reveal" ref={chipsRef}>
          {categories.map((c) => (
            <button
              key={c}
              className={`filter-chip ${activeCategory === c ? 'active' : ''}`}
              onClick={() => { setActiveCategory(c); onClearHeroFilter?.(); }}
            >
              {c}
            </button>
          ))}
        </div>

        {eventsLoading ? (
          <div className="cards-grid"><CardSkeleton count={6} /></div>
        ) : eventsError ? (
          <div className="empty-state">
            <Icon name="search" />
            <p><strong>Can't reach the backend.</strong><br />Make sure the Spring Boot API is running.<br />({eventsError})</p>
            <button className="btn btn-primary btn-sm" style={{ marginTop: 18 }} onClick={loadEvents}>Try Again</button>
          </div>
        ) : (
          <div className="cards-grid reveal-stagger" ref={gridRef}>
            {list.length
              ? list.map((e) => <EventCard key={e.id} event={e} />)
              : <div className="empty-state" style={{ gridColumn: '1/-1' }}><Icon name="search" /><p>No events match this filter.</p></div>}
          </div>
        )}
      </div>
    </section>
  );
}
