import React, { useEffect, useRef, useState } from 'react';
import { fetchFromApi } from '../api';
import Spinner from './Spinner';

export default function CommentsList({ postId }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    setComments([]);
    setPage(1);
    setHasMore(true);
  }, [postId]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchFromApi('comments', { postId, _page: page, _limit: 10 });
        if (!mounted) return;
        setComments((p) => [...p, ...data]);
        if (data.length < 10) setHasMore(false);
      } catch (err) {
        setHasMore(false);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [postId, page]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage((p) => p + 1);
      }
    }, { root: null, rootMargin: '200px' });
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="comments-list">
      {comments.map((c) => (
        <div key={c.id} className="comment-item">
          <div className="comment-avatar-row">
            <img className="comment-avatar" src={`${process.env.PUBLIC_URL}/images/user.png`} alt={`${c.name} avatar`} />
            <div>
              <strong>{c.name}</strong>
              <div className="comment-email">{c.email}</div>
            </div>
          </div>
          <p>{c.body}</p>
        </div>
      ))}

      {loading && <div className="comment-loading"><Spinner size={20} /> Loading comments…</div>}

      <div ref={loaderRef} style={{ height: 1 }} />

      {!hasMore && <div className="comment-end">No more comments</div>}
    </div>
  );
}
