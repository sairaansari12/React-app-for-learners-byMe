import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchFromApi } from '../api';
import Spinner from '../components/Spinner';

export default function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (!userId) return;

    setStatus('loading');
    setError(null);

    fetchFromApi(`users/${userId}`)
      .then((data) => {
        if (mounted) {
          setUser(data);
          setStatus('succeeded');
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err.message || 'Unable to load user profile.');
          setStatus('failed');
        }
      });

    return () => {
      mounted = false;
    };
  }, [userId]);

  if (status === 'loading') {
    return (
      <div className="alert-info profile-loading">
        <Spinner size={28} /> Loading user profile…
      </div>
    );
  }

  if (status === 'failed') {
    return <div className="alert-error">{error}</div>;
  }

  if (!user) {
    return <div className="alert-info">User not found.</div>;
  }

  return (
    <section className="user-profile-page">
      <div className="page-header">
        <div>
          <h1>User Profile</h1>
          <p>Explore {user.name}'s full profile with contact details, address, and company cards.</p>
        </div>
      </div>

      <article className="profile-summary-card">
        <div className="profile-summary-left">
          <img
            className="user-avatar profile-avatar"
            src={`${process.env.PUBLIC_URL}/images/user.png`}
            alt={`${user.name} avatar`}
          />
          <div>
            <h2>{user.name}</h2>
            <p className="profile-username">@{user.username}</p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        <div className="profile-summary-right">
          <div className="profile-key-value">
            <span>Phone</span>
            <a href={`tel:${user.phone}`}>{user.phone}</a>
          </div>
          <div className="profile-key-value">
            <span>Website</span>
            <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
          </div>
          <div className="profile-key-value">
            <span>User ID</span>
            <span>{user.id}</span>
          </div>
        </div>
      </article>

      <div className="profile-info-grid">
        

        <article className="profile-info-card">
          <h3>Address</h3>
          <p>{user.address.street}</p>
          <p>{user.address.suite}</p>
          <p>{user.address.city}, {user.address.zipcode}</p>
          <p className="profile-geo">Lat: {user.address.geo.lat} · Lng: {user.address.geo.lng}</p>
        </article>

        <article className="profile-info-card">
          <h3>Company</h3>
          <p><strong>{user.company.name}</strong></p>
          <p className="profile-company-phrase">"{user.company.catchPhrase}"</p>
          <p>{user.company.bs}</p>
        </article>
      </div>

      <div className="profile-actions">
        <Link className="button button-secondary" to="/users">
          Back to Users
        </Link>
        <a className="button button-primary" href={`https://${user.website}`} target="_blank" rel="noreferrer">
          Visit Website
        </a>
      </div>
    </section>
  );
}
