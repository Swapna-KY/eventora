import Icon from '../components/Icon';
import BookingRow from './BookingRow';
import { useData } from '../context/DataContext';

export default function UpcomingPanel() {
  const { bookings } = useData();
  const upcoming = bookings.filter((b) => {
    if (b.status === 'past' || b.status === 'cancelled') return false;
    // Check if the event date has already passed
    const isPast = new Date(b.eventDate).getTime() < Date.now();
    return !isPast;
  });
  return (
    <div className="dash-panel active">
      <div className="dash-head"><div><h2>Your Upcoming Events</h2><p>Get ready — these are coming up soon.</p></div></div>
      {upcoming.length
        ? upcoming.map((b) => <BookingRow key={b.id} booking={b} variant="compact" />)
        : <div className="empty-state"><Icon name="cal" /><p>Nothing on your calendar yet — book an event to see it here.</p></div>}
    </div>
  );
}
