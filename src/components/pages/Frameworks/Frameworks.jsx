import React, { useEffect } from 'react';
import M from 'materialize-css';

const Frameworks = () => {
  useEffect(() => {
    // Inicializa os componentes do Materialize
    M.AutoInit();
    
    const elems = document.querySelectorAll('.parallax');
    M.Parallax.init(elems);
  }, []);

  return (
    <div>
      {/* Banner com parallax */}
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <h2 className="header center teal-text text-lighten-5">Frameworks</h2>
            <div className="row center">
              <a href="/" className="btn-large waves-effect waves-light teal lighten-1 pad">Voltar para Home</a>
            </div>
            <h3 className="header center teal-text text-lighten-5">Marcelo Costa</h3>
          </div>
        </div>
        <div className="parallax">
          <img src={`${process.env.PUBLIC_URL}/backgrounds/background5_rams.jpg`} alt="Background" />
        </div>
      </div>

      {/* Conteúdo da página */}
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col s12">
              <h4 className="center">Frameworks de Automação</h4>
              <p className="center">Esta página mostra diferentes frameworks de automação de testes.</p>
            </div>
          </div>
          
          {/* Cypress */}
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Amazon Automation com Cypress</span>
                  <p>Teste automatizado da Amazon usando Cypress</p>
                </div>
                <div className="card-action">
                  <a href="https://github.com/mcello23/cypress-amazon">Ver no GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* Cucumber & Appium */}
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Android Automation com Cucumber e Appium</span>
                  <p>Teste automatizado para Android usando Cucumber, Appium e Ruby</p>
                </div>
                <div className="card-action">
                  <a href="https://github.com/mcello23/android_automation">Ver no GitHub</a>
                </div>
              </div>
            </div>
          </div>

          {/* Selenium */}
          <div className="row">
            <div className="col s12">
              <div className="card">
                <div className="card-content">
                  <span className="card-title">Quix Automation com Selenium</span>
                  <p>Teste automatizado para o site Quix usando Selenium</p>
                </div>
                <div className="card-action">
                  <a href="https://github.com/mcello23/Quix_Testing">Ver no GitHub</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer simplificado */}
      <footer className="page-footer teal">
        <div className="container">
          <div className="row center">
            <h5 className="white-text">Thanks for the visit! ☺</h5>
            <p className="grey-text text-lighten-4">
              Feel free to send me an e-mail or connect with me on social media.
            </p>
            <p>Marcelo Costa</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Frameworks;
