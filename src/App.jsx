import React from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from './layouts/AppShell';
import HomeScreen from './screens/HomeScreen';
import RoutineScreen from './screens/RoutineScreen';
import ProgressScreen from './screens/ProgressScreen';
import StaffScreen from './screens/StaffScreen';
import { ReloadPrompt } from './components/ReloadPrompt';

// ⚡ Físicas de resorte MÁS RÁPIDAS Y LIGERAS
const springTransition = {
  type: 'spring',
  stiffness: 600, // Más alto = se mueve mucho más rápido
  damping: 35,    // Frena en seco sin retrasos
  mass: 0.5,      // Más ligero = menos "inercia" pesada
};

export default function App() {
  const [location] = useLocation();

  return (
    <>
      <AppShell>
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, x: 15 }} // Reducimos un poco la distancia de desplazamiento (de 20 a 15)
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
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