import { useState } from 'react';
import TaskTree from '../components/TaskTree';
import TaskForm from '../components/TaskForm';
import { useTaskStore } from '../store/taskStore';

export default function Tasks() {
  const { tasks, add } = useTaskStore();
  const [showForm, setShowForm] = useState(false);

  function handleAdd(fields) {
    add({
      title          : fields.title,
      type           : fields.type,
      time_block     : fields.time_block,
      status         : 'PENDING',
      priority       : 'MEDIUM',
      category       : 'OTHER',
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

  return (
    <div className="main">
      <div className="main__header">
        <h1 className="main__title">Tasks</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>+ new</button>
      </div>
      <div className="main__body">
        <TaskTree tasks={tasks} />
      </div>
      {showForm && (
        <TaskForm onSubmit={handleAdd} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}