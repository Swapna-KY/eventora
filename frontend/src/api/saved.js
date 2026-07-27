import { api } from './client';
import { mapEvent } from './mappers';

export async function fetchSaved() {
  const data = await api.get('/saved');
  return data.map(mapEvent);
}

export function saveEvent(eventId) {
  return api.post(`/saved/${eventId}`);
}

export function unsaveEvent(eventId) {
  return api.del(`/saved/${eventId}`);
}
