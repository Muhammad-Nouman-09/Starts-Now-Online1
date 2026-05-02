import {
  Wallet, Receipt, BarChart3, Brain,
  Bitcoin, Building2, Briefcase, Users,
} from "lucide-react";
import { mockBlogPosts } from "@/constants";

export const categories = [
  {
    title: "Crypto Tools",
    description: "Advanced portfolio trackers, profit calculators, and market sentiment analysis.",
    icon: Bitcoin,
    href: "/calculator",
  },
  {
    title: "Office Tools",
    description: "Streamline corporate tasks with document automations and productivity suites.",
    icon: Building2,
    href: "#",
  },
  {
    title: "Business Tools",
    description: "Professional analytics, CRM modules, and high-performance lead trackers.",
    icon: Briefcase,
    href: "#",
  },
  {
    title: "Freelancer Tools",
    description: "Smart invoicing, project timers, and contract management for solo power users.",
    icon: Users,
    href: "#",
  },
];

export const featuredTools = [
  {
    title: "Profit Calculator",
    description: "Real-time multi-asset profit and loss simulator with tax implications.",
    icon: Wallet,
    rating: 4.9,
    users: "12.5k",
    category: "CRYPTO",
    href: "/calculator",
  },
  {
    title: "Invoice Generator",
    description: "Professional, tax-compliant invoice builder for international freelancers.",
    icon: Receipt,
    rating: 4.8,
    users: "8.2k",
    category: "FREELANCE",
    href: "#",
  },
  {
    title: "Portfolio Tracker",
    description: "Unified dashboard for crypto, stocks, and alternative high-yield assets.",
    icon: BarChart3,
    rating: 5.0,
    users: "21.4k",
    category: "CRYPTO",
    href: "/market",
  },
  {
    title: "Market Intelligence",
    description: "AI-driven market insights and sentiment scoring for global businesses.",
    icon: Brain,
    rating: 4.7,
    users: "5.9k",
    category: "BUSINESS",
    href: "/blog",
  },
];

export const blogHighlights = [...mockBlogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)
  .map((post) => ({
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    href: `/blog/${post.id}`,
  }));

export const allSearchableItems = [
  ...categories.map(c => ({ title: c.title, description: c.description, href: c.href, type: 'Category', icon: c.icon })),
  ...featuredTools.map(t => ({ title: t.title, description: t.description, href: t.href, type: 'Tool', icon: t.icon }))
];
