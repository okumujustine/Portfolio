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

export const projects = [
  {
    title: "QueryCraft",
    description: "A modern desktop application for building, running, and managing database queries and integrations. Currently supports PostgreSQL with an intuitive interface for database management and query execution.",
    tech: ["TypeScript", "Electron", "PostgreSQL", "JavaScript", "CSS", "Shell"],
    github: "https://github.com/okumujustine/QueryCraft"
  },
  {
    title: "AskImmigrate2.0",
    description: "A session-aware multi-agent immigration assistant powered by AI. Features conversation memory, multi-agent coordination, and intelligent context management for complex immigration questions.",
    tech: ["Python", "TypeScript", "Multi-Agent AI", "Vector Database", "Session Management", "FastAPI", "React"],
    github: "https://github.com/okumujustine/AskImmigrate2.0",
    demo: "https://app.readytensor.ai/publications/ask-immigration20-pro-nR1NDUGzNDAd"
  }
];

export const profile = {
  name: "Justine Okumu",
  title: "Senior Software Engineer",
  bio: "I architect and build scalable enterprise systems that handle millions of users and millions of transactions. With 7+ years of experience leading high-performing engineering teams, I specialize in transforming complex business challenges into elegant technical solutions. Expert in distributed systems, microservices architecture, and driving engineering excellence through mentorship and best practices.",
  email: "okumu.justine2017@gmail.com",
  github: "https://github.com/okumujustine",
  linkedin: "https://linkedin.com/in/okumujustine",
  twitter: "https://twitter.com/okumujustine",
  skills: [
    "Technical Leadership", "Software Architecture", "System Design",
    "Node.js", "TypeScript", "Python", "Java", "React", "Next.js", 
    "Django", "Spring Boot", "PostgreSQL", "MongoDB", "Redis", 
    "AWS", "Azure", "Docker", "Kubernetes", "Terraform",
    "Microservices", "API Design", "DevOps", "CI/CD",
    "Team Management", "Code Reviews", "Technical Mentoring"
  ],
  achievements: [
    "Led engineering teams of 15+ developers across multiple products",
    "Architected systems processing $50M+ in annual revenue",
    "Reduced infrastructure costs by 40% through optimization and cloud migration",
    "Improved deployment frequency from monthly to daily releases",
    "Mentored 25+ engineers, with 80% receiving promotions",
    "Speaker at 5+ technical conferences on scalability and leadership",
    "Open source contributor with 2K+ GitHub stars and 500+ forks"
  ]
};
