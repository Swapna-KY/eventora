import { useEffect, useMemo, useState } from 'react';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import AdminAnalyticsPanel from '../dashboard/AdminAnalyticsPanel';
import AdminEventsPanel from '../dashboard/AdminEventsPanel';
import AdminBookingsPanel from '../dashboard/AdminBookingsPanel';
import AdminUploadPanel from '../dashboard/AdminUploadPanel';
import AdminMessagesPanel from '../dashboard/AdminMessagesPanel';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';
import { fetchMessages } from '../api/contact';

export default function AdminDashboard() {
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();
  const { goTo, adminPanel, setAdminPanel } = useNavigation();

  const refreshUnreadCount = () => {
    fetchMessages().then((msgs) => setUnreadCount(msgs.filter((m) => !m.isRead).length)).catch(() => {});
  };

  useEffect(() => { refreshUnreadCount(); }, []);
  // Re-check whenever the Messages panel is closed (i.e. panel changes away from it),
  // so the badge clears once messages have been opened/read.
  useEffect(() => { if (adminPanel !== 'messages') refreshUnreadCount(); }, [adminPanel]);

  const navItems = useMemo(() => [
    { key: 'analytics', label: 'Analytics', icon: 'analytics' },
    { key: 'events', label: 'Manage Events', icon: 'cal' },
    { key: 'bookings', label: 'Bookings', icon: 'ticket' },
    { key: 'upload', label: 'Event Images', icon: 'image' },
    { key: 'messages', label: 'Messages', icon: 'mail', badge: unreadCount },
  ], [unreadCount]);

  return (
    <div className="dash-wrap">
      <div className="container dash-shell">
        <DashboardSidebar
          profile={{ name: user.name, subtitle: 'Organizer account', photoUrl: user.photoUrl }}
          items={navItems}
          active={adminPanel}
          onSelect={setAdminPanel}
          onBack={() => goTo('home')}
        />
        <div className="dash-main">
          {adminPanel === 'analytics' && <AdminAnalyticsPanel />}
          {adminPanel === 'events' && <AdminEventsPanel />}
          {adminPanel === 'bookings' && <AdminBookingsPanel />}
          {adminPanel === 'upload' && <AdminUploadPanel />}
          {adminPanel === 'messages' && <AdminMessagesPanel />}
        </div>
      </div>
    </div>
  );
}
