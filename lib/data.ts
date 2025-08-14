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
    title: "FinTech Payment Gateway",
    description: "Built a high-performance payment processing system handling $10M+ monthly transactions with 99.99% uptime. Features real-time fraud detection, multi-currency support, and PCI DSS compliance.",
    tech: ["Node.js", "PostgreSQL", "Redis", "AWS Lambda", "Stripe"],
    github: "https://github.com/okumujustine/fintech-gateway",
    demo: "https://fintech-gateway-demo.vercel.app"
  },
  {
    title: "E-Learning Platform",
    description: "Scalable learning management system serving 50K+ students with video streaming, real-time collaboration, and AI-powered content recommendations. Built with microservices architecture.",
    tech: ["Next.js", "TypeScript", "Python", "Django", "PostgreSQL"],
    github: "https://github.com/okumujustine/elearning-platform",
    demo: "https://elearning-demo.vercel.app"
  },
  {
    title: "Real-time Analytics Dashboard",
    description: "Enterprise analytics platform processing 1B+ events daily with sub-second query performance. Features custom visualization engine and real-time data streaming capabilities.",
    tech: ["React", "D3.js", "Apache Kafka", "ClickHouse", "Docker"],
    github: "https://github.com/okumujustine/analytics-dashboard",
    demo: "https://analytics-demo.vercel.app"
  },
  {
    title: "Distributed Task Scheduler",
    description: "Open-source task scheduling system with auto-scaling, retry mechanisms, and monitoring. Used by 100+ companies for background job processing and workflow automation.",
    tech: ["Python", "Redis", "Kubernetes", "Prometheus", "React"],
    github: "https://github.com/okumujustine/task-scheduler"
  }
];

export const profile = {
  name: "Justine Okumu",
  title: "Senior Software Developer & Technical Lead",
  bio: "I build scalable web applications that millions of users love. From concept to deployment, I craft elegant solutions using modern technologies. Passionate about clean code, system architecture, and sharing knowledge through writing and mentoring.",
  email: "okumu.justine2017@gmail.com",
  github: "https://github.com/okumujustine",
  linkedin: "https://linkedin.com/in/okumujustine",
  twitter: "https://twitter.com/okumujustine",
  skills: [
    "Node.js", "TypeScript", "React", "Next.js", 
    "Python", "Django", "PostgreSQL", "MongoDB", 
    "AWS", "Docker", "Kubernetes", "Redis",
    "System Design", "Microservices", "API Development"
  ],
  achievements: [
    "Led development of applications serving 1M+ users",
    "Reduced API response times by 60% through optimization",
    "Mentored 15+ junior developers",
    "Open source contributor with 500+ GitHub stars"
  ]
};
