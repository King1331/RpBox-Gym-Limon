import React from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from './layouts/AppShell';
import HomeScreen from './screens/HomeScreen';
import RoutineScreen from './screens/RoutineScreen';
import ProgressScreen from './screens/ProgressScreen';
import StaffScreen from './screens/StaffScreen';
import { ReloadPrompt } from './components/ReloadPrompt';

// Transición tween ligera para máximo rendimiento en tablets de bajos recursos
const lightTransition = {
  type: 'tween',
  duration: 0.12,
  ease: 'easeOut',
};

export default function App() {
  const [location] = useLocation();

  return (
    <>
      <AppShell>
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={lightTransition}
            // Coincide exactamente con el bg-ink de tus pantallas (HomeScreen, etc.)
            className="flex flex-col flex-1 min-h-full w-full bg-ink"
          >
            <Switch location={location}>
              <Route path="/" component={HomeScreen} />
              <Route path="/rutina" component={RoutineScreen} />
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