import { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    // Initialize Materialize components if needed
    if (window.M) {
      window.M.AutoInit();
    }
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const REVEAL_TRANSITION_MS = 600;

    // Targets:
    // - regular `.section` blocks (excluding ones inside parallax and `.no-pad-bot`)
    // - parallax banners themselves (`.parallax-container`)
    const sectionTargets = Array.from(document.querySelectorAll('.section')).filter((section) => {
      if (section.classList.contains('no-pad-bot')) return false;
      if (section.closest('.parallax-container')) return false;
      return true;
    });

    const parallaxTargets = Array.from(document.querySelectorAll('.parallax-container'));
    const targets = [...parallaxTargets, ...sectionTargets];

    if (targets.length === 0) return;

    const reveal = (el) => {
      el.style.opacity = '1';
      el.style.pointerEvents = '';
      el.dataset.revealed = '1';
    };

    const hide = (el) => {
      if (el.dataset.revealed === '1') return;
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
    };

    if (prefersReducedMotion || typeof window.IntersectionObserver !== 'function') {
      targets.forEach(reveal);
      return;
    }

    // Initial hidden state (so the reveal is noticeable)
    targets.forEach((el) => {
      if (!el.dataset.revealInit) {
        el.style.transition = `opacity ${REVEAL_TRANSITION_MS}ms ease-out`;
        el.style.willChange = 'opacity';
        el.dataset.revealInit = '1';
      }
      hide(el);
    });

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -15% 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

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
