import { useState } from 'react';

import Topbar    from './components/Topbar';
import Sidebar   from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Tasks     from './pages/Tasks';
import Goals     from './pages/Goals';

import './styles/theme.css';
import './styles/layout.css';
import './styles/components.css';

const PAGES = { dashboard: Dashboard, tasks: Tasks, goals: Goals };

export default function App() {
  const [page,     setPage]     = useState('dashboard');
  const [taskView, setTaskView] = useState('daily');

  const Page = PAGES[page] || Dashboard;

  return (
    <div className="app">
      <Topbar activePage={page} onNavigate={setPage} />
      <Sidebar activeView={taskView} onViewChange={setTaskView} />
      <Page />
    </div>
  );
}
