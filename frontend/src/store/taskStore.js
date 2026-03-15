import { useState, useEffect } from 'react';
import { getTasks, saveTasks, addTask, updateTask, deleteTask } from '../services/taskService';

// Simple hook-based store — no external state lib needed yet
export function useTaskStore() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const add = (task) => {
    const created = addTask(task);
    setTasks(prev => [...prev, created]);
  };

  const update = (id, changes) => {
    updateTask(id, changes);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...changes } : t));
  };

  const remove = (id) => {
    deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, add, update, remove };
}
