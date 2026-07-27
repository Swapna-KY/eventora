import { useState } from 'react';
import Icon from './Icon';
import Avatar from './Avatar';
import useReveal from '../hooks/useReveal';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import '../styles/sections.css';

function ReviewForm() {
  const { addTestimonial } = useData();
  const { showToast } = useToast();
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!quote.trim()) { showToast('Please write a few words first'); return; }
    setSubmitting(true);
    try {
      await addTestimonial({ quote, rating });
      setQuote('');
      setRating(5);
      showToast('Thanks for sharing your experience!');
    } catch (err) {
      showToast(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="review-form" onSubmit={submit}>
      <div className="testi-stars" style={{ marginBottom: 12 }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} className="star-btn" onClick={() => setRating(n)} aria-label={`Rate ${n} stars`}>
            <Icon name="star" filled={n <= rating} />
          </button>
        ))}
      </div>
      <textarea
        rows={3}
        placeholder="Tell other attendees about your experience..."
        value={quote}
        onChange={(e) => setQuote(e.target.value)}
      />
      <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
        {submitting ? 'Posting...' : 'Share your experience'}
      </button>
    </form>
  );
}

export default function Testimonials() {
  const { testimonials } = useData();
  const { user } = useAuth();
  const { openAuth } = useModal();
  const headRef = useReveal();
  const gridRef = useReveal();

  return (
    <section className="section testi-section" id="testimonials">
      <div className="container">
        <div className="section-head center reveal" ref={headRef}>
          <p className="eyebrow">Loved by real customers</p>
          <h2>What attendees <span className="text-grad">are saying</span></h2>
          <p>Real reviews from people who actually booked through Eventora.</p>
        </div>

        {testimonials.length ? (
          <div className="testi-grid reveal" ref={gridRef}>
            {testimonials.map((t) => (
              <div className="testi-card" key={t.id}>
                <div className="testi-stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" filled={i < (t.rating || 5)} />
                  ))}
                </div>
                <p className="testi-quote">"{t.quote}"</p>
                <div className="testi-person">
                  <Avatar name={t.name} size={48} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.city ? `Verified attendee, ${t.city}` : 'Verified attendee'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>Be the first to share your experience!</p>
        )}

        <div className="review-card">
          <h4 style={{ fontSize: 15, marginBottom: 4 }}>Booked an event with us?</h4>
          <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>Your review appears here for everyone to see.</p>
          {user ? (
            <ReviewForm />
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => openAuth('login')}>Log in to leave a review</button>
          )}
        </div>
      </div>
    </section>
  );
}
