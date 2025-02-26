import React, { useEffect } from 'react';

const CertificatesModal = () => {
  useEffect(() => {
    // Inicializar Juicebox quando o componente montar
    if (window.juicebox) {
      const juiceboxConfig = {
        scaleToFit: false,
        enableKeyboardControls: true,
        showOpenButton: true,
      };

      new window.juicebox({
        containerId: "juicebox-container",
        galleryWidth: "1280",
        galleryHeight: "720",
        backgroundColor: "#222222",
      }, juiceboxConfig);
    }
  }, []);

  return (
    <div id="modal1" className="modal">
      <div className="modal-content">
        <div id="juicebox-container" className="juicebox-container"></div>
      </div>
    </div>
  );
};

export default CertificatesModal;
