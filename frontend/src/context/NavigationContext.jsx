import { createContext, useCallback, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useModal } from './ModalContext';
import { useToast } from './ToastContext';

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [view, setView] = useState('home');
  const [dashboardPanel, setDashboardPanel] = useState('profile');
  const [adminPanel, setAdminPanel] = useState('analytics');
  const [viewingEvent, setViewingEvent] = useState(null);
  const { user, isAdmin } = useAuth();
  const { openAuth } = useModal();
  const { showToast } = useToast();

  const goTo = useCallback((target) => {
    if (target === 'dashboard' && !user) {
      openAuth('login');
      showToast('Log in to view your dashboard');
      return;
    }
    if (target === 'admin' && (!user || !isAdmin)) {
      if (!user) openAuth('login');
      showToast(user ? 'Admin access required' : 'Log in with an admin account');
      return;
    }
    setView(target);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [user, isAdmin, openAuth, showToast]);

  // Jump straight to a specific tab inside the user dashboard (e.g. "Host an Event" -> My Events).
  const goToPanel = useCallback((panel) => {
    if (!user) {
      openAuth('login');
      showToast('Log in to continue');
      return;
    }
    setDashboardPanel(panel);
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [user, openAuth, showToast]);

  // Jump straight into the Admin Dashboard, optionally to a specific tab (e.g. the
  // contact-form confirmation linking directly to Messages instead of just naming it in text).
  const goToAdminPanel = useCallback((panel = 'messages') => {
    if (!user || !isAdmin) {
      if (!user) openAuth('login');
      showToast(user ? 'Admin access required' : 'Log in with an admin account');
      return;
    }
    setAdminPanel(panel);
    setView('admin');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [user, isAdmin, openAuth, showToast]);

  // Open the full Event Details page - browsing details never requires login (only booking does).
  const goToEvent = useCallback((event) => {
    setViewingEvent(event);
    setView('eventDetails');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <NavigationContext.Provider value={{
      view, goTo,
      dashboardPanel, setDashboardPanel, goToPanel,
      adminPanel, setAdminPanel, goToAdminPanel,
      viewingEvent, goToEvent,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within a NavigationProvider');
  return ctx;
}
