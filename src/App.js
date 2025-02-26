import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/pages/Home/Home';
import Projects from './components/pages/Projects/Projects';

function App() {
  useEffect(() => {
    // Inicializar Materialize quando o componente montar
    if (window.M) {
      // Inicializar componentes do Materialize
      const modals = document.querySelectorAll('.modal');
      window.M.Modal.init(modals);
      
      const parallax = document.querySelectorAll('.parallax');
      window.M.Parallax.init(parallax);
    }

    // Função de download do CV
    window.downloadFile = () => {
      window.open("https://www.dropbox.com/scl/fi/m8xsfhlkk6zye20vz7fvc/Marcelo-s-Resume-Q3-2023.pdf?rlkey=nfcbts87e9gv4o0nrjq4v57yc&dl=0");
    };
  }, []);
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/frameworks" element={<div className="container"><h2>Frameworks Page</h2></div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
