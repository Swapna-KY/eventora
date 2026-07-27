import { api } from './client';
import { mapEvent, eventToApiPayload } from './mappers';

export async function fetchEvents({ featured, q, city } = {}) {
  const params = new URLSearchParams();
  if (featured) params.set('featured', 'true');
  if (q) params.set('q', q);
  if (city) params.set('city', city);
  const qs = params.toString();
  const data = await api.get(`/events${qs ? `?${qs}` : ''}`);
  return data.map(mapEvent);
}

export async function fetchEvent(id) {
  const data = await api.get(`/events/${id}`);
  return mapEvent(data);
}

export async function createEvent(event) {
  const data = await api.post('/events', eventToApiPayload(event));
  return mapEvent(data);
}

export async function updateEvent(id, event) {
  const data = await api.put(`/events/${id}`, eventToApiPayload(event));
  return mapEvent(data);
}

export function deleteEvent(id) {
  return api.del(`/events/${id}`);
}
