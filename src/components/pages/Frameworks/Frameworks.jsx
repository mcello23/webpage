import React from 'react';
import ParallaxSection from '../../Layout/ParallaxSection';

const Frameworks = () => {
  return (
    <ParallaxSection
      title="Frameworks"
      backgroundImage="/backgrounds/background2_coding.jpg"
    >
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img src="/images/react-logo.png" alt="React" />
                  <span className="card-title">React</span>
                </div>
                <div className="card-content">
                  <p>
                    React é uma biblioteca JavaScript para construção de interfaces de usuário.
                    É mantido pelo Facebook e uma comunidade de desenvolvedores individuais e empresas.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img src="/images/typescript-logo.png" alt="TypeScript" />
                  <span className="card-title">TypeScript</span>
                </div>
                <div className="card-content">
                  <p>
                    TypeScript é um superconjunto de JavaScript que adiciona tipagem estática 
                    e outros recursos de linguagens orientadas a objetos.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img src="/images/materialize-logo.png" alt="MaterializeCSS" />
                  <span className="card-title">MaterializeCSS</span>
                </div>
                <div className="card-content">
                  <p>
                    Um framework CSS responsivo baseado em Material Design do Google.
                    Combina os princípios clássicos do design com inovação e tecnologia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
};

export default Frameworks;
