import { motion } from "framer-motion";

// Físicas de resorte nativo (Spring)
const springTransition = {
  type: "spring",
  stiffness: 400,
  damping: 40, // Un poco más de amortiguación para transiciones de página completas
  mass: 0.8,
};

// Estados de la animación (Solo GPU: Opacity y Transform)
const pageVariants = {
  initial: { 
    opacity: 0, 
    x: 25 // Entra sutilmente desde la derecha
  },
  animate: { 
    opacity: 1, 
    x: 0 
  },
  exit: { 
    opacity: 0, 
    x: -25 // Sale sutilmente hacia la izquierda
  }
};

export default function AnimatedPage({ children, className = "" }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={springTransition}
      // IMPORTANTE: Nota cómo NO hay clases "transition-" o "duration-" de Tailwind aquí.
      // Solo clases estructurales. Framer Motion tiene el control total de la animación.
      className={`flex flex-col flex-1 w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}