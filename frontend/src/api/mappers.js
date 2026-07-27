// Backend (Spring Boot) field names -> the shape our components expect.
// Keeping this translation in one place means components never need to know
// about eventDate/imageUrl/description etc - they just use date/img/desc.

export function mapEvent(e) {
  return {
    id: e.id,
    title: e.title,
    category: e.category,
    city: e.city,
    date: e.eventDate,
    rating: e.rating,
    seats: e.seats,
    price: e.price,
    featured: e.featured,
    img: e.imageUrl,
    venue: e.venue,
    desc: e.description,
    organizerId: e.organizerId,
    organizerName: e.organizerName,
  };
}

export function eventToApiPayload(e) {
  return {
    title: e.title,
    category: e.category,
    city: e.city,
    eventDate: e.date,
    price: Number(e.price),
    seats: Number(e.seats),
    rating: Number(e.rating) || 4.5,
    featured: e.featured ?? true,
    imageUrl: e.img,
    venue: e.venue,
    description: e.desc,
  };
}

const TICKET_TYPE_LABEL = { GENERAL: 'General', VIP: 'VIP', GROUP: 'Group' };

export function mapBooking(b) {
  return {
    id: b.bookingReference,
    bookingId: b.id,
    eventId: b.eventId,
    qty: b.quantity,
    type: TICKET_TYPE_LABEL[b.ticketType] || b.ticketType,
    amount: b.amount,
    status: b.status,
    name: b.attendeeName,
    eventTitle: b.eventTitle,
    eventImage: b.eventImage,
    eventCity: b.eventCity,
    eventDate: b.eventDate,
    bookingReference: b.bookingReference,
    ticketType: b.ticketType,
    quantity: b.quantity,
  };
}

export function mapTestimonial(t) {
  return {
    id: t.id,
    name: t.name,
    city: t.city,
    quote: t.quote,
    rating: t.rating,
    createdAt: t.createdAt,
  };
}

export function timeAgo(iso) {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

export function mapNotification(n) {
  return { id: n.id, icon: n.icon, text: n.message, time: timeAgo(n.createdAt), unread: !n.isRead };
}

export function inr(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}
