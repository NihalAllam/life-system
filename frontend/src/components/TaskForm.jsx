import { useState } from 'react';

const TYPES  = ['ONE_TIME', 'DAILY', 'WEEKLY', 'MONTHLY'];
const BLOCKS = ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'];
const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const CATEGORIES = ['STUDY', 'EXERCISE', 'HYGIENE', 'LIFE', 'MOVIES', 'OTHER'];

export default function TaskForm({ onSubmit, onClose }) {
  const [title, setTitle]   = useState('');
  const [type, setType]     = useState('ONE_TIME');
  const [block, setBlock]   = useState('MORNING');
  const [days, setDays]     = useState([]);        // for WEEKLY
  const [date, setDate]     = useState('');        // for MONTHLY (1–31)
  const [category, setCategory] = useState('OTHER');

  function toggleDay(day) {
    setDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  }

  function buildRepeatRule() {
    if (type === 'DAILY')   return { every: 1 };
    if (type === 'WEEKLY')  return days.length ? { days } : null;
    if (type === 'MONTHLY') return date ? { dates: [parseInt(date)] } : null;
    return null;
  }

  function handleSubmit() {
    if (!title.trim()) return;
    onSubmit({
      title      : title.trim(),
      type,
      time_block : block,
      repeat_rule: buildRepeatRule(),
      category,
    });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        <div className="modal__header">
          <span className="modal__title">new task</span>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="modal__body">

          <div className="form-field">
            <label className="form-label">title</label>
            <input
              className="form-input"
              type="text"
              placeholder="what needs to be done"
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              autoFocus
            />
          </div>

          <div className="form-field">
            <label className="form-label">type</label>
            <div className="form-pills">
              {TYPES.map(t => (
                <button
                  key={t}
                  className={`form-pill ${type === t ? 'active' : ''}`}
                  onClick={() => setType(t)}
                >
                  {t.toLowerCase().replace('_', '-')}
                </button>
              ))}
            </div>
          </div>

          {/* WEEKLY — day picker */}
          {type === 'WEEKLY' && (
            <div className="form-field">
              <label className="form-label">repeat on</label>
              <div className="form-pills">
                {WEEKDAYS.map(d => (
                  <button
                    key={d}
                    className={`form-pill ${days.includes(d) ? 'active' : ''}`}
                    onClick={() => toggleDay(d)}
                  >
                    {d.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MONTHLY — date input */}
          {type === 'MONTHLY' && (
            <div className="form-field">
              <label className="form-label">repeat on day</label>
              <input
                className="form-input"
                type="number"
                min="1"
                max="31"
                placeholder="e.g. 1"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{ width: 80 }}
              />
            </div>
          )}

          <div className="form-field">
            <label className="form-label">time block</label>
            <div className="form-pills">
              {BLOCKS.map(b => (
                <button
                  key={b}
                  className={`form-pill ${block === b ? 'active' : ''}`}
                  onClick={() => setBlock(b)}
                >
                  {b.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">category</label>
            <div className="form-pills">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`form-pill ${category === c ? 'active' : ''}`}
                  onClick={() => setCategory(c)}
                >
                  {c.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

        </div>

        <div className="modal__footer">
          <button className="btn-ghost" onClick={onClose}>cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>add task</button>
        </div>

      </div>
    </div>
  );
}