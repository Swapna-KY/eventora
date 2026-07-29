import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { ModalProvider } from './context/ModalContext.jsx'
import { NavigationProvider } from './context/NavigationContext.jsx'

const APP_VERSION = 'eventora-v2';
if (localStorage.getItem('eh_app_version') !== APP_VERSION) {
  // Clear stale tokens/session from old builds
  localStorage.removeItem('eh_token');
  localStorage.removeItem('eh_mock_user');
  localStorage.setItem('eh_app_version', APP_VERSION);
}

console.log('%cEventora v2 — fresh build loaded', 'color:#5b4fe8;font-weight:bold;');

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
