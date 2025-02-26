import React, { useEffect } from 'react';
import Banner from './Banner';
import About from './About';
import ProgrammingLanguages from './ProgrammingLanguages';
import QA from './QA';
import TestFundamentals from './TestFundamentals';
import Thanks from './Thanks';
import CertificatesModal from './CertificatesModal';
import './Home.styles.css';

const Home = () => {
  useEffect(() => {
    // Inicializar componentes do Materialize
    if (window.M) {
      const elems = document.querySelectorAll('.modal');
      window.M.Modal.init(elems);
      
      const parallax = document.querySelectorAll('.parallax');
      window.M.Parallax.init(parallax);
    }
  }, []);

  return (
    <>
      <Banner />
      <About />
      <CertificatesModal />
      <ProgrammingLanguages />
      <QA />
      <TestFundamentals />
      <Thanks />
    </>
  );
};

export default Home;