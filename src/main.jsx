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