export default function Tasks() {
  return (
    <div className="main">
      <div className="main__header">
        <h1 className="main__title">Tasks</h1>
      </div>
      <div className="main__body">
        {/* Task list + creation form goes here */}
        <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--mono)', fontSize: 11 }}>
          no tasks yet.
        </p>
      </div>
    </div>
  );
}
