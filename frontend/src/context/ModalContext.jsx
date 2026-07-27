import { createContext, useCallback, useContext, useState } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });
  const [bookingEvent, setBookingEvent] = useState(null);
  const [infoPage, setInfoPage] = useState(null);

  const openAuth = useCallback((mode = 'login') => setAuthModal({ open: true, mode }), []);
  const closeAuth = useCallback(() => setAuthModal((s) => ({ ...s, open: false })), []);

  const openBooking = useCallback((event) => setBookingEvent(event), []);
  const closeBooking = useCallback(() => setBookingEvent(null), []);

  const openInfo = useCallback((key) => setInfoPage(key), []);
  const closeInfo = useCallback(() => setInfoPage(null), []);

  return (
    <ModalContext.Provider value={{
      authModal, openAuth, closeAuth,
      bookingEvent, openBooking, closeBooking,
      infoPage, openInfo, closeInfo,
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
}
