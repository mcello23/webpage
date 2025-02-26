import React from 'react';
import ParallaxSection from '../../Layout/ParallaxSection';

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
    title: 'Portfolio Website',
    description: 'Personal portfolio website built with React, TypeScript and MaterializeCSS. Features responsive design and modern web development practices.',
    image: '/backgrounds/background2_coding.jpg',
    technologies: ['React', 'TypeScript', 'MaterializeCSS', 'CSS3'],
    githubUrl: 'https://github.com/mcello23/webpage',
    demoUrl: 'https://mcello23.github.io/webpage/'
  },
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
  return (
    <div>
      <ParallaxSection 
        title="Game Projects" 
        backgroundImage="/backgrounds/background10_snes_controller.jpg"
      >
        <div className="container">
          <div className="center-align">
            <h4 className="mdi-content-send dark center-align">
              <b>Creating a game called Doom in... Python!</b>
            </h4>
          </div>
          
          {projects.map((project, index) => (
            <div key={index} className="section">
              <div className="card">
                <div className="card-image">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="responsive-img center-block"
                    style={{maxHeight: "400px", margin: "0 auto", display: "block"}}
                  />
                  <span className="card-title center-align" style={{width: "100%", background: "rgba(0,0,0,0.5)"}}>
                    {project.title}
                  </span>
                </div>
                <div className="card-content">
                  <p className="center-align">{project.description}</p>
                  <h4 className="mdi-content-send dark left-align"><b>How it works?</b></h4>
                  {project.longDescription && (
                    <p className="text-accent-2 waves-green left-align">{project.longDescription}</p>
                  )}
                  <div className="chips center-align">
                    {project.technologies.map((tech, i) => (
                      <div key={i} className="chip">{tech}</div>
                    ))}
                  </div>
                </div>
                <div className="card-action center-align">
                  <a 
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn waves-effect waves-light teal"
                  >
                    GitHub
                  </a>
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn waves-effect waves-light teal"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.downloadUrl && (
                    <a 
                      href={project.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn waves-effect waves-light teal"
                    >
                      Download
                    </a>
                  )}
                  {project.videoUrl && (
                    <a 
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn waves-effect waves-light teal"
                    >
                      Video Tutorial
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ParallaxSection>

      {/* Tetris Project Section */}
      <div className="parallax-container valign-wrapper">
        <div className="section no-pad-bot">
          <div className="container">
            <div className="row center">
              <h1 className="header col s12 dark center-align">Tetris in</h1>
              <h2 className="header col s12 dark center-align">Python</h2>
            </div>
          </div>
        </div>
        <div className="parallax">
          <img src="/backgrounds/background7_tetris.jpg" alt="Tetris background" />
        </div>
      </div>
      
      <div className="container">
        <br />
        <div className="section">
          <div className="row">
            <div className="center-align">
              <h4 className="mdi-content-send dark center-align">
                <b>Coming soon!</b>
              </h4>
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
    </div>
  );
};

export default Projects;
