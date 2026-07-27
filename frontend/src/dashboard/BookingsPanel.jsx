import Icon from '../components/Icon';
import BookingRow from './BookingRow';
import { useData } from '../context/DataContext';

export default function BookingsPanel() {
  const { bookings } = useData();
  return (
    <div className="dash-panel active">
      <div className="dash-head"><div><h2>My Bookings</h2><p>Every ticket you've booked, all in one place.</p></div></div>
      {bookings.length
        ? bookings.map((b) => <BookingRow key={b.id} booking={b} />)
        : <div className="empty-state"><Icon name="ticket" /><p>No bookings yet. Explore events to get started.</p></div>}
    </div>
  );
}
