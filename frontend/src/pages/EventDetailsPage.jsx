import { useMemo, useState } from 'react';
import Icon from '../components/Icon';
import Avatar from '../components/Avatar';
import EventCard from '../components/EventCard';
import SeatIndicator from '../components/SeatIndicator';
import CountdownTimer from '../components/CountdownTimer';
import OrganizerCard from '../components/OrganizerCard';
import VenueMap from '../components/VenueMap';
import Footer from '../components/Footer';
import ReportEventModal from '../components/ReportEventModal';
import { inr } from '../api/mappers';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useModal } from '../context/ModalContext';
import { useNavigation } from '../context/NavigationContext';
import { useToast } from '../context/ToastContext';
import '../styles/eventDetails.css';

export default function EventDetailsPage() {
  const { viewingEvent, goTo } = useNavigation();
  const { events, savedIds, toggleSave, testimonials } = useData();
  const { user } = useAuth();
  const { openAuth, openBooking } = useModal();
  const { showToast } = useToast();
  const [reportOpen, setReportOpen] = useState(false);

  // Always read the freshest copy of this event from the live list (seats etc. may have
  // changed since the card was clicked - e.g. someone else just booked the last few seats).
  const event = useMemo(
    () => events.find((e) => e.id === viewingEvent?.id) || viewingEvent,
    [events, viewingEvent]
  );

  if (!event) {
    return (
      <div className="container" style={{ paddingTop: 140, paddingBottom: 100, textAlign: 'center' }}>
        <p style={{ color: 'var(--gray-500)' }}>This event isn't available anymore.</p>
        <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={() => goTo('home')}>Back to Explore</button>
      </div>
    );
  }

  const saved = savedIds.has(event.id);
  const organizerEventCount = events.filter((e) => e.organizerId === event.organizerId).length;
  const related = events.filter((e) => e.category === event.category && e.id !== event.id).slice(0, 3);

  const handleSave = async () => {
    if (!user) { openAuth('login'); showToast('Log in to save events'); return; }
    try {
      await toggleSave(event);
      showToast(saved ? 'Removed from saved events' : 'Saved to your wishlist');
    } catch (err) {
      showToast(err.message);
    }
  };

  const handleBook = () => openBooking(event);

  return (
    <div className="event-details-page">
      <div className="ed-banner" style={{ backgroundImage: `linear-gradient(180deg, rgba(23,19,49,.15), rgba(23,19,49,.88)), url('${event.img}')` }}>
        <div className="container">
          <button className="ed-back" onClick={() => goTo('home')}><Icon name="chev-l" /> Back to Explore</button>
          <span className="ed-banner-cat">{event.category}</span>
          <h1>{event.title}</h1>
          <div className="ed-banner-meta">
            <span><Icon name="pin" /> {event.venue ? `${event.venue}, ` : ''}{event.city}</span>
            <span><Icon name="cal" /> {event.date}</span>
            <span><Icon name="star" filled style={{ color: '#ffd166' }} /> {event.rating?.toFixed(1)} Rating</span>
          </div>
        </div>
      </div>

      <div className="container ed-body">
        <div className="ed-main">
          <section className="ed-section">
            <h3>About this event</h3>
            <p className="ed-desc">{event.desc || 'No description provided for this event yet.'}</p>
            <button className="ed-report-link" onClick={() => setReportOpen(true)}>
              <Icon name="bell" style={{ width: 14, height: 14 }} /> Something wrong with this listing? Report it
            </button>
          </section>

          <section className="ed-section">
            <h3>Organizer</h3>
            <OrganizerCard name={event.organizerName} eventCount={organizerEventCount} />
          </section>

          <section className="ed-section">
            <h3>Venue</h3>
            <p className="ed-venue-line"><Icon name="pin" /> {event.venue ? `${event.venue}, ` : ''}{event.city}</p>
            <VenueMap venue={event.venue} city={event.city} />
          </section>

          {testimonials.length > 0 && (
            <section className="ed-section">
              <h3>What attendees are saying</h3>
              <p className="ed-reviews-note">Real reviews from EventHub customers (platform-wide, not specific to this event).</p>
              <div className="ed-reviews-grid">
                {testimonials.slice(0, 4).map((t) => (
                  <div className="ed-review-card" key={t.id}>
                    <div className="ed-review-stars">
                      {Array.from({ length: 5 }).map((_, i) => <Icon key={i} name="star" filled={i < (t.rating || 5)} />)}
                    </div>
                    <p>"{t.quote}"</p>
                    <div className="ed-review-person">
                      <Avatar name={t.name} size={34} />
                      <strong>{t.name}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="ed-section">
              <h3>Related events</h3>
              <div className="cards-grid">
                {related.map((e) => <EventCard key={e.id} event={e} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="ed-sidebar">
          <div className="ed-sidebar-card">
            <div className="ed-price-row">
              <div><span>Starting from</span><strong>{inr(event.price)}</strong></div>
              <button className={`tc-save ed-save-btn ${saved ? 'saved' : ''}`} onClick={handleSave} aria-label="Save event">
                <Icon name="heart" filled={saved} />
              </button>
            </div>
            <SeatIndicator seats={event.seats} size="lg" />
            <CountdownTimer date={event.date} />
            <button className="btn btn-primary btn-block" style={{ marginTop: 18 }} onClick={handleBook} disabled={event.seats <= 0}>
              {event.seats <= 0 ? 'Sold Out' : 'Book Ticket'}
            </button>
          </div>
        </aside>
      </div>

      <Footer />
      {reportOpen && <ReportEventModal event={event} onClose={() => setReportOpen(false)} />}
    </div>
  );
}
