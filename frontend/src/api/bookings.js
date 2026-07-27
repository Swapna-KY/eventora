import { api } from './client';
import { mapBooking } from './mappers';

export async function createBooking({ eventId, ticketType, quantity, attendeeName, attendeeEmail, attendeePhone }) {
  const data = await api.post('/bookings', { eventId, ticketType, quantity, attendeeName, attendeeEmail, attendeePhone });
  return mapBooking(data);
}

export async function fetchMyBookings() {
  const data = await api.get('/bookings/my');
  return data.map(mapBooking);
}

export async function fetchAllBookings(q) {
  const data = await api.get(`/bookings${q ? `?q=${encodeURIComponent(q)}` : ''}`);
  return data.map(mapBooking);
}

export async function cancelBooking(id) {
  const data = await api.patch(`/bookings/${id}/cancel`);
  return mapBooking(data);
}
