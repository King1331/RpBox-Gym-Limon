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

// Transición iOS-like: deslizamiento horizontal + opacidad
const pageTransition = {
  type: 'tween',
  duration: 0.22,
  ease: [0.4, 0.0, 0.2, 1],
};

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
};

export default function App() {
  const [location] = useLocation();

  return (
    <>
      <AppShell>
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
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
      </AppShell>

      <ReloadPrompt />
    </>
  );
}