import React from 'react';
import { X } from 'lucide-react';
import { notifications } from '@/lib/data';

export default function NotificationsModal({ onClose }) {
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-4 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-[440px] mb-20 sm:mb-0 rounded-[2rem] bg-ink-soft border border-ink-line p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-lime">
              RP Box · Para ti
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-paper mt-0.5">
              Notificaciones
            </h2>
          </div>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-paper transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Cerrar notificaciones"
            data-testid="button-close-notifications"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Lista de Notificaciones */}
        <div className="flex flex-col gap-3.5 my-4 max-h-[40vh] overflow-y-auto pr-1">
          {notifications.map(({ icon: Icon, title, copy }, index) => (
            <div
              className="flex items-start gap-3.5 rounded-2xl bg-ink p-3.5 border border-white/5"
              key={title}
              data-testid={`notification-${index + 1}`}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lime/10 text-lime">
                <Icon className="size-5" />
              </div>
              <div className="flex flex-col">
                <b className="text-sm font-bold text-paper">{title}</b>
                <p className="text-xs text-white/60 mt-0.5 leading-relaxed">{copy}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botón de acción inferior */}
        <button
          type="button"
          className="flex w-full items-center justify-center rounded-full bg-paper py-3.5 text-[14px] font-bold uppercase tracking-wide text-ink transition-transform active:scale-[0.98] cursor-pointer"
          onClick={onClose}
          data-testid="button-dismiss-notifications"
        >
          Marcar como leídas
        </button>
      </div>
    </div>
  );
}