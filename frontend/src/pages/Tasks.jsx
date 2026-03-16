import { useState } from 'react';
import TaskTree from '../components/TaskTree';
import TaskForm from '../components/TaskForm';
import { useTaskStore } from '../store/taskStore';

export default function Tasks() {
  const { tasks, add, update, remove } = useTaskStore();
  const [showForm, setShowForm] = useState(false);

  function handleAdd(fields) {
    add({
      title          : fields.title,
      type           : fields.type,
      time_block     : fields.time_block,
      status         : 'PENDING',
      priority       : 'MEDIUM',
      category       : fields.category || 'OTHER',
      parent_task_id : null,
      description    : '',
      deadline       : null,
      scheduled_date : null,
      scheduled_time : null,
      repeat_rule    : null,
      last_completed : null,
      next_due       : null,
    });
  }

  function handleToggle(task) {
    const isRepeating = ['DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'].includes(task.type);
    if (task.status === 'DONE') {
      // uncheck — revert to pending
      update(task.id, {
        status         : 'PENDING',
        last_completed : null,
      });
    } else {
      update(task.id, {
        status         : isRepeating ? 'PENDING' : 'DONE',
        last_completed : new Date().toISOString(),
      });
    }
  }

  function handleDelete(id) {
    remove(id);
  }

  return (
    <div className="main">
      <div className="main__header">
        <h1 className="main__title">Tasks</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ new</button>
      </div>
      <div className="main__body">
        <TaskTree tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
      {showForm && (
        <TaskForm onSubmit={handleAdd} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}