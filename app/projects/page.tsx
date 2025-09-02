import Navigation from '@/components/Navigation';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <>
      <Navigation />
      <div className="content-container">
        
        {projects.map((project, index) => (
          <div key={index} style={{ marginBottom: '2rem' }}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="cta-link">git clone</a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="cta-link">demo →</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
