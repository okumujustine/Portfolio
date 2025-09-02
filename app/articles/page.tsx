import Navigation from '@/components/Navigation';
import { getAllArticles } from '@/lib/data';
import Link from 'next/link';

export default function Articles() {
  const articles = getAllArticles();

  return (
    <>
      <Navigation />
      <div className="content-container">
        
        {articles.map((article) => (
          <div key={article.slug} style={{ marginBottom: '1.5rem' }}>
            <h3>
              <Link href={`/articles/${article.slug}`} className="cta-link" style={{ fontSize: '1.125rem', fontWeight: '600' }}>
                {article.title}
              </Link>
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
              {article.date}
            </p>
            <p>{article.excerpt}</p>
          </div>
        ))}
      </div>
    </>
  );
}
