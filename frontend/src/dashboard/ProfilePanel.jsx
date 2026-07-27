import { useState } from 'react';
import Icon from '../components/Icon';
import Avatar from '../components/Avatar';
import { inr } from '../api/mappers';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { compressImage } from '../utils/compressImage';

export default function ProfilePanel() {
  const { user, updateProfile } = useAuth();
  const { bookings, savedEvents } = useData();
  const { showToast } = useToast();

  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: user.name, city: user.city || '' });

  const onPhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Downscale + compress before it ever leaves the browser - a raw phone photo can be
      // several megabytes as base64, which is what was causing multi-minute upload/load times.
      const dataUrl = await compressImage(file, { maxDimension: 500, quality: 0.85 });
      setPreview(dataUrl);
      await updateProfile({ photoUrl: dataUrl });
      showToast('Profile photo updated');
    } catch (err) {
      showToast(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const openEdit = () => {
    setForm({ name: user.name, city: user.city || '' });
    setEditing(true);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { showToast('Name cannot be empty'); return; }
    setSaving(true);
    try {
      await updateProfile({ name: form.name, city: form.city });
      showToast('Profile updated');
      setEditing(false);
    } catch (err) {
      showToast(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dash-panel active">
      <div className="dash-head">
        <div><h2>Welcome back, {user.name.split(' ')[0]} 👋</h2><p>Here's a quick snapshot of your EventHub account.</p></div>
      </div>
      <div className="profile-grid">
        <div className="mini-card profile-photo-card">
          <div className="profile-photo-wrap">
            <Avatar name={user.name} photoUrl={preview || user.photoUrl} size={120} />
            <label className="photo-upload-btn">
              <Icon name="upload" style={{ color: '#fff' }} />
              <input type="file" accept="image/*" onChange={onPhotoChange} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>

          {!editing ? (
            <>
              <h3 style={{ fontSize: 18 }}>{user.name}</h3>
              <p style={{ color: 'var(--gray-500)', fontSize: 13.5, marginTop: 4 }}>{user.email}</p>
              <p style={{ color: 'var(--gray-500)', fontSize: 13.5 }}>{user.city || 'No city set'}</p>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 18 }} onClick={openEdit}>Edit profile</button>
            </>
          ) : (
            <form onSubmit={saveProfile} style={{ marginTop: 14, textAlign: 'left' }}>
              <div className="field"><label>Full name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div className="field"><label>City</label><input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="e.g. Bangalore" /></div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="submit" className="btn btn-primary btn-sm" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
        <div className="mini-card">
          <h3 style={{ fontSize: 17, marginBottom: 18 }}>Account overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="kpi-card" style={{ boxShadow: 'none', border: '1px solid var(--gray-100)' }}>
              <div className="kpi-label">Total bookings</div><div className="kpi-num">{bookings.filter(b => (b.status || '').toLowerCase() !== 'cancelled').length}</div>
            </div>
            <div className="kpi-card" style={{ boxShadow: 'none', border: '1px solid var(--gray-100)' }}>
              <div className="kpi-label">Saved events</div><div className="kpi-num">{savedEvents.length}</div>
            </div>
            <div className="kpi-card" style={{ boxShadow: 'none', border: '1px solid var(--gray-100)' }}>
              <div className="kpi-label">Cities explored</div><div className="kpi-num">{new Set(bookings.filter(b => (b.status || '').toLowerCase() !== 'cancelled').map((b) => b.eventCity)).size || 0}</div>
            </div>
            <div className="kpi-card" style={{ boxShadow: 'none', border: '1px solid var(--gray-100)' }}>
              <div className="kpi-label">Loyalty points</div><div className="kpi-num">1,280</div>
            </div>
          </div>
          <h4 style={{ marginTop: 26, marginBottom: 14, fontSize: 14 }}>Recent activity</h4>
          {bookings.length ? bookings.slice(0, 3).map((b) => {
            const isCancelled = (b.status || '').toLowerCase() === 'cancelled';
            return (
            <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--gray-100)', fontSize: 13.5 }}>
              <span style={{ fontWeight: 600 }}>
                {b.eventTitle}
                {isCancelled && <span style={{ color: 'var(--red)', marginLeft: 8, fontSize: 11, fontWeight: 'normal' }}>(Cancelled)</span>}
              </span>
              <span style={{ color: 'var(--gray-500)', textDecoration: isCancelled ? 'line-through' : 'none' }}>{inr(b.amount)}</span>
            </div>
            );
          }) : <p style={{ fontSize: 13.5, color: 'var(--gray-500)' }}>No recent activity yet.</p>}
        </div>
      </div>
    </div>
  );
}
