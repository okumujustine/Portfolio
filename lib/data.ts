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
    title: "Enterprise FinTech Payment Gateway",
    description: "Led the architecture and development of a high-performance payment processing system handling $50M+ monthly transactions with 99.99% uptime. Features real-time fraud detection, multi-currency support, PCI DSS compliance, and horizontal auto-scaling. Reduced transaction processing time by 65% and achieved SOC 2 Type II certification.",
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS Lambda", "Kubernetes", "Stripe API", "Apache Kafka"],
    github: "https://github.com/okumujustine/fintech-gateway",
    demo: "https://fintech-gateway-demo.vercel.app"
  },
  {
    title: "AI-Powered Learning Platform",
    description: "Architected and led a team of 12 engineers to build a scalable LMS serving 100K+ students across 50+ countries. Features include adaptive learning algorithms, real-time video streaming with 4K support, collaborative whiteboards, and ML-driven content personalization. Achieved 40% improvement in student engagement and 25% better completion rates.",
    tech: ["Next.js", "TypeScript", "Python", "TensorFlow", "Django", "PostgreSQL", "Redis", "AWS", "Docker"],
    github: "https://github.com/okumujustine/elearning-platform",
    demo: "https://elearning-demo.vercel.app"
  },
  {
    title: "Real-time Analytics & Intelligence Platform",
    description: "Built an enterprise-grade analytics platform processing 5B+ events daily with sub-200ms query performance. Led the migration from monolithic to microservices architecture, implemented custom data visualization engine, and established real-time data pipelines. Platform now powers business intelligence for Fortune 500 clients with 99.9% SLA.",
    tech: ["React", "TypeScript", "D3.js", "Apache Kafka", "ClickHouse", "Kubernetes", "Grafana", "Terraform"],
    github: "https://github.com/okumujustine/analytics-dashboard",
    demo: "https://analytics-demo.vercel.app"
  },
  {
    title: "Open-Source Distributed Task Orchestrator",
    description: "Created and maintain a cloud-native task scheduling system with intelligent auto-scaling, circuit breakers, and advanced monitoring. Adopted by 500+ companies worldwide for mission-critical workflow automation. Features include dynamic resource allocation, failure recovery, and comprehensive audit trails. Active community of 50+ contributors.",
    tech: ["Go", "Python", "Kubernetes", "Redis", "Prometheus", "React", "gRPC", "Helm"],
    github: "https://github.com/okumujustine/task-scheduler"
  }
];

export const profile = {
  name: "Justine Okumu",
  title: "Senior Technical Leader & Software Architect",
  bio: "I architect and build scalable enterprise systems that handle millions of users and billions of transactions. With 7+ years of experience leading high-performing engineering teams, I specialize in transforming complex business challenges into elegant technical solutions. Expert in distributed systems, microservices architecture, and driving engineering excellence through mentorship and best practices.",
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
