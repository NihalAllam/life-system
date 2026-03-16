import { useState, useEffect, useCallback } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../services/taskService';

// Single shared state outside the hook so all consumers
// see the same array and re-render together
let _tasks = [];
const _listeners = new Set();

function notify() {
  _listeners.forEach(fn => fn([..._tasks]));
}

export function useTaskStore() {
  const [tasks, setTasks] = useState(() => {
    _tasks = getTasks();
    return _tasks;
  });

  useEffect(() => {
    // Register this component as a listener
    _listeners.add(setTasks);
    // Sync in case another instance updated before this mounted
    setTasks([..._tasks]);
    return () => _listeners.delete(setTasks);
  }, []);

  const add = useCallback((task) => {
    const created = addTask(task);
    _tasks = [..._tasks, created];
    notify();
  }, []);

  const update = useCallback((id, changes) => {
    updateTask(id, changes);
    _tasks = _tasks.map(t => t.id === id ? { ...t, ...changes } : t);
    notify();
  }, []);

  const remove = useCallback((id) => {
    deleteTask(id);
    _tasks = _tasks.filter(t => t.id !== id);
    notify();
  }, []);

  return { tasks, add, update, remove };
}
