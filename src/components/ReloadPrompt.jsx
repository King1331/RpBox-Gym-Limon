import React, { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

export function ReloadPrompt() {
  const [location] = useLocation();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        window.swRegistration = r;
      }
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const url = `/version.json?t=${new Date().getTime()}`;
        const response = await fetch(url, { cache: 'no-store' });
        const data = await response.json();

        if (data.version > __APP_VERSION__) {
          console.log("Nueva versión detectada. Despertando Service Worker...");
          if (window.swRegistration) {
            await window.swRegistration.update();
          }
        }
      } catch (error) {
        // Silencioso si no hay red
      }
    };

    checkForUpdate();
    
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    };
    
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);

  }, [location]);

  const close = () => {
    setNeedRefresh(false);
  };

  const handleUpdate = async () => {
    setIsUpdating(true); // Activa el estado visual de carga/transición
    await updateServiceWorker(true);
    
    // Pequeño delay de 400ms para que la animación de fundido se luzca antes del reload
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <>
      {/* Capa de fundido elegante para toda la pantalla al actualizar */}
      <AnimatePresence>
        {isUpdating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[#141414] flex flex-col items-center justify-center text-white"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 animate-pulse">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Actualizando RP Box...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner de notificación deslizante */}
      <AnimatePresence>
        {needRefresh && !isUpdating && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -100, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed left-4 right-4 mx-auto sm:left-auto sm:right-5 sm:mx-0 z-50 max-w-sm rounded-2xl bg-[#141414]/95 backdrop-blur-xl p-4 text-white shadow-2xl border border-white/10"
            style={{
              top: 'calc(env(safe-area-inset-top, 0px) + 16px)'
            }}
          >
            <div className="relative">
              <div className="mb-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                      Actualización disponible
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      RP Box se ha renovado
                    </p>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-xs text-zinc-300/80 leading-relaxed pl-10">
                Hay una nueva versión lista con mejoras para tu entrenamiento. Actualiza para aplicarla.
              </p>

              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={close}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded-lg transition-colors"
                >
                  Después
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-3.5 py-1.5 text-xs font-semibold bg-white text-zinc-950 rounded-xl hover:bg-zinc-200 transition-all active:scale-95 shadow-sm"
                >
                  Actualizar ahora
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}