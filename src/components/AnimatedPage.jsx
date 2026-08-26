import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedPage({ children, className = '' }) {
  return (
    <div
      style={{
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      className={`w-full flex-1 flex flex-col min-h-full ${className}`}
    >
      {children}
    </div>
  );
}