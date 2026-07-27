import Icon from './Icon';
import { useNavigation } from '../context/NavigationContext';
import '../styles/sections.css';

export default function Footer() {
  const { goTo, goToPanel } = useNavigation();

  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.08)',
      padding: '18px 0',
      background: 'var(--bg-dark, #0f0f1a)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ background: 'var(--indigo)', borderRadius: 8, padding: '4px 6px', display: 'flex' }}>
            <Icon name="ticket" style={{ width: 14, height: 14, color: '#fff' }} />
          </span>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.03em', color: '#fff' }}>Eventora</span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {[
            { label: 'Home',       action: () => { goTo('home'); window.scrollTo({ top: 0 }); } },
            { label: 'Events',     action: () => goTo('events') },
            { label: 'Gallery',    action: () => goTo('gallery') },
            { label: 'Contact',    action: () => goTo('contact') },
            { label: 'Dashboard',  action: () => goTo('dashboard') },
            { label: 'Host Event', action: () => goToPanel('myEvents') },
          ].map(({ label, action }) => (
            <a
              key={label}
              href="#"
              onClick={(e) => { e.preventDefault(); action(); }}
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
          © 2026 Eventora
        </span>
      </div>
    </footer>
  );
}
