import { useState } from 'react';
import Icon from '../components/Icon';
import EventForm, { BLANK_EVENT_FORM } from './EventForm';
import EventsTable from './EventsTable';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';

export default function AdminEventsPanel() {
  const { events, createEvent, updateEvent, deleteEvent } = useData();
  const { showToast } = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(BLANK_EVENT_FORM);
  const [saving, setSaving] = useState(false);

  const openCreate = () => { setEditingId(null); setForm(BLANK_EVENT_FORM); setFormOpen(true); };
  const openEdit = (ev) => {
    setEditingId(ev.id);
    setForm({ title: ev.title, category: ev.category, city: ev.city, venue: ev.venue || '', date: ev.date, price: ev.price, seats: ev.seats, rating: ev.rating, img: ev.img, desc: ev.desc });
    setFormOpen(true);
  };
  const closeForm = () => setFormOpen(false);

  const save = async () => {
    if (!form.title.trim()) { showToast('Please enter an event title'); return; }
    if (!form.category) { showToast('Please select a category'); return; }
    setSaving(true);
    const payload = {
      title: form.title,
      category: form.category,
      city: form.city || 'Bangalore',
      venue: form.venue || '',
      date: form.date || 'TBA',
      price: Number(form.price) || 999,
      seats: Number(form.seats) || 50,
      rating: Number(form.rating) || 4.5,
      featured: true,
      img: form.img || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
      desc: form.desc || '',
    };
    try {
      if (editingId) {
        await updateEvent(editingId, payload);
        showToast('Event updated successfully');
      } else {
        await createEvent(payload);
        showToast('Event published successfully');
      }
      setFormOpen(false);
    } catch (err) {
      showToast(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await deleteEvent(id);
      showToast('Event removed');
    } catch (err) {
      showToast(err.message);
    }
  };

  return (
    <div className="dash-panel active">
      <div className="dash-head">
        <div><h2>Manage Events</h2><p>As an admin you can edit or remove any event on the platform, hosted by anyone.</p></div>
        <button className="btn btn-primary" onClick={openCreate}><Icon name="plus" /> Add New Event</button>
      </div>

      {formOpen && (
        <EventForm form={form} setForm={setForm} onSave={save} onCancel={closeForm} saving={saving} isEditing={!!editingId} />
      )}

      <EventsTable events={events} onEdit={openEdit} onDelete={remove} showHost emptyMessage="No events on the platform yet." />
    </div>
  );
}
