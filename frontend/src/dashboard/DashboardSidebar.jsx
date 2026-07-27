import Avatar from '../components/Avatar';
import Icon from '../components/Icon';
import '../styles/dashboard.css';

export default function DashboardSidebar({ profile, items, active, onSelect, onBack }) {
  return (
    <aside className="dash-side">
      <div className="dash-profile">
        <Avatar name={profile.name} photoUrl={profile.photoUrl} size={52} />
        <div><strong>{profile.name}</strong><span>{profile.subtitle}</span></div>
      </div>
      <nav className="dash-nav">
        {items.map((item) => (
          <button
            key={item.key}
            className={active === item.key ? 'active' : ''}
            onClick={() => onSelect(item.key)}
          >
            <Icon name={item.icon} /> {item.label}
            {!!item.badge && <span className="dash-nav-badge">{item.badge}</span>}
          </button>
        ))}
        <button onClick={onBack} style={{ marginTop: 14, borderTop: '1px solid var(--gray-100)', paddingTop: 18, color: 'var(--gray-500)' }}>
          <Icon name="arrow-r" style={{ transform: 'rotate(180deg)' }} /> Back to site
        </button>
      </nav>
    </aside>
  );
}
