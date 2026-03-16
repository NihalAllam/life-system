import Topbar    from './components/Topbar';
import Dashboard from './pages/Dashboard';

import './styles/theme.css';
import './styles/layout.css';
import './styles/components.css';

export default function App() {
  return (
    <div className="app">
      <Topbar />
      <Dashboard />
    </div>
  );
}