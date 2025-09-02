import Link from 'next/link';

interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="card">
      <div className="date">{article.date}</div>
      <h3>
        <Link href={`/articles/${article.slug}`}>
          {article.title}
        </Link>
      </h3>
      <p className="excerpt">{article.excerpt}</p>
      
      {article.tags && article.tags.length > 0 && (
        <div className="tags">
          {article.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}
