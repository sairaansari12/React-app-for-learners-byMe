import React from 'react';

export default function PostCard({ post, onViewComments }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <div className="post-meta">User {post.userId} • ID {post.id}</div>
      <div style={{ marginTop: '0.6rem' }}>
        <span className="post-action-text" onClick={(e) => { e.stopPropagation(); onViewComments && onViewComments(post); }} role="button" tabIndex={0}>
          View Comments →
        </span>
      </div>
    </article>
  );
}
