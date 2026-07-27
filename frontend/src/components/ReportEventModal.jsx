import { useState } from 'react';
import Icon from './Icon';
import { useToast } from '../context/ToastContext';
import { submitContactMessage } from '../api/contact';
import '../styles/modals.css';

const REASONS = [
  'Event details are outdated or wrong',
  'Event is cancelled but still listed',
  'Wrong date, time, or venue',
  'Inappropriate or misleading content',
  'Something else',
];

export default function ReportEventModal({ event, onClose }) {
  const { showToast } = useToast();
  const [reason, setReason] = useState(REASONS[0]);
  const [details, setDetails] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { showToast('Please add your name and email'); return; }
    setSubmitting(true);
    try {
      await submitContactMessage({
        name,
        email,
        subject: `Event report: ${event.title}`,
        message: `Reason: ${reason}\nEvent: ${event.title} (ID ${event.id})\nCity: ${event.city}\nDate: ${event.date}\n\nDetails from reporter:\n${details || '(none provided)'}`,
      });
      setSent(true);
    } catch (err) {
      showToast(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" style={{ maxWidth: 480 }}>
        <button className="modal-close" onClick={onClose}><Icon name="x" /></button>
        <div className="modal-body" style={{ paddingTop: 38 }}>
          {sent ? (
            <div className="success-wrap">
              <div className="success-check"><Icon name="check" style={{ color: '#fff', width: 34, height: 34 }} /></div>
              <h3 style={{ fontSize: 20 }}>Thanks for the heads up</h3>
              <p>Our team will review "{event.title}" and get back to you at {email} if needed.</p>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 18 }} onClick={onClose}>Close</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 style={{ fontSize: 20, marginBottom: 6 }}>Report an issue</h3>
              <p style={{ color: 'var(--gray-500)', fontSize: 13.5, marginBottom: 20 }}>
                Let us know if something's wrong with <strong>{event.title}</strong> and we'll take a look.
              </p>
              <div className="field">
                <label>What's the issue?</label>
                <select value={reason} onChange={(e) => setReason(e.target.value)}>
                  {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Details (optional)</label>
                <textarea rows={3} value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Anything else we should know?" />
              </div>
              <div className="field-row">
                <div className="field"><label>Your name</label><input value={name} onChange={(e) => setName(e.target.value)} required /></div>
                <div className="field"><label>Your email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
