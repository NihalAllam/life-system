export default function Goals() {
  return (
    <div className="main">
      <div className="main__header">
        <h1 className="main__title">Goals</h1>
      </div>
      <div className="main__body">
        {/* Long-term goals go here */}
        <p style={{ color: 'var(--text-dim)', fontFamily: 'var(--mono)', fontSize: 11 }}>
          no goals yet.
        </p>
      </div>
    </div>
  );
}
