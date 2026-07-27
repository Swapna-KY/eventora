import Icon from './Icon';
import SeatIndicator from './SeatIndicator';
import { inr } from '../api/mappers';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import { useNavigation } from '../context/NavigationContext';
import '../styles/cards.css';

export default function EventCard({ event }) {
  const { user } = useAuth();
  const { savedIds, toggleSave } = useData();
  const { openAuth } = useModal();
  const { showToast } = useToast();
  const { goToEvent } = useNavigation();

  const saved = savedIds.has(event.id);

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!user) { openAuth('login'); showToast('Log in to save events'); return; }
    try {
      await toggleSave(event);
      showToast(saved ? 'Removed from saved events' : 'Saved to your wishlist');
    } catch (err) {
      showToast(err.message);
    }
  };

  // Both clicking the card and "Book Now" open Event Details first - booking happens from there.
  const handleOpenDetails = () => goToEvent(event);

  return (
    <article className="ticket-card" onClick={handleOpenDetails} role="button" tabIndex={0}>
      <div className="tc-media">
        <img 
          src={event.img || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80'} 
          alt={event.title} 
          loading="lazy" 
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80'; }}
        />
        <span className="tc-cat">{event.category}</span>
        <button className={`tc-save ${saved ? 'saved' : ''}`} onClick={handleSave} aria-label="Save event">
          <Icon name="heart" filled={saved} />
        </button>
        <span className="tc-rating"><Icon name="star" filled style={{ color: '#ffd166' }} /> {event.rating?.toFixed(1)} Rating</span>
      </div>
      <div className="tc-body">
        <h3 className="tc-title">{event.title}</h3>
        <div className="tc-meta">
          <span><Icon name="pin" /> {event.city}</span>
          <span><Icon name="cal" /> {event.date}</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <SeatIndicator seats={event.seats} />
        </div>
      </div>
      <div className="tc-divider" />
      <div className="tc-footer">
        <div className="tc-price">
          <small>Starting from</small>
          <strong>{inr(event.price)}</strong>
        </div>
        <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); handleOpenDetails(); }}>Book Now</button>
      </div>
    </article>
  );
}
