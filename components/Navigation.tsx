import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Justine Okumu
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/articles">Articles</Link>
        </div>
      </div>
    </nav>
  );
}
