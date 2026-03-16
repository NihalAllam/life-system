// ─────────────────────────────────────────────────────────────
//  SCHEDULE GENERATOR
//  File: src/services/scheduleGenerator.js
//
//  Takes a flat task list, returns today's schedule bucketed
//  into morning / afternoon / evening / night.
// ─────────────────────────────────────────────────────────────

// ── Constants ─────────────────────────────────────────────────

const WEEKDAY_MAP = {
  0: 'SUN', 1: 'MON', 2: 'TUE', 3: 'WED',
  4: 'THU', 5: 'FRI', 6: 'SAT',
};

const PRIORITY_WEIGHT = {
  URGENT : 4,
  HIGH   : 3,
  MEDIUM : 2,
  LOW    : 1,
};

// Time blocks and the HH:MM ranges they cover
const TIME_BLOCK_RANGES = {
  MORNING   : { start: '06:00', end: '12:00' },
  AFTERNOON : { start: '12:00', end: '17:00' },
  EVENING   : { start: '17:00', end: '21:00' },
  NIGHT     : { start: '21:00', end: '24:00' },
};


// ── Helpers ───────────────────────────────────────────────────

/** Returns 'YYYY-MM-DD' for any Date object */
function toDateStr(date) {
  return date.toISOString().slice(0, 10);
}

/** Returns minutes since midnight for a 'HH:MM' string */
function toMinutes(hhmm) {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

/**
 * Infer which time block a task belongs to.
 * Priority: explicit time_block → scheduled_time range → ANYTIME
 */
function resolveTimeBlock(task) {
  // Explicit block set by user
  if (task.time_block && task.time_block !== 'ANYTIME') {
    return task.time_block.toLowerCase();
  }

  // Derive from scheduled_time if present
  if (task.scheduled_time) {
    const mins = toMinutes(task.scheduled_time);
    if (mins >= toMinutes('06:00') && mins < toMinutes('12:00')) return 'morning';
    if (mins >= toMinutes('12:00') && mins < toMinutes('17:00')) return 'afternoon';
    if (mins >= toMinutes('17:00') && mins < toMinutes('21:00')) return 'evening';
    if (mins >= toMinutes('21:00'))                              return 'night';
  }

  // Fallback: undecided tasks go into morning as default
  return 'morning';
}

/**
 * Sort tasks within a block:
 *   1. by scheduled_time ascending (nulls last)
 *   2. then by priority descending
 *   3. then by deadline ascending (nulls last)
 */
function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    const aTime = toMinutes(a.scheduled_time) ?? Infinity;
    const bTime = toMinutes(b.scheduled_time) ?? Infinity;
    if (aTime !== bTime) return aTime - bTime;

    const aPri = PRIORITY_WEIGHT[a.priority] ?? 0;
    const bPri = PRIORITY_WEIGHT[b.priority] ?? 0;
    if (aPri !== bPri) return bPri - aPri;

    const aDl = a.deadline ? new Date(a.deadline).getTime() : Infinity;
    const bDl = b.deadline ? new Date(b.deadline).getTime() : Infinity;
    return aDl - bDl;
  });
}


// ── Per-type inclusion logic ───────────────────────────────────

function isDailyTask(task) {
  if (task.type !== 'DAILY') return false;
  const rule = task.repeat_rule;
  if (rule?.every) {
    if (!task.last_completed) return true;
    const last = new Date(task.last_completed);
    const today = new Date();
    const diffDays = Math.floor((today - last) / 86_400_000);
    // completed today = still show it (so checkbox stays visible)
    return diffDays >= 0;
  }
  return true;
}

function isWeeklyTask(task, todayWeekday) {
  if (task.type !== 'WEEKLY') return false;
  const rule = task.repeat_rule;
  if (!rule?.days?.length) return false;
  return rule.days.includes(todayWeekday); // e.g. 'MON'
}

function isMonthlyTask(task, todayDate) {
  if (task.type !== 'MONTHLY') return false;
  const rule = task.repeat_rule;
  if (!rule?.dates?.length) return false;
  return rule.dates.includes(todayDate); // e.g. 1, 15
}

function isOneTimeTask(task, todayStr) {
  if (task.type !== 'ONE_TIME') return false;
  if (task.status === 'DONE' || task.status === 'SKIPPED') return false;
  // Include if scheduled for today or overdue (no scheduled_date = show today)
  if (!task.scheduled_date) return true;
  return task.scheduled_date <= todayStr;
}

function isCustomTask(task) {
  // Custom cron evaluation is left for a later phase.
  // For now: include if next_due matches today.
  return task.type === 'CUSTOM';
}


// ── Main export ───────────────────────────────────────────────

/**
 * generateSchedule(tasks, referenceDate?)
 *
 * @param {Object[]} tasks       - Flat array of task objects
 * @param {Date}     [date]      - Defaults to today
 * @returns {{ morning, afternoon, evening, night }}
 *          Each bucket is an array of task objects, sorted.
 */
export function generateSchedule(tasks = [], date = new Date()) {
  const todayStr     = toDateStr(date);
  const todayWeekday = WEEKDAY_MAP[date.getDay()];   // 'MON', 'TUE', …
  const todayDate    = date.getDate();                // 1–31

  const schedule = { morning: [], afternoon: [], evening: [], night: [] };

  for (const task of tasks) {
    // Skip completed / skipped tasks (except repeating ones)
    const isRepeating = ['DAILY', 'WEEKLY', 'MONTHLY', 'CUSTOM'].includes(task.type);
    if (!isRepeating && (task.status === 'DONE' || task.status === 'SKIPPED')) continue;

    // Determine if this task belongs to today
    const include =
      isDailyTask(task)                       ||
      isWeeklyTask(task, todayWeekday)        ||
      isMonthlyTask(task, todayDate)          ||
      isOneTimeTask(task, todayStr)           ||
      isCustomTask(task);

    if (!include) continue;

    const block = resolveTimeBlock(task);
    if (schedule[block]) {
      schedule[block].push(task);
    }
  }

  // Sort each block independently
  schedule.morning   = sortTasks(schedule.morning);
  schedule.afternoon = sortTasks(schedule.afternoon);
  schedule.evening   = sortTasks(schedule.evening);
  schedule.night     = sortTasks(schedule.night);

  return schedule;
}


// ── Utility: flatten schedule back to array ───────────────────

/** Returns all tasks from all blocks in order: morning → night */
export function flattenSchedule(schedule) {
  return [
    ...schedule.morning,
    ...schedule.afternoon,
    ...schedule.evening,
    ...schedule.night,
  ];
}


// ── Utility: count tasks due today ───────────────────────────

export function countToday(schedule) {
  return (
    schedule.morning.length   +
    schedule.afternoon.length +
    schedule.evening.length   +
    schedule.night.length
  );
}
