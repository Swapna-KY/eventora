import { useState } from 'react';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import { useToast } from '../context/ToastContext';
import { submitContactMessage } from '../api/contact';
import '../styles/sections.css';

export default function Contact() {
  const headRef = useReveal();
  const formRef = useReveal();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitContactMessage(form);
      setSent(true);
    } catch (err) {
      showToast(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="container" style={{ maxWidth: 600 }}>
        <div className="section-head center reveal" ref={headRef}>
          <p className="eyebrow">We're here to help</p>
          <h2>Get in <span className="text-grad">touch</span></h2>
        </div>

        <div className="reveal" ref={formRef}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ marginBottom: 8 }}>Message received!</h3>
              <p style={{ color: 'var(--gray-500)', marginBottom: 24 }}>
                We'll get back to you at <strong>{form.email}</strong> soon.
              </p>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => { setForm({ name: '', email: '', subject: '', message: '' }); setSent(false); }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={submit} style={{ boxShadow: 'var(--shadow-lg)', borderRadius: 'var(--r-lg)', padding: 32 }}>
              <div className="field-row">
                <div className="field">
                  <label>Full name</label>
                  <input type="text" placeholder="Your name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" placeholder="you@email.com" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div className="field">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea rows="4" placeholder="Tell us a bit more..." required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={sending}>
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
