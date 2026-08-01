import React from 'react';

function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

export default function Pagination({ total, page, pageSize, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (totalPages === 1) return null;

  const pages = [];
  if (totalPages <= 7) {
    pages.push(...range(1, totalPages));
  } else {
    if (page <= 4) pages.push(...range(1, 5), '...', totalPages);
    else if (page >= totalPages - 3) pages.push(1, '...', ...range(totalPages - 4, totalPages));
    else pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="page-btn" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page === 1}>
        Prev
      </button>
      {pages.map((p, idx) => (
        <React.Fragment key={String(p) + idx}>
          {p === '...' ? (
            <span className="ellipsis">…</span>
          ) : (
            <button
              className={`page-btn ${p === page ? 'active' : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )}
        </React.Fragment>
      ))}
      <button className="page-btn" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        Next
      </button>
    </nav>
  );
}
