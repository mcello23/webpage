import { useCallback, useEffect, useState } from 'react';
import { certificates } from '../data/certificates';
import '../styles/certificates.min.css';

const CertificatesModal = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Navigation logic
  const navigate = useCallback((direction) => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return (prevIndex + direction + certificates.length) % certificates.length;
    });
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }

      if (currentIndex !== null) {
        if (e.key === 'ArrowLeft') {
          navigate(-1);
        } else if (e.key === 'ArrowRight') {
          navigate(1);
        } else if (e.key === 'Backspace') {
          setCurrentIndex(null);
        }
      }
    },
    [isOpen, currentIndex, onClose, navigate]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Preload next/prev images for smoother navigation
  useEffect(() => {
    if (currentIndex !== null) {
      const nextIndex = (currentIndex + 1) % certificates.length;
      const prevIndex = (currentIndex - 1 + certificates.length) % certificates.length;

      const imgNext = new Image();
      imgNext.src = certificates[nextIndex].image;

      const imgPrev = new Image();
      imgPrev.src = certificates[prevIndex].image;
    }
  }, [currentIndex]);

  // Swipe handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      navigate(1);
    }
    if (isRightSwipe) {
      navigate(-1);
    }
  };

  if (!isOpen) return null;

  const handleCertClick = (certId) => {
    const index = certificates.findIndex((c) => c.id === certId);
    setCurrentIndex(index);
  };

  const handleBackToGrid = () => {
    setCurrentIndex(null);
  };

  const currentCert = currentIndex !== null ? certificates[currentIndex] : null;

  return (
    <div
      id="certificateModal"
      className="cert-modal active"
      onClick={(e) => {
        if (e.target.id === 'certificateModal') onClose();
      }}
    >
      <div className="cert-modal-content modern-theme">
        <button className="cert-close" aria-label="Close modal" onClick={onClose}>
          &times;
        </button>

        {/* Back button for Detail View - Top Left */}
        {currentIndex !== null && (
          <button className="cert-back-top" onClick={handleBackToGrid} aria-label="Back to grid">
            <i className="material-icons">arrow_back</i>
          </button>
        )}

        <div className="cert-header">
          <h2>Professional Certificates</h2>
          {currentIndex === null && (
            <p className="cert-count">
              <span id="currentCert">{certificates.length}</span> certificates
            </p>
          )}
        </div>

        {/* Grid View */}
        <div
          className="cert-grid-container"
          style={{
            display: currentIndex === null ? 'block' : 'none',
            height: 'calc(100% - 100px)',
            overflow: 'auto',
            padding: '0 20px',
          }}
        >
          <div
            className="cert-grid"
            id="certGrid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '20px',
              padding: '20px 0',
            }}
          >
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="cert-card"
                data-id={cert.id}
                onClick={() => handleCertClick(cert.id)}
                style={{ animation: 'fadeIn 0.5s ease-out' }}
              >
                <div className="cert-card-image">
                  <img src={cert.thumb} alt={cert.title} loading="lazy" decoding="async" />
                  <div className="cert-card-overlay">
                    <i className="material-icons">visibility</i>
                    <span>View Certificate</span>
                  </div>
                </div>
                <div className="cert-card-content">
                  <h4>{cert.title}</h4>
                  <span className="cert-badge">{cert.category}</span>
                  {cert.linkedinUrl && (
                    <i
                      className="fab fa-linkedin cert-linkedin-icon"
                      title="Available on LinkedIn"
                    ></i>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail View */}
        {currentIndex !== null && currentCert && (
          <div
            className="cert-viewer"
            id="certViewer"
            style={{ display: 'flex' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <button
              className="cert-nav cert-prev"
              aria-label="Previous certificate"
              onClick={() => navigate(-1)}
            >
              <i className="material-icons">chevron_left</i>
            </button>

            <div className="cert-image-container">
              <img
                id="certImage"
                src={currentCert.image}
                alt={currentCert.title}
                loading="lazy"
                decoding="async"
                style={{
                  animation: 'fadeIn 0.3s ease-in-out',
                }}
              />
              <div className="cert-details">
                <h3 id="certTitle">{currentCert.title}</h3>
                <span className="cert-category" id="certCategory">
                  {currentCert.category}
                </span>
                <div className="cert-actions">
                  <a
                    id="viewFullBtn"
                    href={currentCert.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-small teal"
                  >
                    <i className="material-icons left">open_in_new</i>View Full Size
                  </a>
                  {currentCert.linkedinUrl && (
                    <a
                      id="linkedinBtn"
                      href={currentCert.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-small blue"
                    >
                      <i className="fab fa-linkedin left"></i>View on LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>

            <button
              className="cert-nav cert-next"
              aria-label="Next certificate"
              onClick={() => navigate(1)}
            >
              <i className="material-icons">chevron_right</i>
            </button>

            {/* Removed bottom Back button, moved to top */}
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .cert-modal-content.modern-theme {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .cert-card {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .cert-card:hover {
          transform: translateY(-8px) !important;
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(100, 255, 218, 0.5) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4) !important;
        }

        .cert-card-image {
          position: relative !important;
          padding-top: 60% !important;
          overflow: hidden !important;
          width: 100% !important;
          background: #1e1e1e !important;
        }

        .cert-card-image img {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          transition: transform 0.3s ease !important;
        }

        .cert-card:hover .cert-card-image img {
          transform: scale(1.1) !important;
        }

        .cert-card-content h4 {
          color: #e6f1ff !important;
          font-weight: 600 !important;
        }

        .cert-badge {
          background: linear-gradient(90deg, #64ffda 0%, #48bfe3 100%) !important;
          color: #0a192f !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 15px rgba(100, 255, 218, 0.3);
        }

        .cert-header h2 {
          background: linear-gradient(90deg, #64ffda 0%, #48bfe3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .cert-nav {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }

        .cert-nav:hover {
          background: rgba(100, 255, 218, 0.2) !important;
          border-color: #64ffda !important;
          color: #64ffda !important;
        }

        .cert-close {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }

        .cert-close:hover {
          background: rgba(255, 99, 71, 0.2) !important;
          border-color: #ff6347 !important;
          color: #ff6347 !important;
          transform: rotate(90deg);
        }

        .cert-back-top {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .cert-back-top:hover {
          background: rgba(100, 255, 218, 0.2);
          border-color: #64ffda;
          color: #64ffda;
          transform: translateX(-3px);
        }

        .input-field input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .cert-details {
          background: linear-gradient(to top, #0a192f 0%, rgba(10, 25, 47, 0.85) 70%, transparent 100%) !important;
          padding-bottom: 40px !important;
        }
      `}</style>
    </div>
  );
};

export default CertificatesModal;
