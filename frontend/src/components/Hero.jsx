import { useRef, useState } from 'react';
import Icon from './Icon';
import { useData } from '../context/DataContext';
import '../styles/hero.css';

const CITIES = ['Bangalore', 'Mysuru', 'Mumbai', 'Hyderabad', 'Delhi', 'Goa'];

export default function Hero({ onSearch }) {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const inputRef = useRef(null);
  const { stats } = useData();

  const submit = (e) => {
    e.preventDefault();
    onSearch({ q: query, city });
    document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="container hero-content">
        <h1 style={{ fontWeight: 700 }}>Create Unforgettable<br/>Events</h1>
        <p className="hero-sub" style={{ fontSize: 16, fontWeight: 500, marginTop: 24, color: 'rgba(255,255,255,.9)', maxWidth: 640 }}>
          Discover exceptional events happening around you — curated for every occasion.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 46 }}>
          <button 
            type="button" 
            className="btn btn-primary" 
            style={{ borderRadius: 30, padding: '14px 34px', fontSize: 14, fontWeight: 600, textTransform: 'none', letterSpacing: 'normal' }}
            onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Services
          </button>
          <button 
            type="button" 
            className="btn btn-outline-orange" 
            style={{ borderRadius: 30, padding: '12px 32px', fontSize: 14, fontWeight: 600, textTransform: 'none', letterSpacing: 'normal' }}
            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Now
          </button>
        </div>
      </div>
      <div 
        className="hero-scroll" 
        onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ cursor: 'pointer' }}
      >
        <span>Scroll</span>
        <div className="scroll-mouse" />
      </div>
    </section>
  );
}
