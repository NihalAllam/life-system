// ─────────────────────────────────────────────────────────────
//  EXAMPLE TASK OBJECTS
//  File: src/model/taskExamples.js
//  Reference examples for every task type.
// ─────────────────────────────────────────────────────────────


// ── 1. One-time task (root, no parent) ────────────────────────
export const EXAMPLE_ONE_TIME = {
  id             : "a1b2c3d4-0001",
  title          : "Prepare presentation",
  description    : "Quarterly review deck for the team",
  type           : "ONE_TIME",
  status         : "PENDING",
  priority       : "HIGH",
  category       : "STUDY",
  parent_task_id : null,
  depth          : 0,
  deadline       : "2025-07-20",
  scheduled_date : "2025-07-18",
  scheduled_time : "10:00",
  time_block     : "MORNING",
  repeat_rule    : null,
  last_completed : null,
  next_due       : "2025-07-18",
  created_at     : "2025-07-10T08:00:00.000Z",
  updated_at     : "2025-07-10T08:00:00.000Z",
};


// ── 2. Daily task ─────────────────────────────────────────────
export const EXAMPLE_DAILY = {
  id             : "a1b2c3d4-0002",
  title          : "Morning walk",
  description    : "30 min walk before breakfast",
  type           : "DAILY",
  status         : "PENDING",
  priority       : "MEDIUM",
  category       : "EXERCISE",
  parent_task_id : null,
  depth          : 0,
  deadline       : null,
  scheduled_date : null,         // repeating — no fixed date
  scheduled_time : "07:00",
  time_block     : "MORNING",
  repeat_rule    : { every: 1 }, // every 1 day = every day
  last_completed : "2025-07-09T07:30:00.000Z",
  next_due       : "2025-07-10",
  created_at     : "2025-06-01T00:00:00.000Z",
  updated_at     : "2025-07-09T07:30:00.000Z",
};


// ── 3. Weekly task ────────────────────────────────────────────
export const EXAMPLE_WEEKLY = {
  id             : "a1b2c3d4-0003",
  title          : "Review weekly goals",
  description    : "Check what was done, plan next week",
  type           : "WEEKLY",
  status         : "PENDING",
  priority       : "MEDIUM",
  category       : "LIFE",
  parent_task_id : null,
  depth          : 0,
  deadline       : null,
  scheduled_date : null,
  scheduled_time : "20:00",
  time_block     : "EVENING",
  repeat_rule    : { days: ["SUN"] }, // every Sunday
  last_completed : "2025-07-06T20:15:00.000Z",
  next_due       : "2025-07-13",
  created_at     : "2025-06-01T00:00:00.000Z",
  updated_at     : "2025-07-06T20:15:00.000Z",
};


// ── 4. Monthly task ───────────────────────────────────────────
export const EXAMPLE_MONTHLY = {
  id             : "a1b2c3d4-0004",
  title          : "Pay bills",
  description    : "Electricity, internet, rent",
  type           : "MONTHLY",
  status         : "PENDING",
  priority       : "URGENT",
  category       : "LIFE",
  parent_task_id : null,
  depth          : 0,
  deadline       : null,
  scheduled_date : null,
  scheduled_time : "09:00",
  time_block     : "MORNING",
  repeat_rule    : { dates: [1] }, // 1st of every month
  last_completed : "2025-07-01T09:10:00.000Z",
  next_due       : "2025-08-01",
  created_at     : "2025-01-01T00:00:00.000Z",
  updated_at     : "2025-07-01T09:10:00.000Z",
};


// ── 5. Custom / cron task ─────────────────────────────────────
export const EXAMPLE_CUSTOM = {
  id             : "a1b2c3d4-0005",
  title          : "Deep work session",
  description    : "No distractions, 2h focused block",
  type           : "CUSTOM",
  status         : "PENDING",
  priority       : "HIGH",
  category       : "STUDY",
  parent_task_id : null,
  depth          : 0,
  deadline       : null,
  scheduled_date : null,
  scheduled_time : "09:00",
  time_block     : "MORNING",
  repeat_rule    : { cron: "0 9 * * 1-5" }, // 9am, Mon–Fri
  last_completed : null,
  next_due       : "2025-07-10",
  created_at     : "2025-07-01T00:00:00.000Z",
  updated_at     : "2025-07-01T00:00:00.000Z",
};


// ── 6. Nested subtask tree (depth 0 → 1 → 2) ─────────────────

// Root task (depth 0)
export const EXAMPLE_PARENT = {
  id             : "a1b2c3d4-0010",
  title          : "Launch personal website",
  description    : "Full redesign and deploy",
  type           : "ONE_TIME",
  status         : "IN_PROGRESS",
  priority       : "HIGH",
  category       : "STUDY",
  parent_task_id : null,
  depth          : 0,
  deadline       : "2025-07-30",
  scheduled_date : null,
  scheduled_time : null,
  time_block     : "ANYTIME",
  repeat_rule    : null,
  last_completed : null,
  next_due       : "2025-07-30",
  created_at     : "2025-07-01T00:00:00.000Z",
  updated_at     : "2025-07-01T00:00:00.000Z",
};

// Subtask (depth 1)
export const EXAMPLE_CHILD = {
  id             : "a1b2c3d4-0011",
  title          : "Design homepage layout",
  description    : "",
  type           : "ONE_TIME",
  status         : "DONE",
  priority       : "MEDIUM",
  category       : "STUDY",
  parent_task_id : "a1b2c3d4-0010",  // ← points to parent
  depth          : 1,
  deadline       : null,
  scheduled_date : "2025-07-12",
  scheduled_time : null,
  time_block     : "AFTERNOON",
  repeat_rule    : null,
  last_completed : "2025-07-12T14:00:00.000Z",
  next_due       : null,
  created_at     : "2025-07-01T00:00:00.000Z",
  updated_at     : "2025-07-12T14:00:00.000Z",
};

// Sub-subtask (depth 2)
export const EXAMPLE_GRANDCHILD = {
  id             : "a1b2c3d4-0012",
  title          : "Pick color palette",
  description    : "Grayscale dark theme",
  type           : "ONE_TIME",
  status         : "DONE",
  priority       : "LOW",
  category       : "STUDY",
  parent_task_id : "a1b2c3d4-0011",  // ← points to child
  depth          : 2,
  deadline       : null,
  scheduled_date : "2025-07-11",
  scheduled_time : null,
  time_block     : "ANYTIME",
  repeat_rule    : null,
  last_completed : "2025-07-11T11:00:00.000Z",
  next_due       : null,
  created_at     : "2025-07-01T00:00:00.000Z",
  updated_at     : "2025-07-11T11:00:00.000Z",
};
