import { api } from './client';
import { mapTestimonial } from './mappers';

export async function fetchTestimonials() {
  const data = await api.get('/testimonials');
  return data.map(mapTestimonial);
}

export function submitTestimonial({ quote, rating }) {
  return api.post('/testimonials', { quote, rating });
}
