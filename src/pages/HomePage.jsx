import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import resourceConfig from '../data/resourceConfig';
import { fetchResource } from '../store';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const dispatch = useDispatch();
  const postsState = useSelector((s) => s.resources.posts);
  const { items = [], status } = postsState || {};
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (status === 'idle') dispatch(fetchResource('posts'));
  }, [dispatch, status]);

  const total = items.length;
  const sample = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page]);

  return (
    <div className="home-page">
      <section className="dashboard-intro">
        <h1>JSONPlaceholder Dashboard</h1>
        <p>Latest posts (card view). Use the links below to view other resources.</p>
      </section>

      

      <section className="resource-summary" style={{ marginTop: '1.5rem' }}>
        {resourceConfig.map((resource) => (
          <article className="summary-card" key={resource.key}>
            <p className="summary-label">{resource.label}</p>
            <strong>{resource.description}</strong>
            <p className="summary-detail">Load {resource.label} from the JSONPlaceholder API.</p>
            <Link className="summary-link" to={`/${resource.key}`}>
              View {resource.label}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
