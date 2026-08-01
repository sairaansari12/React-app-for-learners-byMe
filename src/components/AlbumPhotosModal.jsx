import React, { useEffect, useRef, useState } from 'react';
import { fetchFromApi } from '../api';
import Spinner from './Spinner';

export default function AlbumPhotosModal({ album, onClose }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const photoScrollerRef = useRef(null);
  const placeholderTags = ['album1', 'album2', 'album3', 'album4'];
  const publicUrl = process.env.PUBLIC_URL || '';

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchFromApi('photos', { albumId: album.id })
      .then((data) => { if (mounted) setPhotos(data); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [album]);

  const placeholderImages = [
    `${publicUrl}/images/album1.png`,
    `${publicUrl}/images/album2.png`,
    `${publicUrl}/images/album3.png`,
    `${publicUrl}/images/user.png`,
  ];

  const handleImageError = (event) => {
    event.target.onError = null;
    const fallback = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    event.target.src = fallback;
  };

  const scrollPhotos = (direction) => {
    if (!photoScrollerRef.current) return;
    const offset = photoScrollerRef.current.clientWidth * 0.8;
    photoScrollerRef.current.scrollBy({ left: direction === 'left' ? -offset : offset, behavior: 'smooth' });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal>
        <header className="modal-header">
          <h2>Photos in "{album.title}"</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        <div className="modal-body">
          {loading && <div className="alert-info"><Spinner size={20} /> Loading photos…</div>}
          {!loading && (
            <div className="photo-scroller-wrapper" style={{ marginTop: '0.5rem' }}>
              <button className="scroll-button left" onClick={() => scrollPhotos('left')} aria-label="Scroll left">‹</button>
              <div className="photo-scroller" ref={photoScrollerRef}>
                {photos.map((p) => {
                  const tag = placeholderTags[(p.id + album.id) % placeholderTags.length];
                  return (
                    <article className="photo-item" key={p.id}>
                      <img src={p.thumbnailUrl} alt={p.title} onError={handleImageError} />
                      <p>{p.title}</p>
                      <span className="photo-placeholder">{tag}</span>
                    </article>
                  );
                })}
              </div>
              <button className="scroll-button right" onClick={() => scrollPhotos('right')} aria-label="Scroll right">›</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
