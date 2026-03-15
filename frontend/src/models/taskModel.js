// ─────────────────────────────────────────────────────────────
//  TASK DATA MODEL
//  File: src/model/taskModel.js
//  Source of truth for all task-related types and defaults.
// ─────────────────────────────────────────────────────────────


// ── Enums ─────────────────────────────────────────────────────

export const TASK_TYPE = {
  ONE_TIME : 'ONE_TIME',   // happens once
  DAILY    : 'DAILY',      // every day
  WEEKLY   : 'WEEKLY',     // specific days of the week
  MONTHLY  : 'MONTHLY',    // specific day(s) of the month
  CUSTOM   : 'CUSTOM',     // cron-like custom rule
};

export const PRIORITY = {
  LOW    : 'LOW',
  MEDIUM : 'MEDIUM',
  HIGH   : 'HIGH',
  URGENT : 'URGENT',
};

export const STATUS = {
  PENDING    : 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE       : 'DONE',
  SKIPPED    : 'SKIPPED',
};

export const TIME_BLOCK = {
  MORNING   : 'MORNING',    // 06:00–12:00
  AFTERNOON : 'AFTERNOON',  // 12:00–17:00
  EVENING   : 'EVENING',    // 17:00–21:00
  NIGHT     : 'NIGHT',      // 21:00–00:00
  ANYTIME   : 'ANYTIME',    // no preference
};

// Default categories — user can extend
export const CATEGORY = {
  STUDY    : 'STUDY',
  EXERCISE : 'EXERCISE',
  HYGIENE  : 'HYGIENE',
  LIFE     : 'LIFE',
  MOVIES   : 'MOVIES',
  OTHER    : 'OTHER',
};


// ── repeat_rule schema ─────────────────────────────────────────
//
//  ONE_TIME  → repeat_rule: null
//
//  DAILY     → repeat_rule: { every: 1 }
//              (or every N days: { every: 2 } = every 2 days)
//
//  WEEKLY    → repeat_rule: { days: ['MON', 'WED', 'SAT'] }
//
//  MONTHLY   → repeat_rule: { dates: [1, 15] }
//              (1st and 15th of every month)
//
//  CUSTOM    → repeat_rule: { cron: '0 9 * * 1-5' }
//              (standard cron expression)


// ── Default task factory ───────────────────────────────────────

export function createTask(overrides = {}) {
  return {
    id             : crypto.randomUUID(),
    title          : '',
    description    : '',

    type           : TASK_TYPE.ONE_TIME,
    status         : STATUS.PENDING,
    priority       : PRIORITY.MEDIUM,
    category       : CATEGORY.OTHER,

    parent_task_id : null,       // null = root task
    
    // ── Nested Subtasks
// Use parent_task_id
// Limit depth to maybe 3.

    deadline       : null,       // ISO date string or null
    scheduled_date : null,       // ISO date string — which day to appear
    scheduled_time : null,       // 'HH:MM' string or null
    time_block     : TIME_BLOCK.ANYTIME,

    repeat_rule    : null,       // see repeat_rule schema above
    last_completed : null,       // ISO datetime — last time marked DONE
    next_due       : null,       // ISO date — computed by schedule generator

    created_at     : new Date().toISOString(),
    updated_at     : new Date().toISOString(),

    ...overrides,
  };
}
