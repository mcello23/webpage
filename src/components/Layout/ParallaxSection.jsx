import React, { useEffect } from 'react';
import M from 'materialize-css';

interface ParallaxSectionProps {
  title: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ title, backgroundImage, children }) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.parallax');
    M.Parallax.init(elements);
  }, []);

  return (
    <div>
      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h2 className="header col s12 dark">{title}</h2>
            </div>
          </div>
        </div>
        <div className="parallax">
          <img src={backgroundImage} alt="Background" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ParallaxSection;