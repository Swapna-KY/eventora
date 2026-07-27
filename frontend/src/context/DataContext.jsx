import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';
import * as eventsApi from '../api/events';
import * as bookingsApi from '../api/bookings';
import * as savedApi from '../api/saved';
import * as notificationsApi from '../api/notifications';
import * as statsApi from '../api/stats';
import * as testimonialsApi from '../api/testimonials';

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  const savedIds = useMemo(() => new Set(savedEvents.map((e) => e.id)), [savedEvents]);

  const loadEvents = useCallback(async () => {
    try {
      const data = await eventsApi.fetchEvents();
      setEvents(data);
      setEventsError(null);
    } catch (err) {
      setEventsError(err.message);
    } finally {
      setEventsLoading(false);
    }
  }, []);

  const loadMyBookings = useCallback(async () => {
    if (!user) { setBookings([]); return; }
    const data = await bookingsApi.fetchMyBookings();
    setBookings(data);
  }, [user]);

  const loadSaved = useCallback(async () => {
    if (!user) { setSavedEvents([]); return; }
    const data = await savedApi.fetchSaved();
    setSavedEvents(data);
  }, [user]);

  const loadNotifications = useCallback(async () => {
    if (!user) { setNotifications([]); return; }
    const data = await notificationsApi.fetchNotifications();
    setNotifications(data);
  }, [user]);

  const loadStats = useCallback(async () => {
    try {
      const data = await statsApi.fetchStats();
      setStats(data);
    } catch {
      setStats(null); // homepage just falls back to non-numeric copy if this fails
    }
  }, []);

  const loadTestimonials = useCallback(async () => {
    const data = await testimonialsApi.fetchTestimonials();
    setTestimonials(data);
  }, []);

  const addTestimonial = useCallback(async (payload) => {
    await testimonialsApi.submitTestimonial(payload);
    await loadTestimonials();
  }, [loadTestimonials]);

  // initial public load
  useEffect(() => { loadEvents(); loadStats(); loadTestimonials(); }, [loadEvents, loadStats, loadTestimonials]);

  // whenever the logged-in user changes, refresh (or clear) their private data
  useEffect(() => {
    if (user) {
      loadMyBookings();
      loadSaved();
      loadNotifications();
    } else {
      setBookings([]); setSavedEvents([]); setNotifications([]);
    }
  }, [user, loadMyBookings, loadSaved, loadNotifications]);

  const bookEvent = useCallback(async (payload) => {
    const booking = await bookingsApi.createBooking(payload);
    setBookings((prev) => [booking, ...prev]);
    await Promise.all([loadEvents(), loadStats()]); // refresh seat counts + stats from the source of truth
    return booking;
  }, [loadEvents, loadStats]);

  const cancelBooking = useCallback(async (bookingId) => {
    const updated = await bookingsApi.cancelBooking(bookingId);
    setBookings((prev) => prev.map((b) => (b.bookingId === bookingId ? updated : b)));
    await Promise.all([loadEvents(), loadStats()]); // seats were restored, stats may have changed
    return updated;
  }, [loadEvents, loadStats]);

  const toggleSave = useCallback(async (event) => {
    if (savedIds.has(event.id)) {
      await savedApi.unsaveEvent(event.id);
      setSavedEvents((prev) => prev.filter((e) => e.id !== event.id));
    } else {
      await savedApi.saveEvent(event.id);
      setSavedEvents((prev) => [...prev, event]);
    }
  }, [savedIds]);

  const createEvent = useCallback(async (payload) => {
    await eventsApi.createEvent(payload);
    await Promise.all([loadEvents(), loadStats()]);
  }, [loadEvents, loadStats]);

  const updateEvent = useCallback(async (id, payload) => {
    await eventsApi.updateEvent(id, payload);
    await Promise.all([loadEvents(), loadStats()]);
  }, [loadEvents, loadStats]);

  const deleteEvent = useCallback(async (id) => {
    await eventsApi.deleteEvent(id);
    await Promise.all([loadEvents(), loadStats()]);
  }, [loadEvents, loadStats]);

  return (
    <DataContext.Provider value={{
      events, eventsError, eventsLoading, loadEvents,
      bookings, loadMyBookings,
      savedEvents, savedIds, loadSaved, toggleSave,
      notifications, loadNotifications,
      stats, loadStats,
      testimonials, loadTestimonials, addTestimonial,
      bookEvent, cancelBooking, createEvent, updateEvent, deleteEvent,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
}
