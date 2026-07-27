import { useState } from 'react';
import useReveal from '../hooks/useReveal';
import { GALLERY } from '../data/staticContent';
import '../styles/sections.css';

const ALL_TAGS = ['All', ...new Set(GALLERY.map(g => g.tag))];

export default function Gallery() {
  const headRef = useReveal();
  const gridRef = useReveal();
  const [activeTag, setActiveTag] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeTag === 'All' ? GALLERY : GALLERY.filter(g => g.tag === activeTag);

  return (
    <section className="section" id="gallery" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-head center reveal" ref={headRef}>
          <p className="eyebrow">Moments worth keeping</p>
          <h2>Event <span className="text-grad">Gallery</span></h2>
          <p style={{ color: 'var(--gray-500)', marginTop: 8 }}>
            {GALLERY.length} moments captured across {ALL_TAGS.length - 1} event categories
          </p>
        </div>

        {/* Category Filter */}
        <div className="filter-row reveal" style={{ justifyContent: 'center', marginBottom: 36 }}>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`filter-chip ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="gallery-masonry reveal" ref={gridRef}>
          {filtered.map((g, i) => (
            <div
              className="g-item g-masonry-item"
              key={g.cap + i}
              onClick={() => setLightbox(g)}
              style={{ cursor: 'zoom-in' }}
            >
              <img src={g.img} alt={g.cap} loading="lazy" />
              <div className="g-overlay">
                <span className="g-tag">{g.tag}</span>
                <span className="g-cap">{g.cap}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Count */}
        <p style={{ textAlign: 'center', marginTop: 24, color: 'var(--gray-500)', fontSize: 13 }}>
          Showing {filtered.length} of {GALLERY.length} photos
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: 24,
          }}
        >
          <div style={{ maxWidth: 900, width: '100%', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.img}
              alt={lightbox.cap}
              style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: 16 }}
            />
            <div style={{ marginTop: 16, color: '#fff' }}>
              <span style={{
                background: 'var(--indigo)', borderRadius: 20, padding: '4px 14px',
                fontSize: 12, fontWeight: 600, marginRight: 10
              }}>{lightbox.tag}</span>
              <strong style={{ fontSize: 18 }}>{lightbox.cap}</strong>
            </div>
            <button
              onClick={() => setLightbox(null)}
              style={{
                marginTop: 20, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: 20, padding: '8px 24px', fontWeight: 600, cursor: 'pointer'
              }}
            >✕ Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
