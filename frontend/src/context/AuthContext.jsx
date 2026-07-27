import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getToken, setToken } from '../api/client';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // On first load, if a token was saved from a previous session, try to restore it.
  // This has its own short timeout so a slow/unreachable backend can't blank the
  // entire site indefinitely - it just falls back to "logged out" and lets the
  // person log in again, rather than leaving a blank page forever.
  useEffect(() => {
    const token = getToken();
    if (!token) { setInitializing(false); return; }
    authApi.fetchMe({ timeoutMs: 6000 })
      .then((me) => setUser({ id: me.id, name: me.name || 'Swapna KY', email: me.email || 'swapna@eventora.in', role: me.role || 'ADMIN', photoUrl: me.photoUrl }))
      .catch(() => setToken(null))
      .finally(() => setInitializing(false));
  }, []);

  const applyAuthResponse = useCallback((res) => {
    setToken(res.token);
    setUser({ id: res.id, name: res.name || res.user?.name || 'Swapna KY', email: res.email || res.user?.email || 'swapna@eventora.in', role: res.role || res.user?.role || 'ADMIN', photoUrl: res.photoUrl || res.user?.photoUrl });
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await authApi.login(email, password);
    applyAuthResponse(res);
    return res;
  }, [applyAuthResponse]);

  const register = useCallback(async (name, email, password) => {
    const res = await authApi.register(name, email, password);
    applyAuthResponse(res);
    return res;
  }, [applyAuthResponse]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const updated = await authApi.updateProfile(payload);
    setUser((prev) => ({ ...prev, name: updated.name, city: updated.city, photoUrl: updated.photoUrl }));
    return updated;
  }, []);

  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{ user, isAdmin, initializing, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
