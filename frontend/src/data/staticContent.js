export const GALLERY = [
  { img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80', cap: 'Crowd Energy', tag: 'Music' },
  { img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80', cap: 'Festival Nights', tag: 'Music' },
  { img: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=80', cap: 'Live Concert', tag: 'Music' },
  { img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', cap: 'Open Air Show', tag: 'Music' },
  { img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=900&q=80', cap: 'Stage Lights', tag: 'Music' },
  { img: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80', cap: 'Tech Summit', tag: 'Technology' },
  { img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80', cap: 'Startup Mixer', tag: 'Business' },
  { img: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=900&q=80', cap: 'Pitch Night', tag: 'Business' },
  { img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80', cap: 'Comedy Night', tag: 'Comedy' },
  { img: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=900&q=80', cap: 'Art Exhibition', tag: 'Art & Culture' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80', cap: 'Design Week', tag: 'Art & Culture' },
  { img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=900&q=80', cap: 'Wellness Retreat', tag: 'Wellness' },
  { img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80', cap: 'Yoga Camp', tag: 'Wellness' },
  { img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80', cap: 'Culinary Class', tag: 'Food & Drink' },
  { img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80', cap: 'Food Festival', tag: 'Food & Drink' },
  { img: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=900&q=80', cap: 'Dinner Gala', tag: 'Food & Drink' },
  { img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80', cap: 'City Marathon', tag: 'Sports' },
  { img: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=900&q=80', cap: 'Run for Cause', tag: 'Sports' },
];

export const CATEGORIES = [
  { name: 'Music', icon: 'music' },
  { name: 'Technology', icon: 'cpu' },
  { name: 'Business', icon: 'briefcase' },
  { name: 'Comedy', icon: 'mic' },
  { name: 'Art & Culture', icon: 'image' },
  { name: 'Food & Drink', icon: 'coffee' },
  { name: 'Wellness', icon: 'leaf' },
  { name: 'Sports', icon: 'trophy' },
];

export const FAQS = [
  { q: 'How do I receive my tickets after booking?', a: 'The moment your payment is confirmed, an e-ticket with a unique QR code is sent to your registered email and saved under My Bookings in your dashboard — no printing required.' },
  { q: "Can I get a refund if I can't attend?", a: 'Yes. Most events on EventHub support free cancellation up to 48 hours before the event start time. Refunds are processed back to your original payment method within 5–7 business days.' },
  { q: 'Do you support group bookings?', a: 'Absolutely — select the Group ticket type during checkout for eligible events to unlock bundled pricing for four or more attendees in a single booking.' },
  { q: "I'm an organizer. How do I list my event?", a: 'Head to the Admin Panel from your profile menu, choose Manage Events, and click Add New Event. You can publish in minutes and track sales live from the Analytics tab.' },
  { q: 'Is my payment information secure?', a: 'Yes. All transactions are encrypted end-to-end and we never store your full card details on our servers.' },
];

export const TICKET_TYPES = [
  { key: 'GENERAL', label: 'General Admission', desc: 'Standard entry & seating', multiplier: 1 },
  { key: 'VIP', label: 'VIP Access', desc: 'Front rows + lounge access', multiplier: 1.8 },
  { key: 'GROUP', label: 'Group of 4', desc: 'Best value for groups', multiplier: 3.4 },
];
