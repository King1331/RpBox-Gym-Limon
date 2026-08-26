import { ShieldCheck, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import PaymentCard from '@/components/PaymentCard';
import ReceiptModal from '@/components/ReceiptModal';
import HeroSection from '@/components/HeroSection';
import usePaymentReview from '@/hooks/usePaymentReview';

export default function StaffScreen() {
  const {
    paymentVisible,
    receiptOpen,
    feedback,
    openReceipt,
    closeReceipt,
    settle,
  } = usePaymentReview();

  return (
    <div className="flex flex-col bg-ink text-paper">
      
      {/* Hero unificado con navegación contextual */}
      <HeroSection>
        <button 
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-white/50 font-mono text-[11px] tracking-widest uppercase mb-4 hover:text-paper transition-colors cursor-pointer w-fit"
        >
          <ChevronLeft size={16} />
          Volver atrás
        </button>

        <span className="text-[11px] font-semibold uppercase tracking-widest text-white">
          Panel interno · Staff
        </span>
        <h1 className="mt-2 text-5xl font-extrabold leading-[0.95] tracking-tight text-paper text-balance">
          Pagos
        </h1>
        <p className="mt-3 text-base font-medium text-white/70">
          Revisa y confirma los pagos SINPE pendientes.
        </p>
      </HeroSection>

      {/* Contenido Principal */}
      <main className="flex flex-col gap-4 px-5 pb-32 pt-4">
        
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
              className="glass-card empty-state flex flex-col items-center justify-center text-center p-8 mt-2" 
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