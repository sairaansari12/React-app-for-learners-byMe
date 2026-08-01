import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResourcePage from './pages/ResourcePage';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<ResourcePage resource="posts" />} />
          <Route path="/todos" element={<ResourcePage resource="todos" />} />
          <Route path="/users" element={<ResourcePage resource="users" />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
      <Footer />
    </div>
  );
}

export default App;
