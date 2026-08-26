import { motion } from "framer-motion";

// Transición iOS: deslizamiento sutil desde la derecha + fade
const pageTransition = {
  type: "tween",
  duration: 0.22,
  ease: [0.4, 0.0, 0.2, 1], // curva estándar iOS
};

const pageVariants = {
  initial: {
    opacity: 0,
    x: 20, // desplazamiento horizontal mínimo
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -10,
  },
};

export default function AnimatedPage({ children, className = "" }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className={`flex flex-col flex-1 w-full h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}