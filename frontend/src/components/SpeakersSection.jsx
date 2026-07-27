import React from 'react';

const SPEAKERS = [
  { name: 'Elena Rodriguez', title: 'Keynote Speaker', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80' },
  { name: 'James Carter', title: 'Industry Expert', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80' },
  { name: 'Sarah Chen', title: 'Lead Organizer', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80' },
  { name: 'Michael Thorne', title: 'Tech Visionary', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80' }
];

export default function SpeakersSection() {
  return (
    <section id="speaker" className="section">
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 60px' }}>
          <h2>Our Speakers</h2>
          <p>Hear from industry leaders and visionaries.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, textAlign: 'center' }}>
          {SPEAKERS.map((s, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img 
                src={s.img} 
                alt={s.name} 
                style={{ width: 160, height: 160, borderRadius: '50%', objectFit: 'cover', marginBottom: 20, boxShadow: 'var(--shadow-md)', border: '4px solid #fff' }} 
              />
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>{s.name}</h3>
              <p style={{ color: 'var(--indigo)', fontSize: 14, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
