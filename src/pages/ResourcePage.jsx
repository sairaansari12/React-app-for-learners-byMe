import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import resourceConfig from '../data/resourceConfig';
import { fetchResource } from '../store';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';
import PostCard from '../components/PostCard';
import PostModal from '../components/PostModal';
import UserAlbumsModal from '../components/UserAlbumsModal';

export default function ResourcePage({ resource }) {
  const dispatch = useDispatch();
  const resourceState = useSelector((state) => state.resources[resource]);
  const config = resourceConfig.find((item) => item.key === resource);

  useEffect(() => {
    if (config && resourceState && resourceState.status === 'idle') {
      dispatch(fetchResource(resource));
    }
  }, [config, dispatch, resource, resourceState]);

  // If we're viewing albums, ensure users are loaded to show album owners
  const usersState = useSelector((state) => state.resources.users);
  useEffect(() => {
    if (resource === 'albums' && usersState && usersState.status === 'idle') {
      dispatch(fetchResource('users'));
    }
  }, [resource, usersState, dispatch]);

  if (!config) {
    return <div className="alert-error">Resource not found</div>;
  }

  const { items = [], status, error } = resourceState || {};
  const [page, setPage] = useState(1);
  const albumScrollerRef = useRef(null);
  const pageSize = resource === 'photos' ? 12 : resource === 'users' ? 8 : 10;

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const sample = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const scrollAlbums = (direction) => {
    if (!albumScrollerRef.current) return;
    const offset = albumScrollerRef.current.clientWidth * 0.8;
    albumScrollerRef.current.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <section className="resource-page">
      <div className="page-header">
        <div>
          <h1>{config.label}</h1>
          <p>{config.description}</p>
          {/* Endpoint URLs are intentionally hidden from the UI */}
        </div>
      </div>

      {status === 'loading' && (
        <div className="alert-info">
          <Spinner size={28} /> Loading {config.label}…
        </div>
      )}
      {status === 'failed' && <div className="alert-error">{error}</div>}

      <div className="resource-meta">
        <span>Total items: {items.length}</span>
        <span>Fetch status: {status}</span>
      </div>

      <div className="resource-sample">
        {resource === 'photos' ? (
          <div className="photo-grid">
            {sample.map((photo) => (
              <article className="photo-item" key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
              </article>
            ))}
          </div>
        ) : resource === 'users' ? (
          <div className="user-list">
            {sample.map((user) => (
              <article className="user-card" key={user.id}>
                <img className="user-avatar" src="/images/user.png" alt={`${user.name} avatar`} />
                <h3>{user.name}</h3>
                <p className="user-detail"><span className="detail-icon">@</span>{user.username}</p>
                <p className="user-detail"><span className="detail-icon">✉️</span>{user.email}</p>
                <p className="user-detail"><span className="detail-icon">🌐</span>{user.website}</p>
                <p className="user-detail"><span className="detail-icon">🏢</span>{user.company?.name}</p>
                <span className="user-action-text" onClick={() => setSelectedUser(user)} role="button" tabIndex={0}>
                  View Albums
                </span>
              </article>
            ))}
          </div>
        ) : resource === 'posts' ? (
          <div className="post-grid">
            {sample.map((post) => (
              <PostCard key={post.id} post={post} onViewComments={(p) => setSelectedPost(p)} />
            ))}
          </div>
        ) : resource === 'albums' ? (
          <div className="album-scroller-wrapper">
            <button className="scroll-button left" onClick={() => scrollAlbums('left')} aria-label="Scroll albums left">‹</button>
            <div className="album-scroller" ref={albumScrollerRef}>
              <div className="album-list album-list-inline">
                {sample.map((album) => {
                  const users = (usersState && usersState.items) || [];
                  const user = users.find((u) => u.id === album.userId);
                  return (
                    <article className="summary-card" key={album.id}>
                      <strong>{album.title}</strong>
                      <p className="summary-detail">By: {user ? user.name : `User ${album.userId}`}</p>
                    </article>
                  );
                })}
              </div>
            </div>
            <button className="scroll-button right" onClick={() => scrollAlbums('right')} aria-label="Scroll albums right">›</button>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title / Name</th>
                <th>Extra</th>
              </tr>
            </thead>
            <tbody>
              {sample.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title || item.name}</td>
                  <td>
                    {resource === 'comments' && item.email}
                    {resource === 'albums' && `User ${item.userId}`}
                    {resource === 'todos' && (item.completed ? 'Completed' : 'Pending')}
                    {resource === 'posts' && `User ${item.userId}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
      {selectedUser && <UserAlbumsModal user={selectedUser} onClose={() => setSelectedUser(null)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="resource-meta">Page {page} of {totalPages}</div>
        <Pagination total={total} page={page} pageSize={pageSize} onPageChange={setPage} />
      </div>
    </section>
  );
}
