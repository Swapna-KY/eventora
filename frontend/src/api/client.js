import { MOCK_EVENTS, MOCK_TESTIMONIALS, MOCK_STATS } from './mockData';

export const API_BASE = import.meta.env.VITE_API_BASE || 'https://eventora-je8w.onrender.com/api';

const DEFAULT_TIMEOUT_MS = 10000;
const TOKEN_KEY = 'eh_token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

/**
 * Handles mock responses ONLY when the backend server is completely offline / unreachable.
 */
function handleMockFallback(path, options) {
  const method = (options.method || 'GET').toUpperCase();
  const token = getToken();

  // Fetch current user (used by AuthContext on page load)
  if (path.includes('/users/me')) {
    if (!token) return null;
    const storedUser = localStorage.getItem('eh_mock_user');
    if (storedUser) {
      try { return JSON.parse(storedUser); } catch {}
    }
    return null;
  }

  // Auth login — any credentials work in demo mode
  if (path.includes('/auth/login')) {
    let body = {};
    try { body = JSON.parse(options.body); } catch {}
    const isAdmin = body.email === 'swapna@eventora.in';
    const loggedUser = {
      id: isAdmin ? 1 : Date.now(),
      name: isAdmin ? 'Swapna KY' : (body.email ? body.email.split('@')[0] : 'Demo User'),
      email: body.email || 'demo@eventora.in',
      role: isAdmin ? 'ADMIN' : 'USER',
    };
    setToken('demo_jwt_token_' + (isAdmin ? 'admin' : 'user'));
    localStorage.setItem('eh_mock_user', JSON.stringify(loggedUser));
    return { token: 'demo_jwt_token_' + (isAdmin ? 'admin' : 'user'), ...loggedUser };
  }

  // Auth register
  if (path.includes('/auth/register')) {
    let body = {};
    try { body = JSON.parse(options.body); } catch {}
    const regUser = {
      id: Date.now(),
      name: body.name || 'New User',
      email: body.email || 'user@eventora.in',
      role: 'USER',
    };
    setToken('demo_jwt_token_user');
    localStorage.setItem('eh_mock_user', JSON.stringify(regUser));
    return { token: 'demo_jwt_token_user', ...regUser };
  }

  // Events list
  if (path.includes('/events')) {
    if (method === 'POST') {
      let body = {};
      try { body = JSON.parse(options.body); } catch {}
      const newE = {
        id: Date.now(),
        title: body.title || 'New Event',
        description: body.description || '',
        category: body.category || 'Music',
        city: body.city || 'Bangalore',
        venue: body.venue || 'Main Arena',
        eventDate: body.eventDate || '2026-12-31',
        price: body.price || 499,
        seats: body.seats || 100,
        rating: 5.0,
        imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        featured: true,
        organizerName: 'Swapna KY',
      };
      const userAdded = JSON.parse(localStorage.getItem('eh_user_events') || '[]');
      localStorage.setItem('eh_user_events', JSON.stringify([newE, ...userAdded]));
      return newE;
    }

    const userAdded = JSON.parse(localStorage.getItem('eh_user_events') || '[]');
    return [...MOCK_EVENTS, ...userAdded];
  }

  // Testimonials
  if (path.includes('/testimonials')) {
    if (method === 'POST') {
      let body = {};
      try { body = JSON.parse(options.body); } catch {}
      const newT = { id: Date.now(), name: 'Swapna KY', city: 'Bangalore', rating: body.rating || 5, quote: body.quote };
      const current = JSON.parse(localStorage.getItem('eh_mock_testi') || JSON.stringify(MOCK_TESTIMONIALS));
      const updated = [newT, ...current];
      localStorage.setItem('eh_mock_testi', JSON.stringify(updated));
      return newT;
    }
    return JSON.parse(localStorage.getItem('eh_mock_testi') || JSON.stringify(MOCK_TESTIMONIALS));
  }

  // Stats
  if (path.includes('/stats')) return MOCK_STATS;

  // Bookings
  if (path.includes('/bookings')) {
    if (method === 'POST') {
      let body = {};
      try { body = JSON.parse(options.body); } catch {}

      // Look up event price from mock data
      const TICKET_MULTIPLIERS = { GENERAL: 1, VIP: 2, GROUP: 0.8 };
      const userAdded = JSON.parse(localStorage.getItem('eh_user_events') || '[]');
      const allEvents = [...MOCK_EVENTS, ...userAdded];
      const event = allEvents.find((e) => e.id == body.eventId);
      const basePrice = event ? event.price : 499;
      const multiplier = TICKET_MULTIPLIERS[body.ticketType] || 1;
      const qty = body.quantity || 1;
      const amount = basePrice * multiplier * qty;
      const ref = 'BK-' + Math.floor(Math.random() * 90000 + 10000);

      const newB = {
        bookingReference: ref,
        id: Date.now(),
        eventId: body.eventId,
        eventTitle: event ? event.title : 'Event Ticket',
        eventImage: event ? event.imageUrl : '',
        eventCity: event ? event.city : '',
        eventDate: event ? event.eventDate : '',
        quantity: qty,
        ticketType: body.ticketType || 'GENERAL',
        amount,
        status: 'CONFIRMED',
        attendeeName: body.attendeeName || 'Guest',
        bookedAt: new Date().toISOString(),
      };
      const current = JSON.parse(localStorage.getItem('eh_mock_bookings') || '[]');
      localStorage.setItem('eh_mock_bookings', JSON.stringify([newB, ...current]));
      return newB;
    }

    // Cancel booking: PATCH /bookings/{id}/cancel
    if (method === 'PATCH' && path.includes('/cancel')) {
      const parts = path.split('/');
      const idStr = parts[parts.indexOf('bookings') + 1];
      const current = JSON.parse(localStorage.getItem('eh_mock_bookings') || '[]');
      let cancelled = null;
      const updated = current.map((b) => {
        if (String(b.id) === String(idStr) || b.bookingReference === idStr) {
          cancelled = { ...b, status: 'CANCELLED' };
          return cancelled;
        }
        return b;
      });
      localStorage.setItem('eh_mock_bookings', JSON.stringify(updated));
      return cancelled || { status: 'CANCELLED' };
    }

    // My bookings: GET /bookings/my
    return JSON.parse(localStorage.getItem('eh_mock_bookings') || '[]');
  }

  // Admin analytics
  if (path.includes('/admin/analytics')) {
    const bookings = JSON.parse(localStorage.getItem('eh_mock_bookings') || '[]');
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const totalTicketsSold = bookings.reduce((sum, b) => sum + (b.quantity || 0), 0);
    const userAdded = JSON.parse(localStorage.getItem('eh_user_events') || '[]');
    const activeEvents = MOCK_EVENTS.length + userAdded.length;
    const conversionRate = activeEvents > 0 ? Math.min(((totalTicketsSold / (activeEvents * 50)) * 100).toFixed(1), 99) : 4.2;

    // Build last-7-days bookings (count per day)
    const now = Date.now();
    const bookingsLast7Days = Array.from({ length: 7 }, (_, i) => {
      const dayStart = now - (6 - i) * 86400000;
      const dayEnd = dayStart + 86400000;
      return bookings.filter((b) => { const t = new Date(b.bookedAt).getTime(); return t >= dayStart && t < dayEnd; }).length;
    });

    // Seats by category
    const seatsByCategory = {};
    bookings.forEach((b) => {
      const allEvents = [...MOCK_EVENTS, ...userAdded];
      const ev = allEvents.find((e) => e.id == b.eventId);
      const cat = ev ? ev.category : 'Other';
      seatsByCategory[cat] = (seatsByCategory[cat] || 0) + (b.quantity || 0);
    });
    // Seed with mock data if no bookings yet
    if (!bookings.length) {
      ['Technology', 'Music', 'Business', 'Comedy', 'Art & Culture', 'Sports'].forEach((c, i) => {
        seatsByCategory[c] = [1200, 980, 650, 820, 430, 770][i];
      });
    }

    return {
      totalRevenue: totalRevenue || 892450,
      totalTicketsSold: totalTicketsSold || 4850,
      activeEvents,
      conversionRate: Number(conversionRate) || 4.2,
      bookingsLast7Days: bookingsLast7Days.some(Boolean) ? bookingsLast7Days : [12, 19, 8, 24, 31, 18, 27],
      seatsByCategory,
    };
  }

  // Saved / Notifications
  if (path.includes('/saved') || path.includes('/notifications')) return [];

  return [];
}

export async function apiFetch(path, options = {}) {
  const isVercelHost = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
  const hasCustomApi = !!import.meta.env.VITE_API_BASE;

  // On Vercel without custom backend env, use instant mock responses
  if (isVercelHost && !hasCustomApi) {
    return handleMockFallback(path, options);
  }

  const token = getToken();
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || DEFAULT_TIMEOUT_MS);

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers, signal: controller.signal });
  } catch (netErr) {
    clearTimeout(timeoutId);
    // Network / connection error (e.g. backend server offline) -> fallback to local mock
    return handleMockFallback(path, options);
  } finally {
    clearTimeout(timeoutId);
  }

  if (res.status === 204) return null;

  let body = null;
  try { body = await res.json(); } catch {}

  if (!res.ok) {
    // If backend returns a server gateway error (e.g. 502 Bad Gateway / 503 / 404 from offline cloud endpoint), fallback to mock
    if (res.status === 502 || res.status === 503 || res.status === 504 || res.status === 404) {
      return handleMockFallback(path, options);
    }
    const msg = (body && (body.message || Object.values(body)[0])) || `Request failed (${res.status})`;
    throw new Error(msg);
  }

  return body;
}

export const api = {
  get: (path, options) => apiFetch(path, options),
  post: (path, data, options) => apiFetch(path, { ...options, method: 'POST', body: JSON.stringify(data) }),
  put: (path, data, options) => apiFetch(path, { ...options, method: 'PUT', body: JSON.stringify(data) }),
  patch: (path, data, options) => apiFetch(path, { ...options, method: 'PATCH', body: data ? JSON.stringify(data) : undefined }),
  del: (path, options) => apiFetch(path, { ...options, method: 'DELETE' }),
};
