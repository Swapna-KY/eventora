export default function VenueMap({ venue, city }) {
  const query = encodeURIComponent([venue, city].filter(Boolean).join(', '));
  return (
    <div className="venue-map">
      <iframe
        title="Venue location"
        src={`https://maps.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
