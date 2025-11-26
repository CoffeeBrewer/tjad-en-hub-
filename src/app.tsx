import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HubHome from './pages/HubHome';
import PlanvoorbereiderPage from './pages/PlanvoorbereiderPage';
import ProjectenPage from './pages/ProjectenPage';

const App: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  let moduleLabel = 'Dashboard';
  if (path.startsWith('/planvoorbereider')) moduleLabel = 'PlanVoorbereider';
  else if (path.startsWith('/projecten')) moduleLabel = 'Projecten & Historie';

  return (
    <div className="app-shell">
      <div className="app-card">
        <div className="app-card-inner">
          <header className="app-header">
            <div>
              <h1 className="app-title">Tjaden Hub</h1>
              <p className="app-subtitle">
                {moduleLabel === 'Dashboard'
                  ? 'Centrale omgeving voor bemalingsvoorbereiding bij Tjaden.'
                  : `Module: ${moduleLabel}`}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <nav className="hub-nav">
                <Link to="/" className="hub-nav-link">
                  Hub
                </Link>
                <Link to="/planvoorbereider" className="hub-nav-link">
                  PlanVoorbereider
                </Link>
                <Link to="/projecten" className="hub-nav-link hub-nav-link--muted">
                  Projecten
                </Link>
              </nav>
              <span className="app-badge">Tjaden · Bemaling</span>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<HubHome />} />
            <Route path="/planvoorbereider" element={<PlanvoorbereiderPage />} />
            <Route path="/projecten" element={<ProjectenPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
