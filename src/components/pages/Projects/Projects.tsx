import React, { useEffect } from 'react';
import $ from 'jquery';
import ParallaxSection from '../../Layout/ParallaxSection';

declare global {
  interface Window {
    M: any;
    juicebox: any;
  }
}

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  downloadUrl?: string;
  videoUrl?: string;
  longDescription?: string;
}

const projects: Project[] = [
  {
    title: 'Doom Game in Python',
    description: 'A recreation of Doom in Python using Pygame. This project demonstrates 3D rendering techniques using raycasting and game development concepts.',
    image: 'https://raw.githubusercontent.com/mcello23/DoomGamePython/master/screenshots/0.gif',
    technologies: ['Python', 'Pygame', 'Raycasting', 'Game Development'],
    githubUrl: 'https://github.com/mcello23/DoomGamePython',
    downloadUrl: 'https://github.com/mcello23/DoomGamePython/archive/refs/heads/master.zip',
    videoUrl: 'https://youtu.be/ECqUrT7IdqQ',
    longDescription: 'This project was inspired by the classic game Doom and serves as a practical exercise in Python and game development. It utilizes the Pygame library to implement a raycasting engine, creating a pseudo-3D environment. The game features a single level populated with enemies and demonstrates fundamental concepts such as collision detection, AI, and basic game mechanics.',
  }
];

const Projects: React.FC = () => {
  
  // Inicializar componentes Materialize quando o componente montar
  useEffect(() => {
    // Carregar script do Materialize se necessário
    if (typeof window.M !== 'undefined') {
      const elems = document.querySelectorAll('.modal');
      window.M.Modal.init(elems);

      const parallaxElems = document.querySelectorAll('.parallax');
      window.M.Parallax.init(parallaxElems);
    }
  }, []);

  // Inicializar Juicebox
  useEffect(() => {
    // Verificar se o Juicebox script está disponível
    if (typeof window.juicebox !== 'undefined') {
      const juiceboxConfig = {
        scaleToFit: false,
        enableKeyboardControls: true,
        showOpenButton: true,
      };

      new window.juicebox({
        containerId: 'juicebox-container',
        galleryWidth: '1280',
        galleryHeight: '720',
        backgroundColor: '#222222',
      }, juiceboxConfig);
    }
  }, []);

  // Função para download
  const downloadFile = () => {
    window.open("https://github.com/mcello23/DoomGamePython/archive/refs/heads/master.zip");
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <ul className="right hide-on-med-and-down">
            <li><a href="https://mcello23.github.io/webpage/" className="material-icons house-logo"><i className="material-icons">home</i></a></li>
            <li><a href="https://github.com/mcello23" aria-label="github-link"><i className="material-icons fab fa-github"></i></a></li>
            <li><a href="https://www.linkedin.com/in/marceloc/" aria-label="linkedin-link"><i className="material-icons fab fa-linkedin"></i></a></li>
            <li><a href="mailto:marceloadsc@gmail.com?subject=Hello&body=Hi%2C%20how%20are%20you%3F" aria-label="email-link"><i className="material-icons">mail_outline</i></a></li>
          </ul>
        </div>
      </nav>
      
      <div id="index-banner" className="parallax-container">
        <div className="section no-pad-bot">
          <div className="container">
            <br /><br />
            <h2 className="header center teal-text text-lighten-5">Portfolio</h2>
            <div className="row center hide-on-med-and-down">
              <a href="frameworks.html" id="download-button1" className="btn-large waves-effect waves-light teal lighten-1 pad">Frameworks</a>
              <a href="side_proj.html" id="download-button2" className="btn-large waves-effect waves-light teal lighten-1 pad">Side Projects</a>
              <a href="#modal1" id="download-button3" className="btn-large waves-effect waves-light teal lighten-1 pad modal-trigger">Certificates</a>
            </div>
            <h3 className="header center-align teal-text text-lighten-5">Marcelo Costa</h3>
          </div>
        </div>
        <div className="parallax"><img src="./backgrounds/background10_snes_controller.jpg" alt="Unsplashed background img 1" /></div>
      </div>
      
      <div className="container"><br />
        <div className="section">
          <div className="row">
            <div className="center-align">
              <h4 className="mdi-content-send dark center-align"><b>Creating a game called Doom in... Python!</b></h4><br />
              {/* Profile image */}
              <img className="left-aligned image-desc-doom" src="https://raw.githubusercontent.com/mcello23/DoomGamePython/master/screenshots/0.gif" alt="personal-picture" />
              <p className="text-accent-2 waves-green left-align">As someone that worked with video games for more than 10 years (started as a media member, then a PR and finally a QA tester), It was always
                one of my goals to learn programming to create something. Even though I haven't reached an amazing programming level, I followed a tutorial provided by StanislavPetrovV.
                The objective here was to not only push a videogame program but to train and understand how powerful Python can be. The code autor is StanislavPetrovV, and this is merely
                a Python practice. Down here I explain how the game functions as it was built.</p>
              <h4 className="mdi-content-send dark left-align"><b>How it works?</b></h4>
              <p className="text-accent-2 waves-green left-align">The game runs in PyGame engine in a total of 12 py files. It features only one level with a bunch of enemies. The interesting was using Python logic to
                design enemy AI and gameplay mechanics. Once my gameplay was working, I've added game assets, such as the character models, textures, and sounds.
                Python's logic controls the various elements of the game, such as the player character, enemies, and other objects. Finally, I've tested and debugged the game to ensure it is functioning properly and is enjoyable to play.
              </p><br /><br /><br /><br /><br />
              <div className="row center">
                <a id="download-button4" className="btn-large waves-effect waves-light teal lighten-1 left-align" onClick={downloadFile}>Download the Doom game</a>
                <a href="https://github.com/mcello23/DoomGamePython" id="download-button5" className="btn-large waves-effect waves-light teal lighten-1 pad center-align">Check out my GitHub project</a>
                <a href="https://youtu.be/ECqUrT7IdqQ" id="download-button6" className="btn-large waves-effect waves-light teal lighten-1 pad right-align">Video Tutorial</a><br /><br /><br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="modal1" className="modal">
        <div className="modal-content">
          <div id="juicebox-container" className="juicebox-container"></div>
        </div>
      </div>
      
      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h1 className="header col s12 dark center-align">Tetris in</h1>
              <h2 className="header col s12 dark center-align">Python</h2>
            </div>
          </div>
        </div>
        <div className="parallax"><img src="./backgrounds/background7_tetris.jpg" alt="Unsplashed background img 2" /></div>
      </div>
      
      <div className="container"><br />
        <div className="section">
          <div className="row">
            <div className="center-align">
              <h4 className="mdi-content-send dark center-align"><b>Coming soon!</b></h4>
            </div>
          </div>
        </div>
      </div>
      
      <div className="section no-pad-bot">
        <div className="container">
          <div className="row center">
            <h5 className="header col s12 dark">Thanks for the visit! ☺</h5>
            <p>Feel free to send me an e-mail or connect with me in any social media on top.</p>
            <p>Marcelo Costa</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
