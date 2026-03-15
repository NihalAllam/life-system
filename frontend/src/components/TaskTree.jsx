import { useState } from 'react';

function TaskNode({ task, allTasks, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(false);
  const children = allTasks.filter(t => t.parent_task_id === task.id);
  const hasChildren = children.length > 0;

  return (
    <div className="task-node" data-depth={depth}>
      <div className="task-node__row" style={{ paddingLeft: depth * 20 }}>
        <button
          className="task-node__toggle"
          onClick={() => hasChildren && setCollapsed(c => !c)}
          style={{ visibility: hasChildren ? 'visible' : 'hidden' }}
        >
          {collapsed ? '▸' : '▾'}
        </button>
        <button className={`task-node__check ${task.status === 'DONE' ? 'done' : ''}`} />
        <span className={`task-node__title ${task.status === 'DONE' ? 'done' : ''}`}>
          {task.title}
        </span>
        <div className="task-node__meta">
          {task.priority && task.priority !== 'MEDIUM' && (
            <span className={`task-node__pill priority-${task.priority.toLowerCase()}`}>
              {task.priority.toLowerCase()}
            </span>
          )}
          {task.deadline && (
            <span className="task-node__pill">{task.deadline}</span>
          )}
        </div>
      </div>
      {hasChildren && !collapsed && (
        <div className="task-node__children">
          {children.map(child => (
            <TaskNode key={child.id} task={child} allTasks={allTasks} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TaskTree({ tasks = [] }) {
  const roots = tasks.filter(t => !t.parent_task_id);
  if (!roots.length) return <p className="task-tree__empty">no tasks.</p>;
  return (
    <div className="task-tree">
      {roots.map(task => (
        <TaskNode key={task.id} task={task} allTasks={tasks} depth={0} />
      ))}
    </div>
  );
}