// ─────────────────────────────────────────────────────────────
//  SCHEDULE GENERATOR — DRY RUN TESTS
//  File: src/services/scheduleGenerator.test.js
//
//  Run with:  node src/services/scheduleGenerator.test.js
//  (Node 20+ supports ES modules natively with --input-type=module
//   or rename to .mjs, or run via Vite test runner)
// ─────────────────────────────────────────────────────────────

import { generateSchedule, countToday } from './scheduleGenerator.js';

// ── Fake "today": Wednesday 2025-07-16 ────────────────────────
const TODAY = new Date('2025-07-16T00:00:00');

const TASKS = [

  // 1. Daily task — should always appear
  {
    id: 't-001', title: 'Morning walk',
    type: 'DAILY', status: 'PENDING', priority: 'MEDIUM',
    scheduled_time: '07:00', time_block: 'MORNING',
    repeat_rule: { every: 1 },
    last_completed: '2025-07-15T07:30:00Z',  // yesterday
    deadline: null, scheduled_date: null,
  },

  // 2. Weekly task on WED — should appear today
  {
    id: 't-002', title: 'Review weekly goals',
    type: 'WEEKLY', status: 'PENDING', priority: 'HIGH',
    scheduled_time: '20:00', time_block: 'EVENING',
    repeat_rule: { days: ['WED'] },
    last_completed: '2025-07-09T20:00:00Z',
    deadline: null, scheduled_date: null,
  },

  // 3. Weekly task on MON — should NOT appear (today is WED)
  {
    id: 't-003', title: 'Monday standup',
    type: 'WEEKLY', status: 'PENDING', priority: 'MEDIUM',
    scheduled_time: '09:30', time_block: 'MORNING',
    repeat_rule: { days: ['MON'] },
    last_completed: null, deadline: null, scheduled_date: null,
  },

  // 4. Monthly task on the 16th — should appear today
  {
    id: 't-004', title: 'Pay internet bill',
    type: 'MONTHLY', status: 'PENDING', priority: 'URGENT',
    scheduled_time: '09:00', time_block: 'MORNING',
    repeat_rule: { dates: [16] },
    last_completed: null, deadline: null, scheduled_date: null,
  },

  // 5. Monthly task on the 1st — should NOT appear (today is 16th)
  {
    id: 't-005', title: 'Budget review',
    type: 'MONTHLY', status: 'PENDING', priority: 'HIGH',
    scheduled_time: null, time_block: 'AFTERNOON',
    repeat_rule: { dates: [1] },
    last_completed: null, deadline: null, scheduled_date: null,
  },

  // 6. One-time task due today — should appear
  {
    id: 't-006', title: 'Submit assignment',
    type: 'ONE_TIME', status: 'PENDING', priority: 'URGENT',
    scheduled_time: '14:00', time_block: 'AFTERNOON',
    repeat_rule: null,
    deadline: '2025-07-16', scheduled_date: '2025-07-16',
    last_completed: null,
  },

  // 7. One-time task due tomorrow — should NOT appear
  {
    id: 't-007', title: 'Call the bank',
    type: 'ONE_TIME', status: 'PENDING', priority: 'LOW',
    scheduled_time: null, time_block: 'ANYTIME',
    repeat_rule: null,
    deadline: '2025-07-17', scheduled_date: '2025-07-17',
    last_completed: null,
  },

  // 8. One-time task already DONE — should NOT appear
  {
    id: 't-008', title: 'Buy groceries',
    type: 'ONE_TIME', status: 'DONE', priority: 'MEDIUM',
    scheduled_time: '11:00', time_block: 'MORNING',
    repeat_rule: null,
    deadline: null, scheduled_date: '2025-07-16',
    last_completed: '2025-07-16T11:30:00Z',
  },

  // 9. One-time overdue task (no scheduled_date) — should appear
  {
    id: 't-009', title: 'Fix broken link on site',
    type: 'ONE_TIME', status: 'PENDING', priority: 'HIGH',
    scheduled_time: null, time_block: 'ANYTIME',
    repeat_rule: null,
    deadline: '2025-07-14', scheduled_date: null,  // overdue, no date
    last_completed: null,
  },

  // 10. Daily task with every:2 — last done 2 days ago → should appear
  {
    id: 't-010', title: 'Skin care',
    type: 'DAILY', status: 'PENDING', priority: 'LOW',
    scheduled_time: '22:00', time_block: 'NIGHT',
    repeat_rule: { every: 2 },
    last_completed: '2025-07-14T22:00:00Z',  // 2 days ago
    deadline: null, scheduled_date: null,
  },

  // 11. Daily task with every:2 — last done yesterday → should NOT appear
  {
    id: 't-011', title: 'Journal entry',
    type: 'DAILY', status: 'PENDING', priority: 'LOW',
    scheduled_time: '23:00', time_block: 'NIGHT',
    repeat_rule: { every: 2 },
    last_completed: '2025-07-15T23:00:00Z',  // only 1 day ago
    deadline: null, scheduled_date: null,
  },

];

// ── Run ───────────────────────────────────────────────────────

const schedule = generateSchedule(TASKS, TODAY);

console.log('\n━━━ SCHEDULE: Wednesday 2025-07-16 ━━━\n');

for (const [block, tasks] of Object.entries(schedule)) {
  console.log(`▸ ${block.toUpperCase()} (${tasks.length})`);
  if (tasks.length === 0) {
    console.log('   (empty)');
  } else {
    tasks.forEach(t => {
      const time = t.scheduled_time ?? '     ';
      console.log(`   [${t.priority.padEnd(6)}] ${time}  ${t.title}`);
    });
  }
  console.log();
}

console.log(`Total tasks today: ${countToday(schedule)}`);
console.log();

// ── Expected output ───────────────────────────────────────────
//
//  ▸ MORNING (3)
//     [URGENT] 09:00  Pay internet bill      ← monthly, 16th
//     [MEDIUM] 07:00  Morning walk           ← daily, every 1
//     [HIGH  ]        Fix broken link        ← overdue one-time
//
//  ▸ AFTERNOON (1)
//     [URGENT] 14:00  Submit assignment      ← one-time, today
//
//  ▸ EVENING (1)
//     [HIGH  ] 20:00  Review weekly goals    ← weekly, WED
//
//  ▸ NIGHT (1)
//     [LOW   ] 22:00  Skin care              ← daily, every 2
//
//  Total tasks today: 6
