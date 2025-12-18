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

    // Fade in/out effect for sections on scroll
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      sections.forEach((section) => {
        // Skip parallax containers and sections inside them
        if (
          section.classList.contains('parallax-container') ||
          section.closest('.parallax-container') ||
          section.classList.contains('no-pad-bot')
        ) {
          return;
        }

        const rect = section.getBoundingClientRect();
        const elementTop = rect.top + scrollTop;
        const elementBottom = elementTop + rect.height;
        const viewportTop = scrollTop;
        const viewportBottom = scrollTop + windowHeight;

        // Calculate if element is in viewport
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
          // Element is in viewport - calculate opacity based on position
          const elementCenter = elementTop + rect.height / 2;
          const viewportCenter = viewportTop + windowHeight / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          const maxDistance = windowHeight * 1.5;
          const opacity = Math.max(0.5, 1 - (distance / maxDistance) * 0.47);

          section.style.opacity = opacity;
          section.style.transition = 'opacity 0.4s ease-out';
        } else {
          // Element is out of viewport
          section.style.opacity = '0.15';
        }
      });
    };

    // Initial call
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
