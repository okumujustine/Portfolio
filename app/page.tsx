import Navigation from '@/components/Navigation';
import { profile } from '@/lib/data';

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="container">
        <div className="home-intro">
          <h1>{profile.name}</h1>
          <h2>{profile.title}</h2>
          <p>{profile.bio}</p>
          <p><strong>7+ years</strong> of software development experience</p>
          
          <div className="tags" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <span className="tag">Python</span>
            <span className="tag">Java</span>
            <span className="tag">TypeScript</span>
            <span className="tag">JavaScript</span>
          </div>
        </div>
        
        <div className="contact">
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </>
  );
}
