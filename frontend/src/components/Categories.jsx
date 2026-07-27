import { useMemo } from 'react';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import { CATEGORIES } from '../data/staticContent';
import { useData } from '../context/DataContext';
import '../styles/sections.css';

export default function Categories({ onSelectCategory }) {
  const { events } = useData();
  const headRef = useReveal();
  const gridRef = useReveal();

  const counts = useMemo(() => {
    const map = {};
    const activeEvents = events.filter(e => new Date(e.date).getTime() >= Date.now());
    activeEvents.forEach((e) => { map[e.category] = (map[e.category] || 0) + 1; });
    return map;
  }, [events]);

  return (
    <section className="section cat-section" id="categories">
      <div className="container">
        <div className="section-head center reveal" ref={headRef}>
          <p className="eyebrow">Browse by interest</p>
          <h2>Popular <span className="text-grad">Categories</span></h2>
          <p>Whatever moves you — find your next plan in one tap.</p>
        </div>
        <div className="cat-grid reveal-stagger" ref={gridRef}>
          {CATEGORIES.map((c) => {
            const count = counts[c.name] || 0;
            return (
              <div className="cat-card" key={c.name} onClick={() => onSelectCategory(c.name)}>
                <div className="cat-icon"><Icon name={c.icon} /></div>
                <div><h4>{c.name}</h4><p>{count} {count === 1 ? 'event' : 'events'}</p></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
