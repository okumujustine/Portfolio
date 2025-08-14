import { CodeBlock } from '@/components/CodeBlock';
import Navigation from '@/components/Navigation';
import { getArticleBySlug, getArticleSlugs } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  let article;
  
  try {
    article = getArticleBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <>
      <Navigation />
      <div className="container">
        <Link href="/articles" className="back-link">← Back to Articles</Link>
        
        <header className="header">
          <h1>{article.title}</h1>
          <div className="date">{article.date}</div>
          <div className="tags">
            {article.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </header>

        <article className="article-content">
          <ReactMarkdown
            components={{
              code: CodeBlock
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>
      </div>
    </>
  );
}
