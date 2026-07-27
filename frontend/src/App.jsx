import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import BookingModal from './components/BookingModal';
import InfoModal from './components/InfoModal';
import PageSpinner from './components/PageSpinner';
import Home from './pages/Home';
import EventDetailsPage from './pages/EventDetailsPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import { useAuth } from './context/AuthContext';
import { useNavigation } from './context/NavigationContext';

export default function App() {
  const { user, initializing } = useAuth();
  const { view } = useNavigation();

  const showDashboardLoading = initializing && (view === 'dashboard' || view === 'admin');

  return (
    <>
      <Navbar />

      {view === 'home' && <Home />}
      {view === 'events' && <EventsPage />}
      {view === 'gallery' && <GalleryPage />}
      {view === 'contact' && <ContactPage />}
      {view === 'eventDetails' && <EventDetailsPage />}

      {showDashboardLoading && <PageSpinner />}
      {!initializing && view === 'dashboard' && user && <UserDashboard />}
      {!initializing && view === 'admin' && user?.role === 'ADMIN' && <AdminDashboard />}

      <AuthModal />
      <BookingModal />
      <InfoModal />
    </>
  );
}
