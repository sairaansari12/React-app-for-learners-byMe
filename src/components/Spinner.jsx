import React from 'react';

export default function Spinner({ size = 40 }) {
  const style = { width: size, height: size };
  return (
    <div className="spinner" style={style} aria-hidden="true">
      <svg viewBox="0 0 50 50" style={{ width: '100%', height: '100%' }}>
        <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
    </div>
  );
}
