import Icon from '../components/Icon';
import { inr } from '../api/mappers';

export default function EventsTable({ events, onEdit, onDelete, showHost = false, emptyMessage }) {
  if (!events.length) {
    return (
      <div className="empty-state">
        <Icon name="cal" />
        <p>{emptyMessage || 'No events yet.'}</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Category</th>
            <th>City</th>
            <th>Date</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Rating</th>
            {showHost && <th>Hosted by</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img 
                  src={e.img || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80'} 
                  alt="" 
                  onError={(ev) => { ev.target.onerror = null; ev.target.src = 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=900&q=80'; }}
                />
                {e.title}
              </td>
              <td>{e.category}</td>
              <td>{e.city}</td>
              <td>{e.date}</td>
              <td>{inr(e.price)}</td>
              <td>{e.seats}</td>
              <td><Icon name="star" filled style={{ width: 14, height: 14, color: '#ffd166' }} /> {e.rating?.toFixed(1)}</td>
              {showHost && <td>{e.organizerName || '—'}</td>}
              <td>
                <div className="table-actions">
                  <button onClick={() => onEdit(e)}><Icon name="edit" /></button>
                  <button className="danger" onClick={() => onDelete(e.id)}><Icon name="trash" /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
