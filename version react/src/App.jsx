import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Projects from './components/Projects';
import AddProjectPage from './components/AddProjectPage';
import Contact from './components/Contact';

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/projets" element={<Projects />} />
        <Route path="/ajouter" element={<AddProjectPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Projects />} /> {/* Default to projects */}
      </Routes>
      <footer className="app-footer">
        <span>© 2024 Portfolio · Propulsé par React &amp; json-server</span>
      </footer>
    </div>
  );
}

export default App;
