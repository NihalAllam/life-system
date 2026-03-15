export default function TaskCard({ task }) {
  if (!task) return null;

  return (
    <div className="task-card">
      <div className="task-card__title">{task.title}</div>
      {task.description && (
        <div className="task-card__desc">{task.description}</div>
      )}
      <div className="task-card__meta">
        {task.category && <span className="task-card__tag">{task.category}</span>}
        {task.priority  && <span className="task-card__tag">{task.priority}</span>}
      </div>
    </div>
  );
}
