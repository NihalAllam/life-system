import { useState } from 'react';

const TYPES = ['ONE_TIME', 'DAILY', 'WEEKLY', 'MONTHLY'];
const BLOCKS = ['MORNING', 'AFTERNOON', 'EVENING', 'NIGHT'];

export default function TaskForm({ onSubmit, onClose }) {
  const [title, setTitle]     = useState('');
  const [type, setType]       = useState('ONE_TIME');
  const [block, setBlock]     = useState('MORNING');

  function handleSubmit() {
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), type, time_block: block });
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

        </div>

        <div className="modal__footer">
          <button className="btn-ghost" onClick={onClose}>cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>add task</button>
        </div>

      </div>
    </div>
  );
}