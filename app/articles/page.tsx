import Navigation from '@/components/Navigation';
import { getAllArticles } from '@/lib/data';
import Link from 'next/link';

export default function Articles() {
  const articles = getAllArticles();

  return (
    <>
      <Navigation />
      <div className="container">
        <h1>Articles</h1>
        <p>Technical articles and insights from my development experience.</p>
        
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article.slug} className="card">
              <h3>
                <Link href={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>
              <div className="date">{article.date}</div>
              <p className="excerpt">{article.excerpt}</p>
              
              {article.tags && article.tags.length > 0 && (
                <div className="tags">
                  {article.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
