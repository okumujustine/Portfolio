import Navigation from '@/components/Navigation';
import { profile } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  
  return (
    <>
      <Navigation />
      
      <div className="simple-container">
        <h1>{profile.name}</h1>
        
        <p>{profile.bio}</p>
        
        <p>Most of my work is open source and publicly available on <a href={profile.github} target="_blank" rel="noopener noreferrer" className="cta-link">GitHub</a>. You can reach me via <a href={`mailto:${profile.email}`} className="cta-link cta-special">email</a> or connect with me on <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
        
        <p>You can also browse my <Link href="/projects" className="cta-link">projects</Link> and read my <Link href="/articles" className="cta-link">articles</Link> on software development.</p>
        
        <div className="skills-section">
          <p className="code-prompt">$ tech --list</p>
          <div className="skills-tags">
            {["Python", "TypeScript", "Java", "Terraform", "AWS", "Kubernetes", "Docker", "GoLang"].map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
