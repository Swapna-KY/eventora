import DashboardSidebar from '../dashboard/DashboardSidebar';
import ProfilePanel from '../dashboard/ProfilePanel';
import MyEventsPanel from '../dashboard/MyEventsPanel';
import BookingsPanel from '../dashboard/BookingsPanel';
import UpcomingPanel from '../dashboard/UpcomingPanel';
import SavedPanel from '../dashboard/SavedPanel';
import NotificationsPanel from '../dashboard/NotificationsPanel';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '../context/NavigationContext';

const NAV_ITEMS = [
  { key: 'profile', label: 'Profile', icon: 'user' },
  { key: 'myEvents', label: 'My Events', icon: 'cal' },
  { key: 'bookings', label: 'My Bookings', icon: 'ticket' },
  { key: 'upcoming', label: 'Upcoming Events', icon: 'clock' },
  { key: 'saved', label: 'Saved Events', icon: 'bookmark' },
  { key: 'notifs', label: 'Notifications', icon: 'bell' },
];

export default function UserDashboard() {
  const { user } = useAuth();
  const { goTo, dashboardPanel, setDashboardPanel } = useNavigation();

  return (
    <div className="dash-wrap">
      <div className="container dash-shell">
        <DashboardSidebar
          profile={{ name: user.name, subtitle: 'Member', photoUrl: user.photoUrl }}
          items={NAV_ITEMS}
          active={dashboardPanel}
          onSelect={setDashboardPanel}
          onBack={() => goTo('home')}
        />
        <div className="dash-main">
          {dashboardPanel === 'profile' && <ProfilePanel />}
          {dashboardPanel === 'myEvents' && <MyEventsPanel />}
          {dashboardPanel === 'bookings' && <BookingsPanel />}
          {dashboardPanel === 'upcoming' && <UpcomingPanel />}
          {dashboardPanel === 'saved' && <SavedPanel />}
          {dashboardPanel === 'notifs' && <NotificationsPanel />}
        </div>
      </div>
    </div>
  );
}
