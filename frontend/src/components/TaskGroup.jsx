export default function TaskGroup({ label, tasks = [], onToggle, onDelete, onEdit, onAdd }) {
  return (
    <div className="task-group">
      <div className="task-group__header">
        <span className="task-group__label">{label}</span>
        <button className="task-group__add" onClick={onAdd}>+</button>
      </div>
      <div className="task-group__body">
        {tasks.length === 0
          ? <span className="task-group__empty">—</span>
          : tasks.map(task => (
              <div key={task.id} className="task-row">
                <button
                  className={`task-node__check ${task.status === 'DONE' ? 'done' : ''}`}
                  onClick={() => onToggle(task)}
                />
                <span className={`task-row__title ${task.status === 'DONE' ? 'done' : ''}`}>
                  {task.title}
                </span>
                <div className="task-row__actions">
                  <button className="task-row__btn" onClick={() => onEdit(task)}>✎</button>
                  <button className="task-row__btn" onClick={() => onDelete(task.id)}>✕</button>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
}