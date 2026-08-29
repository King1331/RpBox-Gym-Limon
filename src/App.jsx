import React from 'react';
import { Switch, Route, useLocation } from 'wouter';

import AppShell from './layouts/AppShell';
import HomeScreen from './screens/HomeScreen';

// --- RUTINAS ---
import RoutineSelector from './screens/RoutineSelector';
import RoutineCreator from './screens/RoutineCreator';
import RoutineScreen from './screens/RoutineScreen';
// ------------------------

// --- WORKOUT GUIADO ---
import ExerciseScreen from './screens/workout/ExerciseScreen';
import RestScreen from './screens/workout/RestScreen';
import WorkoutCompleteScreen from './screens/workout/WorkoutCompleteScreen';
import StreakScreen from './screens/workout/StreakScreen';
import { WorkoutProvider } from './lib/workout/WorkoutContext';
// ------------------------

import ProgressScreen from './screens/ProgressScreen';
import StaffScreen from './screens/StaffScreen';
import { ReloadPrompt } from './components/ReloadPrompt';

export default function App() {
  const [location] = useLocation();

  return (
    <>
      <AppShell>
        <WorkoutProvider>
          <div className="relative w-full flex-1 flex flex-col bg-ink">
            <Switch location={location}>
              <Route path="/" component={HomeScreen} />

              {/* Rutinas */}
              <Route path="/rutinas" component={RoutineSelector} />
              <Route path="/crear-rutina" component={RoutineCreator} />
              <Route path="/rutina" component={RoutineScreen} />
              <Route path="/routine" component={RoutineScreen} />

              {/* Workout Guiado */}
              <Route path="/workout/exercise" component={ExerciseScreen} />
              <Route path="/workout/rest" component={RestScreen} />
              <Route path="/workout/complete" component={WorkoutCompleteScreen} />
              <Route path="/workout/streak" component={StreakScreen} />

              <Route path="/progreso" component={ProgressScreen} />
              <Route path="/staff" component={StaffScreen} />

              <Route>
                <HomeScreen />
              </Route>
            </Switch>
          </div>
        </WorkoutProvider>
      </AppShell>

      <ReloadPrompt />
    </>
  );
}