import { useState } from 'react';
import Icon from './Icon';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import { useToast } from '../context/ToastContext';
import '../styles/modals.css';

export default function AuthModal() {
  const { authModal, closeAuth, openAuth } = useModal();
  const { login, register } = useAuth();
  const { showToast } = useToast();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({ name: '', email: '', password: '' });
  const [busy, setBusy] = useState(false);

  if (!authModal.open) return null;
  const mode = authModal.mode;

  const handleLogin = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await login(loginForm.email, loginForm.password);
      closeAuth();
      showToast(`Welcome, ${res.name}!`);
    } catch (err) {
      showToast(err.message);
    } finally {
      setBusy(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await register(regForm.name, regForm.email, regForm.password);
      closeAuth();
      showToast(`Welcome, ${res.name}!`);
    } catch (err) {
      showToast(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="modal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) closeAuth(); }}>
      <div className="modal-box" style={{ maxWidth: 440 }}>
        <button className="modal-close" onClick={closeAuth}><Icon name="x" /></button>
        <div className="modal-body" style={{ paddingTop: 38 }}>
          <div style={{ display: 'flex', gap: 8, background: 'var(--bg-soft)', borderRadius: 14, padding: 5, marginBottom: 26 }}>
            <button
              className={`btn btn-sm auth-tab ${mode === 'login' ? 'active' : ''}`}
              style={{ flex: 1, background: 'none', color: 'var(--gray-600)' }}
              onClick={() => openAuth('login')}
            >
              Log in
            </button>
            <button
              className={`btn btn-sm auth-tab ${mode === 'register' ? 'active' : ''}`}
              style={{ flex: 1, background: 'none', color: 'var(--gray-600)' }}
              onClick={() => openAuth('register')}
            >
              Sign up
            </button>
          </div>

          {mode === 'login' && (
            <form onSubmit={handleLogin}>
              <h3 style={{ fontSize: 21, marginBottom: 6 }}>Welcome back</h3>
              <p style={{ color: 'var(--gray-500)', fontSize: 13.5, marginBottom: 22 }}>Log in to book tickets and manage your events.</p>
              <div className="field"><label>Email</label><input type="email" required value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} placeholder="you@email.com" /></div>
              <div className="field"><label>Password</label><input type="password" required value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="••••••••" /></div>
              <button type="submit" className="btn btn-primary btn-block" disabled={busy}>{busy ? 'Logging in...' : 'Log in'}</button>

            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister}>
              <h3 style={{ fontSize: 21, marginBottom: 6 }}>Create your account</h3>
              <p style={{ color: 'var(--gray-500)', fontSize: 13.5, marginBottom: 22 }}>Join Eventora to start booking experiences.</p>
              <div className="field"><label>Full name</label><input type="text" required value={regForm.name} onChange={(e) => setRegForm({ ...regForm, name: e.target.value })} placeholder="Your name" /></div>
              <div className="field"><label>Email</label><input type="email" required value={regForm.email} onChange={(e) => setRegForm({ ...regForm, email: e.target.value })} placeholder="you@email.com" /></div>
              <div className="field"><label>Password</label><input type="password" required minLength={6} value={regForm.password} onChange={(e) => setRegForm({ ...regForm, password: e.target.value })} placeholder="At least 6 characters" /></div>
              <button type="submit" className="btn btn-primary btn-block" disabled={busy}>{busy ? 'Creating account...' : 'Create account'}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
