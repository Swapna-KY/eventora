import { api } from './client';

export function fetchStats() {
  return api.get('/stats');
}
