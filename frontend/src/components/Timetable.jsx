const TIME_BLOCKS = [
  { id: 'morning',   label: 'Morning',   range: '06:00 – 12:00' },
  { id: 'afternoon', label: 'Afternoon', range: '12:00 – 17:00' },
  { id: 'evening',   label: 'Evening',   range: '17:00 – 21:00' },
  { id: 'night',     label: 'Night',     range: '21:00 – 00:00' },
];

export default function Timetable({ tasks = {}, onToggle }) {
  return (
    <div className="timetable">
      {TIME_BLOCKS.map(block => (
        <div key={block.id} className="timetable__block">
          <div className="timetable__block-header">
            <span className="timetable__block-label">{block.label}</span>
            <span className="timetable__block-range">{block.range}</span>
          </div>
          <div className="timetable__block-tasks">
            {(tasks[block.id] || []).length === 0
              ? <span className="timetable__empty">—</span>
              : (tasks[block.id] || []).map(task => (
                  <div
                    key={task.id}
                    className={`timetable__task ${task.status === 'DONE' ? 'done' : ''}`}
                  >
                    <button
                      className={`task-node__check ${task.status === 'DONE' ? 'done' : ''}`}
                      onClick={() => onToggle && onToggle(task)}
                      aria-label="toggle done"
                    />
                    <span className="timetable__task-title">{task.title}</span>
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
