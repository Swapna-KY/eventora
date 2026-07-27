import { useEffect, useState } from 'react';
import Icon from '../components/Icon';
import { fetchMessages, markMessageRead } from '../api/contact';
import { timeAgo } from '../api/mappers';
import { useToast } from '../context/ToastContext';

export default function AdminMessagesPanel() {
  const [messages, setMessages] = useState(null);
  const { showToast } = useToast();

  const load = () => {
    fetchMessages().then(setMessages).catch((err) => showToast(err.message));
  };

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openMessage = async (m) => {
    if (!m.isRead) {
      try {
        await markMessageRead(m.id);
        setMessages((prev) => prev.map((x) => (x.id === m.id ? { ...x, isRead: true } : x)));
      } catch (err) {
        showToast(err.message);
      }
    }
  };

  return (
    <div className="dash-panel active">
      <div className="dash-head">
        <div><h2>Contact Messages</h2><p>Real submissions from the "Let's talk events" form on the homepage.</p></div>
      </div>

      {!messages ? null : messages.length === 0 ? (
        <div className="empty-state"><Icon name="mail" /><p>No messages yet — they'll show up here as soon as someone uses the contact form.</p></div>
      ) : (
        <div className="mini-card" style={{ padding: 10 }}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`notif-row ${m.isRead ? '' : 'unread'}`}
              style={{ cursor: 'pointer', alignItems: 'flex-start' }}
              onClick={() => openMessage(m)}
            >
              <div className="notif-ic"><Icon name="mail" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <p style={{ fontWeight: 700 }}>{m.name} <span style={{ fontWeight: 500, color: 'var(--gray-500)' }}>· {m.email}</span></p>
                  <span style={{ flexShrink: 0 }}>{timeAgo(m.createdAt)}</span>
                </div>
                {m.subject && <p style={{ fontWeight: 600, fontSize: 13.5, marginTop: 4 }}>{m.subject}</p>}
                <p style={{ fontSize: 13.5, color: 'var(--gray-600)', marginTop: 4, fontWeight: 400 }}>{m.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
