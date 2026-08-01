import React from 'react';

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>About this Dashboard</h1>
        <p>
          This app demonstrates a clean React dashboard built on ZaviLearning data. It uses
          React Router, Redux Toolkit, and modern UI patterns for fast data loading and polished
          interactions.
        </p>
      </section>

      <section className="about-features">
        <article>
          <h2>Fast navigation</h2>
          <p>Navigate between posts, todos, and users with client-side routing and instant page transitions.</p>
        </article>
        <article>
          <h2>Animated UI</h2>
          <p>Experience subtle motion on the home page and smooth hover states across cards.</p>
        </article>
        <article>
          <h2>Expandable design</h2>
          <p>This structure is ready for more pages like albums, photos, analytics, and settings.</p>
        </article>
      </section>

      <section className="about-tech">
        <h2>Tech stack</h2>
        <div className="tech-grid">
          <article className="tech-card">
            <div className="tech-icon">⚛️</div>
            <h3>React</h3>
            <p>Component-driven UI rendering with hooks and declarative state management.</p>
          </article>
          <article className="tech-card">
            <div className="tech-icon">🧠</div>
            <h3>Redux Toolkit</h3>
            <p>Simplified state logic for async data fetching, caching, and global state handling.</p>
          </article>
          <article className="tech-card">
            <div className="tech-icon">🛣️</div>
            <h3>React Router</h3>
            <p>Client-side routing for page navigation without full refreshes.</p>
          </article>
          <article className="tech-card">
            <div className="tech-icon">⚡</div>
            <h3>Vite / CRA</h3>
            <p>Modern build tooling with a fast dev server and production bundling options.</p>
          </article>
          <article className="tech-card">
            <div className="tech-icon">🎨</div>
            <h3>CSS</h3>
            <p>Responsive styling, gradients, animations, and layout utilities for polished UI.</p>
          </article>
          <article className="tech-card">
            <div className="tech-icon">🧩</div>
            <h3>Babel</h3>
            <p>JavaScript compilation that enables modern syntax while maintaining browser compatibility.</p>
          </article>
          <article className="tech-card">
            <div className="tech-icon">🌐</div>
            <h3>HTML</h3>
            <p>Semantic structure for app shell, accessibility, and SEO-friendly markup.</p>
          </article>
          <article className="tech-card">
            <div className="tech-icon">🔒</div>
            <h3>Security</h3>
            <p>Safe public asset paths, secure API handling, and prepared deployment configuration.</p>
          </article>
        </div>
      </section>

      <section className="about-concepts">
        <h2>React concepts</h2>
        <div className="concept-grid">
          <article className="concept-card">
            <div className="concept-icon">🌐</div>
            <h3>Context API</h3>
            <p>Shared state for theme and settings without prop drilling across component trees.</p>
          </article>
          <article className="concept-card">
            <div className="concept-icon">⏳</div>
            <h3>Loaders</h3>
            <p>Async data fetching patterns with loading states for smooth data-driven UI.</p>
          </article>
          <article className="concept-card">
            <div className="concept-icon">🌀</div>
            <h3>Spinner</h3>
            <p>Reusable loading indicators that inform users while network requests are pending.</p>
          </article>
          <article className="concept-card">
            <div className="concept-icon">🪟</div>
            <h3>Modals</h3>
            <p>On-top overlays for viewing details and nested content without navigating away.</p>
          </article>
          <article className="concept-card">
            <div className="concept-icon">⚙️</div>
            <h3>React Hooks</h3>
            <p>useState, useEffect, useMemo, and custom hooks power state and lifecycle behavior.</p>
          </article>
          <article className="concept-card">
            <div className="concept-icon">🧠</div>
            <h3>Memoization</h3>
            <p>useMemo and useCallback prevent unnecessary re-renders and improve performance.</p>
          </article>
          <article className="concept-card">
            <div className="concept-icon">📦</div>
            <h3>Component Composition</h3>
            <p>Reusable building blocks like cards, lists, modals, and loaders keep the UI modular.</p>
          </article>
          <article className="concept-card">
            <div className="concept-icon">🧪</div>
            <h3>Async Effects</h3>
            <p>useEffect with fetch calls manages API interactions, cleanup, and state updates.</p>
          </article>
        </div>
      </section>
    </div>
  );
}
