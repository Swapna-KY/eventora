import { api } from './client';

export function submitContactMessage({ name, email, subject, message }) {
  return api.post('/contact', { name, email, subject, message });
}

export function fetchMessages() {
  return api.get('/admin/messages');
}

export function markMessageRead(id) {
  return api.patch(`/admin/messages/${id}/read`);
}
