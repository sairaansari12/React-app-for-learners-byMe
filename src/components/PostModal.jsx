import React, { useEffect } from 'react';
import CommentsList from './CommentsList';

export default function PostModal({ post, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!post) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <header className="modal-header">
          <h2>{post.title}</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">×</button>
        </header>
        <div className="modal-body">
          <p>{post.body}</p>
          <div className="modal-meta">User {post.userId} • ID {post.id}</div>

          <section className="comments-section">
            <h3>Comments</h3>
            <CommentsList postId={post.id} />
          </section>
        </div>
      </div>
    </div>
  );
}
