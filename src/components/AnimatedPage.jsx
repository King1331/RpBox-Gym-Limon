import { motion } from "framer-motion";

// Transición ligera y rápida (Tween)
const lightTransition = {
  type: "tween",
  duration: 0.15,
  ease: "easeInOut",
};

// Variantes limpias basadas únicamente en opacidad para evitar saltos visuales o scroll horizontal
const pageVariants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1 
  },
  exit: { 
    opacity: 0 
  }
};

export default function AnimatedPage({ children, className = "" }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={lightTransition}
      className={`flex flex-col flex-1 w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}