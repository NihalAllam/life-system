const TIME_BLOCKS = [
  { id: 'morning',   label: 'Morning',   range: '06:00 – 12:00' },
  { id: 'afternoon', label: 'Afternoon', range: '12:00 – 17:00' },
  { id: 'evening',   label: 'Evening',   range: '17:00 – 21:00' },
  { id: 'night',     label: 'Night',     range: '21:00 – 00:00' },
];

export default function Timetable({ tasks = {}, onToggle, onAdd }) {
  return (
    <div className="center-panel">
      {TIME_BLOCKS.map(block => (
        <div key={block.id} className="task-group">
          <div className="task-group__header">
            <span className="task-group__label">{block.label}</span>
            <span className="task-group__label" style={{ color: 'var(--text-dim)', fontWeight: 300 }}>
              {block.range}
            </span>
            <button
              className="task-group__add"
              onClick={() => onAdd({ time_block: block.id.toUpperCase() })}
            >
              +
            </button>
          </div>
          <div className="task-group__body">
            {(tasks[block.id] || []).length === 0
              ? <span className="task-group__empty">—</span>
              : (tasks[block.id] || []).map(task => (
                  <div
                    key={task.id}
                    className="task-row"
                  >
                    <button
                      className={`task-node__check ${task.status === 'DONE' ? 'done' : ''}`}
                      onClick={() => onToggle && onToggle(task)}
                    />
                    <span className={`task-row__title ${task.status === 'DONE' ? 'done' : ''}`}>
                      {task.title}
                    </span>
                    {task.category && task.category !== 'OTHER' && (
                      <span className="timetable__task-cat">
                        {task.category.toLowerCase()}
                      </span>
                    )}
                  </div>
                ))
            }
          </div>
        </div>
      ))}
    </div>
  );
}