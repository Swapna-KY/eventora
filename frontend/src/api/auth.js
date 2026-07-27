import { api } from './client';

export function login(email, password) {
  return api.post('/auth/login', { email, password });
}

export function register(name, email, password) {
  return api.post('/auth/register', { name, email, password });
}

export function fetchMe(options) {
  return api.get('/users/me', options);
}

export function updateProfile(payload) {
  return api.put('/users/me', payload);
}
