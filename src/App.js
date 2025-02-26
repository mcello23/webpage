import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/pages/Home/Home';
import Projects from './components/pages/Projects/Projects';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/frameworks" element={<div>Frameworks Page</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
