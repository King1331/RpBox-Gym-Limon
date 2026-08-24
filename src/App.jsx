import React from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from './layouts/AppShell';
import HomeScreen from './screens/HomeScreen';
import RoutineScreen from './screens/RoutineScreen';
import ProgressScreen from './screens/ProgressScreen';
import StaffScreen from './screens/StaffScreen';
import { ReloadPrompt } from './components/ReloadPrompt';

// ⚡ Físicas ultra-rápidas: Respuesta inmediata al tacto
const springTransition = {
  type: 'spring',
  stiffness: 900, // Extremadamente rígido para que vuele
  damping: 40,    // Frena al instante sin rebotes molestos
  mass: 0.3,      // Súper ligero
};

export default function App() {
  const [location] = useLocation();

  return (
    <>
      <AppShell>
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, x: 8 }} // Distancia mínima para un cambio sutil y veloz
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={springTransition}
            className="flex flex-col flex-1 min-h-full w-full"
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