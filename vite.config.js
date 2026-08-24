import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import fs from 'fs';

// Timestamp único para la versión actual del build
const buildTime = Date.now();

// Plugin personalizado para crear version.json automáticamente
const generateVersion = () => ({
  name: 'generate-version',
  writeBundle() {
    fs.writeFileSync(
      path.resolve(__dirname, 'dist/version.json'),
      JSON.stringify({ version: buildTime })
    );
  }
});

export default defineConfig({
  // Guardamos la versión actual en una variable global para leerla en React
  define: {
    __APP_VERSION__: buildTime,
  },
  plugins: [
    react(),
    tailwindcss(),
    generateVersion(), // <--- Crea el version.json en el build
    VitePWA({ 
      registerType: 'prompt',
      manifest: false, 
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        // Evitar que el SW guarde en caché el archivo de versión
        navigateFallbackDenylist: [/^\/version.json/],
        // Obliga al nuevo Service Worker a activarse de inmediato
        skipWaiting: true,
        clientsClaim: true,
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});


