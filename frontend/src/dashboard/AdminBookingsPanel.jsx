import { useEffect, useState } from 'react';
import { inr } from '../api/mappers';
import { fetchAllBookings } from '../api/bookings';
import { useToast } from '../context/ToastContext';

export default function AdminBookingsPanel() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const t = setTimeout(() => {
      fetchAllBookings(query).then(setRows).catch((err) => showToast(err.message));
    }, 250);
    return () => clearTimeout(t);
  }, [query, showToast]);

  return (
    <div className="dash-panel active">
      <div className="dash-head">
        <div><h2>Bookings Management</h2><p>Track every ticket sold across all events.</p></div>
        <input
          type="text"
          placeholder="Search bookings..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '12px 18px', borderRadius: 'var(--r-pill)', border: '1.5px solid var(--gray-200)', fontSize: 14, fontWeight: 600, outline: 'none' }}
        />
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead><tr><th>Booking ID</th><th>Attendee</th><th>Event</th><th>Tickets</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            {rows.length ? rows.map((b) => {
              const statusClass = b.status === 'confirmed' ? 'confirmed' : b.status === 'past' ? 'past' : 'upcoming';
              return (
                <tr key={b.id}>
                  <td style={{ fontFamily: 'var(--ff-data)', fontWeight: 700 }}>#{b.bookingReference}</td>
                  <td>{b.name}</td>
                  <td>{b.eventTitle}</td>
                  <td>{b.type} × {b.qty}</td>
                  <td>{inr(b.amount)}</td>
                  <td><span className={`status-pill ${statusClass}`}>{b.status}</span></td>
                </tr>
              );
            }) : (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--gray-500)', padding: 30 }}>No bookings match your search.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
