import { ShieldCheck, ChevronLeft, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

import PaymentCard from '../components/PaymentCard';
import ReceiptModal from '../components/ReceiptModal';
import usePaymentReview from '../hooks/usePaymentReview';

export default function StaffScreen() {
  const [, setLocation] = useLocation();

  const {
    paymentVisible,
    receiptOpen,
    feedback,
    openReceipt,
    closeReceipt,
    settle,
  } = usePaymentReview();

  return (
    <div className="flex flex-col min-h-screen bg-ink text-paper overflow-x-hidden w-full max-w-full">
      {/* Top bar compacta */}
      <div
        className="grid grid-cols-3 items-center px-4 py-3 border-b border-ink-line bg-ink sticky top-0 z-30"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 0.75rem)' }}
      >
        <div className="justify-self-start">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="icon-btn active:scale-95 transition-transform"
            aria-label="Volver"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="text-center justify-self-center min-w-0 px-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-lime">Panel Interno - Staff</div>
          <div className="text-base font-extrabold tracking-tight truncate">Pagos</div>
        </div>

        <div className="justify-self-end w-10" />
      </div>

      {/* Acceso directo al panel administrativo */}
      <div className="px-4 pt-3">
        <button
          type="button"
          onClick={() => setLocation('/admin')}
          className="w-full p-4 rounded-2xl bg-ink-soft border border-ink-line hover:border-lime/30 flex items-center justify-between gap-3 shadow-sm active:scale-[0.98] transition-transform"
        >
          <span className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-lime text-ink flex items-center justify-center shrink-0">
              <LayoutDashboard size={20} strokeWidth={2.5} />
            </span>
            <span>
              <span className="block text-sm font-bold text-paper">Panel administrativo</span>
              <span className="text-xs text-white/50 mt-0.5">
                Clientes, pagos, rutinas y coaches
              </span>
            </span>
          </span>
          <ChevronLeft size={18} className="text-white/40 rotate-180" />
        </button>
      </div>

      {/* Contenido Principal */}
      <main className="flex flex-col gap-4 px-4 pb-28 pt-4">
        <div className="flex items-center justify-between gap-2 px-1">
          <span className="text-[11px] sm:text-xs font-medium text-white/50 uppercase tracking-wider max-w-[160px] sm:max-w-none leading-tight">
            Pendientes de <br className="sm:hidden" /> revisión
          </span>
          <span className="status-pill shrink-0 whitespace-nowrap">
            {paymentVisible ? '01 pendiente' : '0 pendientes'}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {paymentVisible ? (
            <PaymentCard
              key="payment-card"
              onViewReceipt={openReceipt}
              onReject={settle}
              onApprove={settle}
            />
          ) : (
            <motion.section
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-ink-soft border border-white/5 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-8 mt-2"
              data-testid="empty-payments"
            >
              <div className="w-14 h-14 rounded-full bg-ink/10 flex items-center justify-center mb-3 text-white">
                <ShieldCheck size={28} />
              </div>
              <h3>Todo al día</h3>
              <p className="opacity-70 mt-1">No hay pagos pendientes de revisión.</p>
            </motion.section>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="toast border border-flame/20 shadow-lg shadow-flame/5"
              data-testid="status-payment-feedback"
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {receiptOpen && <ReceiptModal onClose={closeReceipt} />}
        </AnimatePresence>
      </main>
    </div>
  );
}