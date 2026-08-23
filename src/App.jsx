import React from 'react';
import { Switch, Route } from 'wouter';
import AppShell from './layouts/AppShell';
import HomeScreen from './screens/HomeScreen';
import RoutineScreen from './screens/RoutineScreen';
import ProgressScreen from './screens/ProgressScreen';
import StaffScreen from './screens/StaffScreen'; // 1. Importamos la nueva pantalla

export default function App() {
  return (
    <AppShell>
      <Switch>
        <Route path="/" component={HomeScreen} />
        <Route path="/rutina" component={RoutineScreen} />
        <Route path="/progreso" component={ProgressScreen} />
        <Route path="/staff" component={StaffScreen} /> {/* 2. Añadimos la ruta de Staff */}
        
        {/* Ruta por defecto (Fallback a HomeScreen si la URL no existe) */}
        <Route>
          <HomeScreen />
        </Route>
      </Switch>
    </AppShell>
  );
}