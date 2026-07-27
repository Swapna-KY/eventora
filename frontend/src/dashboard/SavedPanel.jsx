import Icon from '../components/Icon';
import EventCard from '../components/EventCard';
import { useData } from '../context/DataContext';

export default function SavedPanel() {
  const { savedEvents } = useData();
  return (
    <div className="dash-panel active">
      <div className="dash-head"><div><h2>Saved Events</h2><p>Events you've bookmarked for later.</p></div></div>
      <div className="saved-grid">
        {savedEvents.length
          ? savedEvents.map((e) => <EventCard key={e.id} event={e} />)
          : <div className="empty-state" style={{ gridColumn: '1/-1' }}><Icon name="bookmark" /><p>No saved events yet. Tap the heart on any event to save it here.</p></div>}
      </div>
    </div>
  );
}
