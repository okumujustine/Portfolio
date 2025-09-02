'use client';

import Navigation from '@/components/Navigation';
import { projects } from '@/lib/projects';
import { useState, useEffect } from 'react';

export default function Projects() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoom = (imageSrc: string) => {
    setZoomedImage(imageSrc);
  };

  const closeZoom = () => {
    setZoomedImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && zoomedImage) {
        closeZoom();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [zoomedImage]);

  return (
    <>
      <Navigation />
      <div className="content-container">
        
        {projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-content">
              <h3>{project.title}</h3>
              <div className="project-description">
                <div className="project-image" onClick={() => openZoom(project.image)}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    loading="lazy"
                  />
                  <div className="zoom-overlay">
                    <span className="zoom-icon">🔍</span>
                  </div>
                </div>
                <div className="project-text">
                  <p>{project.description}</p>
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="cta-link">git</a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="cta-link">demo →</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {zoomedImage && (
        <div className="image-modal" onClick={closeZoom}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={zoomedImage} alt="Zoomed project" />
            <button className="close-button" onClick={closeZoom}>×</button>
          </div>
        </div>
      )}
    </>
  );
}
