import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReceiptModal({ onClose }) {
  return (
    <motion.div 
      className="modal-backdrop" 
      onClick={onClose}
      // Animación de desvanecimiento para el fondo oscuro
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="modal" 
        onClick={(event) => event.stopPropagation()}
        // Animación de entrada estilo iOS (escala y pequeño deslizamiento hacia arriba)
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="row-between mb-4">
          <h2>Comprobante</h2>
          <motion.button
            whileTap={{ scale: 0.85 }}
            className="icon-btn hover:text-flame transition-colors" // Acento sutil al pasar el dedo/mouse
            onClick={onClose}
            aria-label="Cerrar comprobante"
            data-testid="button-close-receipt"
          >
            <X size={18} />
          </motion.button>
        </div>

        {/* Agregamos un borde superior muy tenue y el texto con el acento flame */}
        <div className="receipt border-t border-flame/10 pt-3" data-testid="receipt-simulation">
          <h3 className="text-white font-semibold mb-2">SINPE MÓVIL</h3>
          <p className="opacity-80">Transacción exitosa</p>
          <div className="space-y-1 mt-3">
            <p>
              De: <b>Juan Pérez</b>
            </p>
            <p>
              Monto: <b>₡20,000</b>
            </p>
            <p className="text-sm opacity-60 mt-2">Fecha: 22/09/2024 · 09:42</p>
            <p className="text-sm opacity-60">Referencia: RPX-220924-JP</p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }} // Efecto táctil para el botón principal
          className="primary-btn"
          style={{ width: '100%', marginTop: 20 }}
          onClick={onClose}
          data-testid="button-close-receipt-bottom"
        >
          Cerrar comprobante
        </motion.button>
      </motion.div>
    </motion.div>
  );
}