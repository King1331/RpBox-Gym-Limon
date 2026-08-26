import React from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

import AppShell from '@/layouts/AppShell';
import HomeScreen from '@/screens/HomeScreen';

// --- RUTINAS ---
import RoutineSelector from '@/screens/RoutineSelector';
import RoutineCreator from '@/screens/RoutineCreator';
import RoutineScreen from '@/screens/RoutineScreen';
// ------------------------

import ProgressScreen from '@/screens/ProgressScreen';
import StaffScreen from '@/screens/StaffScreen';
import { ReloadPrompt } from '@/components/ReloadPrompt';

// Transición reducida en un 30% adicional (0.098s ~ 100ms)
const pageTransition = {
  type: 'tween',
  duration: 0.080,
  ease: [0.22, 1, 0.36, 1], // Curva fluida y suave
};

const pageVariants = {
  initial: { x: '45%' },   // Entra desde la derecha con recorrido amplio
  animate: { x: 0 },       // Se asienta en el centro
  exit: { x: '-20%' },     // Retrocede sutilmente
};

export default function App() {
  const [location] = useLocation();

  return (
    <>
      <AppShell>
        <div className="relative w-full flex-1 flex flex-col overflow-x-hidden bg-ink">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
                WebkitTransform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="flex flex-col flex-1 min-h-full w-full bg-ink"
            >
              <Switch location={location}>
                <Route path="/" component={HomeScreen} />

                {/* Rutinas */}
                <Route path="/rutinas" component={RoutineSelector} />
                <Route path="/crear-rutina" component={RoutineCreator} />
                <Route path="/rutina" component={RoutineScreen} />
                <Route path="/routine" component={RoutineScreen} />

                <Route path="/progreso" component={ProgressScreen} />
                <Route path="/staff" component={StaffScreen} />

                <Route>
                  <HomeScreen />
                </Route>
              </Switch>
            </motion.div>
          </AnimatePresence>
        </div>
      </AppShell>

      <ReloadPrompt />
    </>
  );
}