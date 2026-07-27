import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'
import { NavigationProvider } from './context/NavigationContext.jsx'

// Build marker: open the browser console (F12) and look for this line to confirm
// you're running this exact build and not a stale cached/older version. If you
// don't see this line, hard-refresh (Ctrl+Shift+R) or restart `npm run dev`.
console.log('%cEventHub build 2026-07-05-c (request timeout + blank-page fixes)', 'color:#5b4fe8;font-weight:bold;');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <DataProvider>
          <ModalProvider>
            <NavigationProvider>
              <App />
            </NavigationProvider>
          </ModalProvider>
        </DataProvider>
      </AuthProvider>
    </ToastProvider>
  </StrictMode>,
)
