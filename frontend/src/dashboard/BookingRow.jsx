import { useState } from 'react';
import Icon from '../components/Icon';
import TicketCard from '../components/TicketCard';
import { inr } from '../api/mappers';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import '../styles/modals.css';

export default function BookingRow({ booking, variant = 'full' }) {
  const { cancelBooking, addTestimonial } = useData();
  const { showToast } = useToast();
  const [cancelling, setCancelling] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!quote.trim()) { showToast('Please write a few words first'); return; }
    setSubmittingReview(true);
    try {
      await addTestimonial({ quote, rating });
      setQuote('');
      setRating(5);
      setShowReview(false);
      showToast('Thanks for sharing your experience!');
    } catch (err) {
      showToast(err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  const isPastEvent = new Date(booking.eventDate).getTime() < Date.now();
  const actualStatus = (booking.status === 'confirmed' && isPastEvent) ? 'past' : booking.status;

  const statusClass = actualStatus === 'confirmed' ? 'confirmed'
    : actualStatus === 'past' ? 'past'
    : actualStatus === 'cancelled' ? 'cancelled'
    : 'upcoming';

  const canCancel = actualStatus === 'confirmed' || actualStatus === 'upcoming';

  const handleCancel = async () => {
    if (!window.confirm(`Cancel your booking for "${booking.eventTitle}"? This can't be undone.`)) return;
    setCancelling(true);
    try {
      await cancelBooking(booking.bookingId);
      showToast('Booking cancelled');
    } catch (err) {
      showToast(err.message);
    } finally {
      setCancelling(false);
    }
  };

  return (
    <>
      <div className="booking-row">
        <img 
          src={booking.eventImage || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80'} 
          alt="" 
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80'; }}
        />
        <div className="br-info">
          <h4>{booking.eventTitle}</h4>
          <div className="br-meta">
            <span><Icon name="pin" /> {booking.eventCity}</span>
            <span><Icon name="cal" /> {booking.eventDate}</span>
            {variant === 'full' && <span><Icon name="ticket" /> {booking.type} × {booking.qty}</span>}
          </div>
        </div>
        {variant === 'full' ? (
          <>
            <span className={`status-pill ${statusClass}`}>{actualStatus}</span>
            <span className="br-price">{inr(booking.amount)}</span>
          </>
        ) : (
          <span className="status-pill upcoming"><Icon name="clock" /> soon</span>
        )}
        {booking.status !== 'cancelled' && (
          <button className="btn btn-ghost btn-sm" onClick={() => setShowTicket(true)}>View Ticket</button>
        )}
        {actualStatus === 'past' && (
          <button className="btn btn-primary btn-sm" onClick={() => setShowReview(true)}>Share Experience</button>
        )}
        {canCancel && (
          <button className="btn btn-ghost btn-sm cancel-booking-btn" disabled={cancelling} onClick={handleCancel}>
            {cancelling ? 'Cancelling...' : 'Cancel'}
          </button>
        )}
      </div>

      {showTicket && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setShowTicket(false); }}>
          <div className="modal-box" style={{ maxWidth: 620 }}>
            <button className="modal-close" onClick={() => setShowTicket(false)}><Icon name="x" /></button>
            <div className="modal-body" style={{ paddingTop: 40 }}>
              <TicketCard booking={booking} />
            </div>
          </div>
        </div>
      )}

      {showReview && (
        <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) setShowReview(false); }}>
          <div className="modal-box" style={{ maxWidth: 500 }}>
            <button className="modal-close" onClick={() => setShowReview(false)}><Icon name="x" /></button>
            <div className="modal-body">
              <h2 style={{ marginBottom: 20 }}>Share your experience</h2>
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button type="button" key={n} onClick={() => setRating(n)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                        <Icon name="star" filled={n <= rating} style={{ color: n <= rating ? 'var(--purple)' : 'var(--gray-300)', width: 24, height: 24 }} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={4}
                    placeholder={`How was ${booking.eventTitle}?`}
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--gray-200)', fontFamily: 'inherit', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowReview(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={submittingReview}>
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
