import Avatar from './Avatar';

export default function OrganizerCard({ name, eventCount }) {
  return (
    <div className="organizer-card">
      <Avatar name={name || 'Organizer'} size={52} />
      <div className="organizer-info">
        <span className="organizer-label">Hosted by</span>
        <strong>{name || 'EventHub'}</strong>
        {typeof eventCount === 'number' && (
          <span className="organizer-meta">{eventCount} {eventCount === 1 ? 'event' : 'events'} on EventHub</span>
        )}
      </div>
    </div>
  );
}
