import { api } from './client';
import { mapNotification } from './mappers';

export async function fetchNotifications() {
  const data = await api.get('/notifications');
  return data.map(mapNotification);
}

export function markNotificationRead(id) {
  return api.patch(`/notifications/${id}/read`);
}
