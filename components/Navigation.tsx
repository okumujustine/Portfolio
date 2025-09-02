import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-links">
          <Link href="/" className="nav-link">~/home</Link>
          <Link href="/projects" className="nav-link">~/projects</Link>
          <Link href="/articles" className="nav-link">~/articles</Link>
        </div>
      </div>
    </nav>
  );
}
