import { Check, ChevronRight, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PaymentCard({
  onViewReceipt,
  onReject,
  onApprove,
}) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      // Forzamos un ancho completo y ajustamos el margen horizontal para expandirla
      className="glass-card staff-card relative overflow-hidden w-[calc(100%+1.5rem)] -mx-3 sm:w-full sm:mx-0 sm:max-w-none" 
      data-testid="card-payment-juan"
    >
      <div className="row-between pl-3">
        <div className="staff-user">
          <div className="avatar bg-white/10 text-paper font-medium">JP</div>
          <div>
            <h3>Juan Pérez</h3>
            <p>Enviado hoy · 09:42 AM</p>
          </div>
        </div>
        <div className="payment-amount font-semibold">₡20,000</div>
      </div>

      <div className="payment-meta pl-3 mt-3">
        <span className="text-sm opacity-80">Mensualidad · Septiembre</span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="secondary-btn"
          onClick={onViewReceipt}
          data-testid="button-view-receipt"
        >
          Ver comprobante
          <ChevronRight size={14} />
        </motion.button>
      </div>

      <div className="staff-actions pl-3 mt-4">
        {/* Botón de rechazar con diseño y tono rojito (flame) */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="secondary-btn text-flame bg-flame/10 border border-flame/20 hover:bg-flame/20"
          onClick={() => onReject('Pago rechazado')}
          data-testid="button-reject-payment"
        >
          <X size={16} />
          Rechazar
        </motion.button>
        
        {/* Botón de aprobar con estilo estándar limpio */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="primary-btn"
          onClick={() => onApprove('Pago aprobado ✓')}
          data-testid="button-approve-payment"
        >
          <Check size={16} />
          Aprobar
        </motion.button>
      </div>
    </motion.section>
  );
}