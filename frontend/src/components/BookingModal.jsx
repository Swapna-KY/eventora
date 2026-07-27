import { useEffect, useMemo, useState } from 'react';
import Icon from './Icon';
import TicketCard from './TicketCard';
import { inr } from '../api/mappers';
import { TICKET_TYPES } from '../data/staticContent';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import { useNavigation } from '../context/NavigationContext';
import '../styles/modals.css';

const CONFETTI_COLORS = ['#5b4fe8', '#9d6fff', '#c58bff', '#ffd166', '#6ee7a8'];

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    width: 4 + Math.random() * 5,
    height: 8 + Math.random() * 8,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    delay: Math.random() * 0.4,
    duration: 1.8 + Math.random() * 1.2,
  })), []);
  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{ left: `${p.left}%`, width: p.width, height: p.height, background: p.color, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
        />
      ))}
    </>
  );
}

export default function BookingModal() {
  const { bookingEvent, closeBooking, openAuth } = useModal();
  const { user } = useAuth();
  const { bookEvent } = useData();
  const { showToast } = useToast();
  const { goTo } = useNavigation();

  const [step, setStep] = useState(1);
  const [ticketType, setTicketType] = useState('GENERAL');
  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [pendingAdvance, setPendingAdvance] = useState(false);

  const open = !!bookingEvent;

  // Reset the flow whenever a *different* event is opened - independent of login state,
  // so anyone can open the modal and pick tickets before signing in.
  useEffect(() => {
    if (bookingEvent) {
      setStep(1);
      setTicketType('GENERAL');
      setQty(1);
      setPhone('');
      setResult(null);
      setPendingAdvance(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingEvent?.id]);

  // Prefill attendee details whenever we have a logged-in user, without resetting the step.
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    }
  }, [user]);

  // If the person logs in while we were waiting on them (mid-flow), carry on automatically.
  useEffect(() => {
    if (user && pendingAdvance) {
      setPendingAdvance(false);
      setStep(2);
    }
  }, [user, pendingAdvance]);

  if (!open) return null;

  const unitPrice = bookingEvent.price * (TICKET_TYPES.find((t) => t.key === ticketType)?.multiplier || 1);
  const total = unitPrice * qty;

  const handleClose = () => {
    closeBooking();
    setPendingAdvance(false);
    document.body.style.overflow = '';
  };

  const handleContinue = () => {
    if (!user) {
      setPendingAdvance(true);
      openAuth('login');
      showToast('Log in to continue your booking');
      return;
    }
    setStep(2);
  };

  const confirm = async () => {
    setSubmitting(true);
    try {
      const booking = await bookEvent({
        eventId: bookingEvent.id,
        ticketType,
        quantity: qty,
        attendeeName: name || 'Guest',
        attendeeEmail: email,
        attendeePhone: phone,
      });
      setResult(booking);
      setStep(3);
    } catch (err) {
      showToast(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={handleClose}><Icon name="x" /></button>
        <div className="modal-hero">
          <img src={bookingEvent.img} alt={bookingEvent.title} />
          <div className="modal-hero-text">
            <h3>{bookingEvent.title}</h3>
            <span>{bookingEvent.city} &nbsp;·&nbsp; {bookingEvent.date}</span>
          </div>
        </div>

        <div className="modal-body">
          <div className="steps-row">
            <div className={`step-dot ${step === 1 ? 'active' : step > 1 ? 'done' : ''}`}>1</div>
            <div className="step-line" />
            <div className={`step-dot ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>2</div>
            <div className="step-line" />
            <div className={`step-dot ${step === 3 ? 'active' : ''}`}>3</div>
          </div>

          {step === 1 && (
            <div className="modal-step active">
              <h4 style={{ fontSize: 15, marginBottom: 16 }}>Choose your ticket type</h4>
              {TICKET_TYPES.map((t) => (
                <div
                  key={t.key}
                  className={`ticket-type ${ticketType === t.key ? 'selected' : ''}`}
                  onClick={() => setTicketType(t.key)}
                >
                  <div><h5>{t.label}</h5><p>{t.desc}</p></div>
                  <div className="tt-price">{inr(bookingEvent.price * t.multiplier)}</div>
                </div>
              ))}

              <div className="qty-row">
                <div>
                  <strong style={{ fontSize: 14.5 }}>Quantity</strong>
                  <p style={{ fontSize: 12.5, color: 'var(--gray-500)' }}>Max 6 per booking</p>
                </div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}><Icon name="minus" /></button>
                  <span className="qty-val">{qty}</span>
                  <button className="qty-btn" onClick={() => setQty((q) => Math.min(6, q + 1))}><Icon name="plus" /></button>
                </div>
              </div>

              <div className="total-row">
                <span style={{ color: 'var(--gray-500)', fontWeight: 600, fontSize: 14 }}>Total amount</span>
                <strong>{inr(total)}</strong>
              </div>

              <div className="modal-actions">
                <button className="btn btn-primary btn-block" onClick={handleContinue}>
                  Continue <Icon name="arrow-r" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="modal-step active">
              <h4 style={{ fontSize: 15, marginBottom: 16 }}>Attendee details</h4>
              <div className="field"><label>Full name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="field"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div className="field"><label>Phone number</label><input type="tel" placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <div className="mini-card" style={{ background: 'var(--bg-soft)', boxShadow: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 14 }}>Order total</span>
                <strong style={{ fontFamily: 'var(--ff-data)' }}>{inr(total)}</strong>
              </div>
              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary" disabled={submitting} onClick={confirm}>
                  {submitting ? 'Processing...' : 'Confirm & Pay'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && result && (
            <div className="modal-step active">
              <div className="success-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
                <Confetti />
                <div className="success-check">
                  <Icon name="check" style={{ color: '#fff', width: 42, height: 42 }} />
                </div>
                <h3>Booking Confirmed!</h3>
                <p>Your tickets have been booked successfully. A confirmation has been sent to your email.</p>
              </div>
              <div style={{ marginTop: 8 }}>
                <TicketCard booking={result} />
              </div>
              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={handleClose}>Close</button>
                <button className="btn btn-primary" onClick={() => { handleClose(); goToPanel('bookings'); }}>
                  View My Bookings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
