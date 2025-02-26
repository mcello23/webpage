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
    description: 'A recreation of Doom in Python using Pygame. This project was created following a tutorial by StanislavPetrovV to practice Python and game development concepts.',
    image: 'https://raw.githubusercontent.com/mcello23/DoomGamePython/master/screenshots/0.gif',
    technologies: ['Python', 'Pygame'],
    githubUrl: 'https://github.com/mcello23/DoomGamePython',
    downloadUrl: 'https://github.com/mcello23/DoomGamePython/archive/refs/heads/master.zip',
    videoUrl: 'https://youtu.be/ECqUrT7IdqQ',
    longDescription: 'As someone that worked with video games for more than 10 years (started as a media member, then a PR and finally a QA tester), It was always one of my goals to learn programming to create something. Even though I haven\'t reached an amazing programming level, I followed a tutorial provided by StanislavPetrovV. The objective here was to not only push a videogame program but to train and understand how powerful Python can be. The code autor is StanislavPetrovV, and this is merely a Python practice. The game runs in PyGame engine in a total of 12 py files. It features only one level with a bunch of enemies. The interesting was using Python logic to design enemy AI and gameplay mechanics. Once my gameplay was working, I\'ve added game assets, such as the character models, textures, and sounds. Python\'s logic controls the various elements of the game, such as the player character, enemies, and other objects. Finally, I\'ve tested and debugged the game to ensure it is functioning properly and is enjoyable to play.'
  }
];

const Projects: React.FC = () => {
  return (
    <div>
      <ParallaxSection 
        title="Side Projects" 
        backgroundImage="/backgrounds/background2_coding.jpg"
      >
        <div className="container">
          {projects.map((project, index) => (
            <div key={index} className="section">
              <div className="card">
                <div className="card-image">
                  <img src={project.image} alt={project.title} />
                  <span className="card-title">{project.title}</span>
                </div>
                <div className="card-content">
                  <p>{project.description}</p>
                  {project.longDescription && (
                    <p className="text-accent-2 waves-green left-align">{project.longDescription}</p>
                  )}
                  <div className="chips">
                    {project.technologies.map((tech, i) => (
                      <div key={i} className="chip">{tech}</div>
                    ))}
                  </div>
                </div>
                <div className="card-action">
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
          <img src="./backgrounds/background7_tetris.jpg" alt="Tetris background" />
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
