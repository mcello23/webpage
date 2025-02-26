import React from 'react';
import ParallaxSection from '../../Layout/ParallaxSection';
import './Projects.styles.css';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  downloadUrl?: string;
  videoUrl?: string;
  longDescription?: string;
  isComingSoon?: boolean;
  headerTitle?: string;
  headerSubtitle?: string;
  backgroundImage?: string;
}

const projects: Project[] = [
  {
    id: 'doom-python',
    title: 'Doom Game in Python',
    description: 'A recreation of Doom in Python using Pygame. This project demonstrates 3D rendering techniques using raycasting and game development concepts.',
    image: 'https://raw.githubusercontent.com/mcello23/DoomGamePython/master/screenshots/0.gif',
    technologies: ['Python', 'Pygame', 'Raycasting', 'Game Development'],
    githubUrl: 'https://github.com/mcello23/DoomGamePython',
    downloadUrl: 'https://github.com/mcello23/DoomGamePython/archive/refs/heads/master.zip',
    videoUrl: 'https://youtu.be/ECqUrT7IdqQ',
    longDescription: 'This project was inspired by the classic game Doom and serves as a practical exercise in Python and game development. It utilizes the Pygame library to implement a raycasting engine, creating a pseudo-3D environment. The game features a single level populated with enemies and demonstrates fundamental concepts such as collision detection, AI, and basic game mechanics.',
    headerTitle: 'Game Projects',
    backgroundImage: '/backgrounds/background10_snes_controller.jpg'
  },
  {
    id: 'tetris-python',
    title: 'Tetris in Python',
    description: 'A classic Tetris game implementation using Python and Pygame.',
    image: '/backgrounds/background7_tetris.jpg',
    technologies: ['Python', 'Pygame', 'Game Development'],
    githubUrl: 'https://github.com/mcello23/Tetris',
    isComingSoon: true,
    headerTitle: 'Tetris in',
    headerSubtitle: 'Python',
    backgroundImage: '/backgrounds/background7_tetris.jpg'
  }
];

const ProjectCard: React.FC<{project: Project}> = ({ project }) => {
  if (project.isComingSoon) {
    return (
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
    );
  }

  return (
    <div className="container">
      <div className="center-align">
        <h4 className="mdi-content-send dark center-align">
          <b>Creating a game called {project.title}</b>
        </h4>
      </div>
      
      <div className="section">
        <div className="card project-card">
          <div className="card-image">
            <img 
              src={project.image} 
              alt={project.title} 
              className="responsive-img project-image"
            />
            <span className="card-title project-title">
              {project.title}
            </span>
          </div>
          <div className="card-content">
            <p className="center-align">{project.description}</p>
            {project.longDescription && (
              <>
                <h4 className="mdi-content-send dark left-align"><b>How it works?</b></h4>
                <p className="text-accent-2 waves-green left-align">{project.longDescription}</p>
              </>
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
              <i className="material-icons left">code</i>
              GitHub
            </a>
            {project.demoUrl && (
              <a 
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn waves-effect waves-light teal"
              >
                <i className="material-icons left">visibility</i>
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
                <i className="material-icons left">download</i>
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
                <i className="material-icons left">play_circle_filled</i>
                Video Tutorial
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <div className="projects-page">
      {projects.map((project, index) => (
        <ParallaxSection 
          key={project.id}
          title={project.headerTitle || ""}
          subtitle={project.headerSubtitle}
          backgroundImage={project.backgroundImage || "/backgrounds/background1.jpg"}
        >
          <ProjectCard project={project} />
        </ParallaxSection>
      ))}
    </div>
  );
};

export default Projects;