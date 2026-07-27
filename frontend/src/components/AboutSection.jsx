import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 60 }}>
          <div style={{ flex: '1 1 400px' }}>
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" 
              alt="About Eventora" 
              style={{ width: '100%', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-lg)', objectFit: 'cover', height: 450 }} 
            />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: 20 }}>Who We Are</h2>
            <p style={{ color: 'var(--gray-600)', fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
              At Eventora, we believe that every event has a story to tell. We are dedicated to providing a seamless, end-to-end platform for discovering, organizing, and managing the world's most unforgettable experiences.
            </p>
            <p style={{ color: 'var(--gray-600)', fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
              Whether it's a corporate conference, a massive music festival, or an intimate workshop, our tools empower creators to bring their visions to life and connect deeply with their audiences.
            </p>
            <button className="btn btn-primary" style={{ padding: '12px 32px', borderRadius: 30, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: 13 }}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
