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

  // Auth me
  if (path.includes('/auth/me')) {
    if (!token) return null;
    return { id: 1, name: 'Swapna KY', email: 'swapna@eventora.in', role: 'ADMIN' };
  }

  // Auth login
  if (path.includes('/auth/login')) {
    setToken('demo_jwt_token_swapna_ky');
    return { token: 'demo_jwt_token_swapna_ky', user: { id: 1, name: 'Swapna KY', email: 'swapna@eventora.in', role: 'ADMIN' } };
  }

  // Auth register
  if (path.includes('/auth/register')) {
    let body = {};
    try { body = JSON.parse(options.body); } catch {}
    setToken('demo_jwt_token_user');
    return { token: 'demo_jwt_token_user', user: { id: 99, name: body.name || 'User', email: body.email || 'user@eventora.in', role: 'USER' } };
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
      const newB = { bookingId: 'BK-' + Math.floor(Math.random() * 90000 + 10000), eventId: body.eventId, eventTitle: body.eventTitle || 'Event Ticket', quantity: body.ticketCount || 1, totalPrice: (body.ticketPrice || 499) * (body.ticketCount || 1), status: 'CONFIRMED', bookedAt: new Date().toISOString() };
      const current = JSON.parse(localStorage.getItem('eh_mock_bookings') || '[]');
      localStorage.setItem('eh_mock_bookings', JSON.stringify([newB, ...current]));
      return newB;
    }
    return JSON.parse(localStorage.getItem('eh_mock_bookings') || '[]');
  }

  // Saved / Notifications
  if (path.includes('/saved') || path.includes('/notifications')) return [];

  return [];
}

export async function apiFetch(path, options = {}) {
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
