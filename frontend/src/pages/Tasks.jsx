import { useState } from 'react';
import TaskTree from '../components/TaskTree';
import TaskForm from '../components/TaskForm';
import { useTaskStore } from '../store/taskStore';

export default function Tasks() {
  const { tasks, add, update, remove } = useTaskStore();
  const [showForm,    setShowForm]    = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function handleAdd(fields) {
    add({
      title          : fields.title,
      type           : fields.type,
      time_block     : fields.time_block,
      category       : fields.category || 'OTHER',
      repeat_rule    : fields.repeat_rule,
      status         : 'PENDING',
      priority       : 'MEDIUM',
      parent_task_id : null,
      description    : '',
      deadline       : null,
      scheduled_date : null,
      scheduled_time : null,
      last_completed : null,
      next_due       : null,
    });
  }

  function handleEdit(fields) {
    update(editingTask.id, {
      title      : fields.title,
      type       : fields.type,
      time_block : fields.time_block,
      category   : fields.category || 'OTHER',
      repeat_rule: fields.repeat_rule,
    });
    setEditingTask(null);
  }

  function handleToggle(task) {
    if (task.status === 'DONE') {
      update(task.id, { status: 'PENDING', last_completed: null });
    } else {
      update(task.id, {
        status        : 'DONE',
        last_completed: new Date().toISOString(),
      });
    }
  }


  return (
    <div className="main">
      <div className="main__header">
        <h1 className="main__title">Tasks</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ new</button>
      </div>
      <div className="main__body">
        <TaskTree
          tasks={tasks}
          onToggle={handleToggle}
          onDelete={remove}
          onEdit={task => setEditingTask(task)}
        />
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleAdd}
          onClose={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          existing={editingTask}
          onSubmit={handleEdit}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}