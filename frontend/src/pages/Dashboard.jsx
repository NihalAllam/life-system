import { useState } from 'react';
import Timetable  from '../components/Timetable';
import TaskGroup  from '../components/TaskGroup';
import TaskForm   from '../components/TaskForm';
import { generateSchedule } from '../services/scheduleGenerator';
import { useTaskStore }      from '../store/taskStore';

export default function Dashboard() {
  const { tasks, add, update, remove } = useTaskStore();
  const [formDefaults, setFormDefaults] = useState(null); // null = closed
  const [editingTask,  setEditingTask]  = useState(null);

  const schedule = generateSchedule(tasks);

  const daily    = tasks.filter(t => t.type === 'DAILY');
  const monthly  = tasks.filter(t => t.type === 'MONTHLY');
  const weekly   = tasks.filter(t => t.type === 'WEEKLY');
  const oneTime  = tasks.filter(t => t.type === 'ONE_TIME');

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  function openAdd(defaults) {
    setFormDefaults(defaults);
  }

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
        <h1 className="main__title">Today</h1>
        <span className="main__subtitle">{today}</span>
      </div>

      <div className="main__body">
        <div className="dashboard-grid">

          {/* ── Left panel: Daily + Monthly ── */}
          <div className="side-panel">
            <TaskGroup
              label="Daily"
              tasks={daily}
              onToggle={handleToggle}
              onDelete={remove}
              onEdit={setEditingTask}
              onAdd={() => openAdd({ type: 'DAILY' })}
            />
            <TaskGroup
              label="Monthly"
              tasks={monthly}
              onToggle={handleToggle}
              onDelete={remove}
              onEdit={setEditingTask}
              onAdd={() => openAdd({ type: 'MONTHLY' })}
            />
          </div>

          {/* ── Center: Timetable ── */}
          <Timetable
            tasks={schedule}
            onToggle={handleToggle}
            onAdd={(defaults) => openAdd(defaults)}
          />

          {/* ── Right panel: Weekly + One-time ── */}
          <div className="side-panel">
            <TaskGroup
              label="Weekly"
              tasks={weekly}
              onToggle={handleToggle}
              onDelete={remove}
              onEdit={setEditingTask}
              onAdd={() => openAdd({ type: 'WEEKLY' })}
            />
            <TaskGroup
              label="One-time"
              tasks={oneTime}
              onToggle={handleToggle}
              onDelete={remove}
              onEdit={setEditingTask}
              onAdd={() => openAdd({ type: 'ONE_TIME' })}
            />
          </div>

        </div>
      </div>

      {/* Add form */}
      {formDefaults && (
        <TaskForm
          defaults={formDefaults}
          onSubmit={handleAdd}
          onClose={() => setFormDefaults(null)}
        />
      )}

      {/* Edit form */}
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