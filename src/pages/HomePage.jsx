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
      <section className="home-hero">
        <div className="hero-copy">
          <span className="hero-badge">Dashboard</span>
          <h1>Explore ZaviLearning with animated insights</h1>
          <p>
            Discover a clean interactive dashboard for exploring posts, todos, users, albums,
            and photos.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/posts">
              Explore Posts
            </Link>
            <Link className="button button-secondary" to="/about">
              About Dashboard
            </Link>
            <Link className="button button-secondary" to="/creator">
              About Creator
            </Link>
          </div>
        </div>

        <div className="hero-visuals">
        
          <div className="visual-card visual-card-1">Fast API access</div>
          <div className="visual-card visual-card-3">Clean interface</div>
        </div>
      </section>

      <section className="dashboard-intro">
        <h2>Welcome to the ZaviLearning Dashboard</h2>
        <p>
          Ready-to-use React dashboard content for learners who want a complete real-app experience
          with posts, todos, users, albums, and photos.
        </p>
        <p>Use the cards below to quickly access different ZaviLearning resources with smooth UI transitions and animations.</p>
      </section>

      <section className="resource-summary" style={{ marginTop: '1.5rem' }}>
        {resourceConfig.map((resource) => (
          <article className="summary-card" key={resource.key}>
            <p className="summary-label">{resource.label}</p>
            <strong>{resource.description}</strong>
            <p className="summary-detail">Load {resource.label} from the ZaviLearning API.</p>
            <Link className="summary-link" to={`/${resource.key}`}>
              View {resource.label}
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
