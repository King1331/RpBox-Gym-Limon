import React from 'react';
import { Switch, Route, useLocation } from 'wouter'; // Extraemos useLocation
import { motion, AnimatePresence } from 'framer-motion'; // Traemos a Framer
import AppShell from './layouts/AppShell';
import HomeScreen from './screens/HomeScreen';
import RoutineScreen from './screens/RoutineScreen';
import ProgressScreen from './screens/ProgressScreen';
import StaffScreen from './screens/StaffScreen';
import { ReloadPrompt } from './components/ReloadPrompt';

// Físicas de resorte nativo (Regla 4)
const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 40,
  mass: 0.8,
};

export default function App() {
  const [location] = useLocation();

  return (
    <>
      <AppShell>
        {/* El AnimatePresence envuelve el Switch para "congelar" las vistas al salir */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location} // Destruye y crea el DOM al cambiar de ruta
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={springTransition}
            className="flex flex-col flex-1 min-h-full w-full"
          >
            {/* CLAVE NATIVA: Le forzamos el location a wouter para evitar destellos */}
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