import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// Aquí estás usando el atajo @/ que vimos en tu configuración
import { ErrorBoundary } from '@/components/error-boundary'; 

import './index.css';

const rootElement = document.getElementById('root');

createRoot(rootElement, {
  // Esta función atrapa errores críticos a nivel de la raíz
  onCaughtError: (error, errorInfo) => {
    console.error("Error crítico capturado por React:", error);
    console.error("Detalles del componente:", errorInfo.componentStack);
  },
}).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// --- NUEVO: Fuerza la revisión de actualizaciones de la PWA en caliente ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.ready.then((registration) => {
      // Cada vez que el usuario entra o vuelve a enfocar la app (ej. la abre desde el celular)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          registration.update();
        }
      });
    });
  });
}