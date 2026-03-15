import Timetable from '../components/Timetable';
import { generateSchedule } from '../services/scheduleGenerator';
import { useTaskStore } from '../store/taskStore';



export default function Dashboard() {
    const { tasks } = useTaskStore();
    const schedule  = generateSchedule(tasks);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  });

  return (
    <div className="main">
      <div className="main__header">
        <h1 className="main__title">Today</h1>
        <span className="main__subtitle">{today}</span>
      </div>
      <div className="main__body">
        <Timetable tasks={schedule} />
      </div>
    </div>
  );
}
