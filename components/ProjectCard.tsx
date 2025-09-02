interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card">
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
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
