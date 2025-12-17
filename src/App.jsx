import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Articles from './components/Articles';
import CertificatesModal from './components/CertificatesModal';
import Contact from './components/Contact';
import CookieConsent from './components/CookieConsent';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Frameworks from './components/Frameworks';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import SideProjects from './components/SideProjects';
import Skills from './components/Skills';
import TestDashboardModal from './components/TestDashboardModal';

function App() {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isTestDashboardOpen, setIsTestDashboardOpen] = useState(false);

  useEffect(() => {
    // Initialize Materialize components if needed
    if (window.M) {
      window.M.AutoInit();
    }
  }, []);

  return (
    <div className="App">
      <Navbar onOpenCertificates={() => setIsCertModalOpen(true)} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Skills />
                <Experience />
                <Articles />
                <Contact />
              </>
            }
          />
          <Route path="/side-projects" element={<SideProjects />} />
          <Route path="/frameworks" element={<Frameworks />} />
        </Routes>
      </main>

      <Footer />

      <CookieConsent />

      <CertificatesModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} />

      <TestDashboardModal
        isOpen={isTestDashboardOpen}
        onClose={() => setIsTestDashboardOpen(false)}
      />

      {/* Floating Action Button for Test Dashboard */}
      <button
        className="dashboard-fab"
        onClick={() => setIsTestDashboardOpen(true)}
        aria-label="Open Test Dashboard"
        title="View Test Results"
      >
        <i className="material-icons">analytics</i>
      </button>
    </div>
  );
}

export default App;
