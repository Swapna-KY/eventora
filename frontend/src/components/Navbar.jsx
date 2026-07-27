import { useEffect, useState } from 'react';
import Icon from './Icon';
import Avatar from './Avatar';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { useNavigation } from '../context/NavigationContext';
import { useToast } from '../context/ToastContext';
import MobileMenu from './MobileMenu';
import '../styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const { openAuth } = useModal();
  const { view, goTo, goToPanel } = useNavigation();
  const { showToast } = useToast();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navClass = `navbar ${scrolled ? 'scrolled' : ''} ${view !== 'home' ? 'solid' : ''}`;

  const scrollToHash = (hash) => (e) => {
    e.preventDefault();
    if (view !== 'home') goTo('home');
    setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), view !== 'home' ? 50 : 0);
  };

  return (
    <>
      <header className={navClass}>
        <div className="container nav-row">
          <div className="logo" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => goTo('home')}>
            <div className="logo-mark" style={{ background: 'transparent', boxShadow: 'none' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--indigo)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
              <span style={{ fontSize: 24, letterSpacing: '0.05em', fontWeight: 'bold' }}>Eventora</span>
            </div>
          </div>
          <nav className="nav-links" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <a href="#" className={view === 'home' ? 'active-pill' : ''} onClick={(e) => { e.preventDefault(); goTo('home'); window.scrollTo({top:0, behavior:'smooth'}); }}>HOME</a>
            <a href="#" className={view === 'events' ? 'active-pill' : ''} onClick={(e) => { e.preventDefault(); goTo('events'); }}>EVENTS</a>
            <a href="#" className={view === 'gallery' ? 'active-pill' : ''} onClick={(e) => { e.preventDefault(); goTo('gallery'); }}>GALLERY</a>
            <a href="#" className={view === 'contact' ? 'active-pill' : ''} onClick={(e) => { e.preventDefault(); goTo('contact'); }}>CONTACT</a>
          </nav>
          <div className="nav-actions">


            {!user && (
              <div className="auth-buttons">
                <button className="btn btn-ghost btn-sm auth-login-btn" onClick={() => openAuth('login')}>Log in</button>
                <button className="btn btn-primary btn-sm" onClick={() => openAuth('register')}>Sign up</button>
              </div>
            )}

            {user && (
              <button
                className="btn btn-primary btn-sm"
                style={{ borderRadius: 20, padding: '7px 18px', fontSize: 13, fontWeight: 600 }}
                onClick={() => goToPanel('myEvents')}
              >
                + Host Event
              </button>
            )}

            {user && (
              <div className="avatar-wrap">
                <Avatar name={user.name} photoUrl={user.photoUrl} className="avatar" onClick={() => setMenuOpen((o) => !o)} />
                <div className={`avatar-menu ${menuOpen ? 'open' : ''}`} onMouseLeave={() => setMenuOpen(false)}>
                  <div className="au"><strong>{user.name}</strong><span>{user.email}</span></div>
                  <button onClick={() => { goTo('home'); setMenuOpen(false); }}><Icon name="grid" /> Explore Events</button>
                  <button onClick={() => { goTo('dashboard'); setMenuOpen(false); }}><Icon name="user" /> My Dashboard</button>
                  <button onClick={() => { goToPanel('myEvents'); setMenuOpen(false); }}><Icon name="cal" /> Host an Event</button>
                  {user.role === 'ADMIN' && (
                    <button onClick={() => { goTo('admin'); setMenuOpen(false); }}><Icon name="settings" /> Admin Panel</button>
                  )}
                  <button onClick={() => { logout(); goTo('home'); setMenuOpen(false); }}><Icon name="logout" /> Sign out</button>
                </div>
              </div>
            )}

            <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen(true)}>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
