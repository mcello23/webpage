import React, { useEffect } from 'react';
import M from 'materialize-css';

interface ParallaxSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  children?: React.ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  children 
}) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.parallax');
    M.Parallax.init(elements);
  }, []);

  return (
    <div className="parallax-section">
      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h2 className="header col s12 dwhite-text">{title}</h2>
              {subtitle && <h3 className="header col s12 white-text">{subtitle}</h3>}
            </div>
          </div>
        </div>
        <div className="parallax">
          <img src={backgroundImage} alt="Parallax background" />
        </div>
      </div>
      {children}
    </div>
  );
};

export default ParallaxSection;