import React from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import AppShell from './layouts/AppShell';
import HomeScreen from './screens/HomeScreen';
import RoutineScreen from './screens/RoutineScreen';
import ProgressScreen from './screens/ProgressScreen';
import StaffScreen from './screens/StaffScreen';
import { ReloadPrompt } from './components/ReloadPrompt';

// ⚡ Físicas ultra rápidas para que la "hoja" entre al instante
const springTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 40,
  mass: 0.5,
};

export default function App() {
  const [location] = useLocation();

  return (
    <>
      <AppShell>
        {/* Contenedor con position relative para que la nueva pantalla flote encima */}
        <div className="relative flex-1 w-full h-full overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={location}
              // Empieza completamente a la derecha (fuera de pantalla)
              initial={{ x: '100%', opacity: 1 }}
              // Se desliza y se posa exactamente encima
              animate={{ x: 0, opacity: 1 }}
              // Al salir, se desliza sutilmente hacia atrás
              exit={{ x: '-30%', opacity: 0.8 }}
              transition={springTransition}
              // absolute inset-0 obliga a que la nueva pantalla cubra a la anterior como una hoja de papel
              className="absolute inset-0 flex flex-col w-full h-full bg-ink overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
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
        </div>
      </AppShell>

      <ReloadPrompt />
    </>
  );
}