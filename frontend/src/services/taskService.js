const STORAGE_KEY = 'life_sys_tasks';

export function getTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function addTask(task) {
  const tasks = getTasks();
  const newTask = { ...task, id: crypto.randomUUID(), status: 'pending' };
  saveTasks([...tasks, newTask]);
  return newTask;
}

export function updateTask(id, changes) {
  const tasks = getTasks().map(t => t.id === id ? { ...t, ...changes } : t);
  saveTasks(tasks);
}

export function deleteTask(id) {
  saveTasks(getTasks().filter(t => t.id !== id));
}
