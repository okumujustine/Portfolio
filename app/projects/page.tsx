import Navigation from '@/components/Navigation';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Projects</h1>
        <p>Here are some of the projects I&apos;ve worked on.</p>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              <div className="tags">
                {project.tech.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
              
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
