const CATEGORY_OPTIONS = ['Technology', 'Music', 'Business', 'Comedy', 'Art & Culture', 'Food & Drink', 'Wellness', 'Sports'];

export const BLANK_EVENT_FORM = { title: '', category: '', city: '', venue: '', date: '', price: '', seats: '', rating: '', img: '', desc: '' };

export default function EventForm({ form, setForm, onSave, onCancel, saving, isEditing }) {
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="form-panel">
      <h3 style={{ fontSize: 17, marginBottom: 18 }}>{isEditing ? 'Edit Event' : 'Add New Event'}</h3>
      <div className="form-grid">
        <div className="field full"><label>Event title</label><input value={form.title} onChange={set('title')} placeholder="e.g. AI Summit 2026" /></div>
        <div className="field">
          <label>Category</label>
          <select value={form.category} onChange={set('category')}>
            <option value="" disabled>Select a category</option>
            {CATEGORY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="field"><label>City</label><input value={form.city} onChange={set('city')} placeholder="e.g. Bangalore" /></div>
        <div className="field"><label>Venue</label><input value={form.venue} onChange={set('venue')} placeholder="e.g. Phoenix MarketCity" /></div>
        <div className="field"><label>Date</label><input value={form.date} onChange={set('date')} placeholder="e.g. July 12, 2026" /></div>
        <div className="field"><label>Price (₹)</label><input type="number" value={form.price} onChange={set('price')} placeholder="999" /></div>
        <div className="field"><label>Seats available</label><input type="number" value={form.seats} onChange={set('seats')} placeholder="100" /></div>
        <div className="field"><label>Rating</label><input type="number" step="0.1" max="5" value={form.rating} onChange={set('rating')} placeholder="4.8" /></div>
        <div className="field full"><label>Image URL</label><input value={form.img} onChange={set('img')} placeholder="https://images.unsplash.com/..." /></div>
        <div className="field full"><label>Description</label><textarea rows="3" value={form.desc} onChange={set('desc')} placeholder="Short description of the event" /></div>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
        <button className="btn btn-primary" disabled={saving} onClick={onSave}>{saving ? 'Saving...' : 'Save Event'}</button>
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
