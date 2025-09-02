import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

const articlesDirectory = path.join(process.cwd(), 'articles');
export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export function getArticleSlugs(): string[] {
  return fs.readdirSync(articlesDirectory).filter(name => name.endsWith('.md'));
}

export function getArticleBySlug(slug: string): Article {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: data.tags || [],
    content,
  };
}

export function getAllArticles(): Article[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  
  return articles;
}


