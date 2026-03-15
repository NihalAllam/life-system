const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'tasks',     label: 'Tasks'     },
  { id: 'goals',     label: 'Goals'     },
];

export default function Topbar({ activePage, onNavigate }) {
  return (
    <header className="topbar">
      <span className="topbar__logo">life.sys</span>
      <nav className="topbar__nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`topbar__nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
