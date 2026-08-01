import React, { useEffect, useRef, useState } from 'react';
import { fetchFromApi } from '../api';
import AlbumPhotosModal from './AlbumPhotosModal';

export default function UserAlbumsModal({ user, onClose }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const albumScrollerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchFromApi('albums', { userId: user.id })
      .then((data) => { if (mounted) setAlbums(data); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [user]);

  const scrollAlbums = (direction) => {
    if (!albumScrollerRef.current) return;
    const offset = albumScrollerRef.current.clientWidth * 0.8;
    albumScrollerRef.current.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal>
        <header className="modal-header">
          <h2>Albums by {user.name}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        <div className="modal-body">
          {loading && <div className="alert-info">Loading albums…</div>}
          {!loading && albums.length === 0 && <div className="alert-info">No albums found.</div>}
          <div className="album-scroller-wrapper" style={{ marginTop: '0.5rem' }}>
            <button className="scroll-button left" onClick={() => scrollAlbums('left')} aria-label="Scroll albums left">‹</button>
            <div className="album-scroller" ref={albumScrollerRef}>
              <div className="album-list album-list-inline">
                {albums.map((a) => (
                  <article key={a.id} className="summary-card">
                    <strong>{a.title}</strong>
                    <span className="user-action-text" onClick={() => setSelectedAlbum(a)} role="button" tabIndex={0}>
                      Open Album
                    </span>
                  </article>
                ))}
              </div>
            </div>
            <button className="scroll-button right" onClick={() => scrollAlbums('right')} aria-label="Scroll albums right">›</button>
          </div>
        </div>

        {selectedAlbum && (
          <AlbumPhotosModal album={selectedAlbum} onClose={() => setSelectedAlbum(null)} />
        )}
      </div>
    </div>
  );
}
