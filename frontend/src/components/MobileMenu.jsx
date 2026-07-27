import Icon from './Icon';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { useNavigation } from '../context/NavigationContext';

export default function MobileMenu({ open, onClose }) {
  const { user, logout } = useAuth();
  const { openAuth } = useModal();
  const { goTo, goToPanel } = useNavigation();

  const go = (target) => { goTo(target); onClose(); };
  const goPanel = (panel) => { goToPanel(panel); onClose(); };
  const scrollToHash = (hash) => {
    goTo('home');
    onClose();
    setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <div className={`mobile-menu ${open ? 'open' : ''}`}>
      <div className="mm-top">
        <span className="logo" style={{ color: '#fff' }}>EventHub</span>
        <button onClick={onClose} className="mm-close"><Icon name="x" style={{ width: 20, height: 20 }} /></button>
      </div>
      <a href="#featured" onClick={(e) => { e.preventDefault(); scrollToHash('#featured'); }}>Explore</a>
      <a href="#categories" onClick={(e) => { e.preventDefault(); scrollToHash('#categories'); }}>Categories</a>
      <a href="#gallery" onClick={(e) => { e.preventDefault(); scrollToHash('#gallery'); }}>Gallery</a>
      <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToHash('#faq'); }}>FAQ</a>
      <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToHash('#contact'); }}>Contact</a>
      <button onClick={() => go('dashboard')}>My Dashboard</button>
      <button onClick={() => goPanel('myEvents')}>Host an Event</button>
      {user?.role === 'ADMIN' && <button onClick={() => go('admin')}>Admin Panel</button>}
      {!user && <button onClick={() => { openAuth('login'); onClose(); }}>Log in</button>}
      {user && <button onClick={() => { logout(); go('home'); }}>Sign out</button>}
    </div>
  );
}
