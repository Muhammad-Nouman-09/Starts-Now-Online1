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

const defaultImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDyhf7RmcKs2M5QU4Ysv6-Opg-R0p8wkV0Im3BKxsyqMU57063AICAX6SbVFJ-po3iNSK7bk5nhHsHW-6P2PxqDlbnCuyY8baCG3UDLqQ8hJXo18jUv9az_aDVyulWnQf3zqA5PvEvJ74koYU_0Uiyvbyxv4733e19Q4G0UfFvyHvsNbfJrdkrR6GklxIMDNSEWH71XBbr70XhsbMZ0r2IPCwXfhPuF8FK8xWAlsboUSTNHTSh2f2Gpb3Vvvrvja21qOPMPezwx8WQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDJJLGVNlouflXDhA4BQyVYTzadYqMSgqKOoSNvC8qOyhnm8UV4IYisLbku1SXXrzFONFF9mF2gD5tD4Ztjpb_n_WU9Uq9d4UC8qZ8uvSbzVkn1SkiHj0G2YIMvdvhtlWZpG5p8ZjCNr2cHMvraMGmIkYMVw_kOed7rWO3h0Je_z_m8Igz1LU88TtQoMQ6gSAHgfvh8mFESqMuD3quXtAPwRBu51xeyxgIx7kXDn0-kFfdPLit8jJt2zHgns8O67A4vR0m8ePwnnz0",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuALl6xzN0aV3tl8MshT7jA2o6WK4_NILvJw6nJ3797PMZCw3mgnAbqyUCN2fdejiI7AKZJ66S8df67s5bXaBLK7sYKv_M-JZmIpsW5eOYQL28CCEKkjMSrep8xot5MRc87JCqKcQkY4Dr5tLgmn7h5QrzbwhGmUH3FAJuvJvCkQZnlrBQv6ruz16vJ_UeRpsaxrLP4Onb5Tx5G475E7SNE_vnTJby8vmBZaBWjhPgyxiyMSN1RgzG8qkPGwwNy50MJ1y5HQeOJH_CU",
];

export const blogHighlights = [...mockBlogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)
  .map((post, index) => ({
    image: defaultImages[index % defaultImages.length],
    badge: post.category.toUpperCase(),
    title: post.title,
    excerpt: post.excerpt,
    href: `/blog/${post.id}`,
  }));

export const allSearchableItems = [
  ...categories.map(c => ({ title: c.title, description: c.description, href: c.href, type: 'Category', icon: c.icon })),
  ...featuredTools.map(t => ({ title: t.title, description: t.description, href: t.href, type: 'Tool', icon: t.icon }))
];
