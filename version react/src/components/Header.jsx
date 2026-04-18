import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-dot" />
          <span className="logo-text">Portfolio</span>
        </div>
        <nav className="header-nav">
          <Link to="/projets" className="nav-link">Projets</Link>
          <Link to="/ajouter" className="nav-link">Ajouter</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;