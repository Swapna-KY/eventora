import Icon from '../components/Icon';
import { useData } from '../context/DataContext';

export default function NotificationsPanel() {
  const { notifications } = useData();
  return (
    <div className="dash-panel active">
      <div className="dash-head"><div><h2>Notifications</h2><p>Stay up to date on your bookings and saved events.</p></div></div>
      <div className="mini-card">
        {notifications.length ? notifications.map((n) => (
          <div className={`notif-row ${n.unread ? 'unread' : ''}`} key={n.id}>
            <div className="notif-ic"><Icon name={n.icon} /></div>
            <div><p>{n.text}</p><span>{n.time}</span></div>
          </div>
        )) : <p style={{ fontSize: 13.5, color: 'var(--gray-500)', padding: '10px 0' }}>No notifications yet.</p>}
      </div>
    </div>
  );
}
