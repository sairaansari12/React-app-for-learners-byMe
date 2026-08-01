import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post, authorName, onViewComments, authorLink }) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <div className="post-meta">
        {authorLink ? (
          <Link className="post-author" to={authorLink}>
            {authorName || `User ${post.userId}`}
          </Link>
        ) : (
          authorName || `User ${post.userId}`
        )}
      </div>
      <div style={{ marginTop: '0.6rem' }}>
        <span className="post-action-text" onClick={(e) => { e.stopPropagation(); onViewComments && onViewComments(post); }} role="button" tabIndex={0}>
          View Comments →
        </span>
      </div>
    </article>
  );
}
