import React from 'react';
import Icon from './Icon';

const POSTS = [
  { title: 'Top 10 Event Venues for 2026', date: 'July 12, 2026', img: 'https://images.unsplash.com/photo-1519167758481-83f5242164af?auto=format&fit=crop&w=500&q=80', excerpt: 'Discover the most breathtaking venues around the world for your next big corporate or personal event.' },
  { title: 'Mastering the Art of Networking', date: 'July 5, 2026', img: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=500&q=80', excerpt: 'How to facilitate meaningful connections and ensure your attendees leave with valuable new contacts.' },
  { title: 'Sustainable Event Planning', date: 'June 28, 2026', img: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=500&q=80', excerpt: 'Eco-friendly practices that reduce waste without compromising on the quality of your event experience.' }
];

export default function BlogsSection() {
  return (
    <section id="blogs" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <div className="section-head" style={{ textAlign: 'center', margin: '0 auto 50px' }}>
          <h2>Latest News & Blogs</h2>
          <p>Insights, tips, and inspiration for event creators.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30 }}>
          {POSTS.map((p, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 'var(--r-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}>
              <img src={p.img} alt={p.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
              <div style={{ padding: 24 }}>
                <div style={{ color: 'var(--indigo)', fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="cal" style={{ width: 14, height: 14 }} /> {p.date}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ color: 'var(--gray-600)', fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>{p.excerpt}</p>
                <a href="#!" style={{ color: 'var(--indigo)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  Read More <Icon name="chevron-right" style={{ width: 16, height: 16 }} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
