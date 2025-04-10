import { createEffect } from 'solid-js';
import { Router, Routes, Route, useLocation } from 'solid-app-router'; // atau '@solidjs/router'
import { routes } from './routes';

function App() {
  const location = useLocation();

  createEffect(() => {
    console.log('Route changed to:', location.pathname); // Cek apakah route berubah
    window.scrollTo(0, 0); // Scroll ke atas
  });

  return (
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} component={route.component} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;