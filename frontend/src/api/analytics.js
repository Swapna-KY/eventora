import { api } from './client';

export function fetchAnalytics() {
  return api.get('/admin/analytics');
}
