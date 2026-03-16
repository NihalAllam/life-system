import Timetable from '../components/Timetable';
import { generateSchedule } from '../services/scheduleGenerator';
import { useTaskStore } from '../store/taskStore';

export default function Dashboard() {
  const { tasks, update } = useTaskStore();
  const schedule = generateSchedule(tasks);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

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
        <Timetable tasks={schedule} onToggle={handleToggle} />
      </div>
    </div>
  );
}
