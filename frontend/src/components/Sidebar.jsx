const TASK_VIEWS = [
  { id: 'daily',   label: 'Daily'   },
  { id: 'weekly',  label: 'Weekly'  },
  { id: 'monthly', label: 'Monthly' },
];

const CATEGORIES = [
  { id: 'study',    label: 'Study'    },
  { id: 'exercise', label: 'Exercise' },
  { id: 'hygiene',  label: 'Hygiene'  },
  { id: 'life',     label: 'Life'     },
  { id: 'other',    label: 'Other'    },
];

export default function Sidebar({ activeView, onViewChange }) {
  return (
    <aside className="sidebar">

      <div className="sidebar__section">
        <p className="sidebar__label">View</p>
        {TASK_VIEWS.map(view => (
          <button
            key={view.id}
            className={`sidebar__item ${activeView === view.id ? 'active' : ''}`}
            onClick={() => onViewChange(view.id)}
          >
            <span className="sidebar__item-dot" />
            {view.label}
          </button>
        ))}
      </div>

      <div className="sidebar__divider" />

      <div className="sidebar__section">
        <p className="sidebar__label">Categories</p>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className="sidebar__item"
          >
            <span className="sidebar__item-dot" />
            {cat.label}
          </button>
        ))}
      </div>

    </aside>
  );
}
