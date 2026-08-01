import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/posts', label: 'Posts' },
  { to: '/todos', label: 'Todos' },
  { to: '/users', label: 'Users' },
];

export default function Header() {
  return (
    <header className="top-header">
      <div className="brand">JSONPlaceholder Dashboard</div>
      <nav className="site-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
