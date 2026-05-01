"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Search, ChevronLeft, ChevronRight, ArrowRight,
  Wallet, Receipt, BarChart3, Brain,
  Bitcoin, Building2, Briefcase, Users,
  Star,
} from "lucide-react";
import { mockBlogPosts } from "@/constants";

/* ─── Static Data ────────────────────────────────────────────── */

const categories = [
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

const featuredTools = [
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

const blogHighlights = [...mockBlogPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3)
  .map((post, index) => ({
    image: defaultImages[index % defaultImages.length],
    badge: post.category.toUpperCase(),
    title: post.title,
    excerpt: post.excerpt,
    href: `/blog/${post.id}`,
  }));

const allSearchableItems = [
  ...categories.map(c => ({ title: c.title, description: c.description, href: c.href, type: 'Category', icon: c.icon })),
  ...featuredTools.map(t => ({ title: t.title, description: t.description, href: t.href, type: 'Tool', icon: t.icon }))
];

/* ─── Page Component ─────────────────────────────────────────── */

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const toolsScrollRef = useRef<HTMLDivElement>(null);

  const searchResults = allSearchableItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollTools = (direction: "left" | "right") => {
    if (toolsScrollRef.current) {
      toolsScrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Future: wire up to a search results page
    if (searchQuery.trim()) {
      console.log("Search:", searchQuery);
    }
  };

  return (
    <div className="flex flex-col">
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32">
        {/* Gradient blobs */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-emerald-800 blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-8xl mx-auto">
            Free Calculators, Converters & Smart Tools{" "}
            <span className="text-emerald-400">for Everyday Work</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Free Online Tools for Crypto, Freelancers, Business & Office Work. Calculate, convert, and solve real problems with fast, simple tools, all in one place.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative">
            <form
              onSubmit={handleSearch}
              className="flex flex-col sm:flex-row gap-3 p-2 bg-zinc-900/80 rounded-xl border border-zinc-800 shadow-2xl relative z-20"
            >
              <div className="flex-1 flex items-center px-4 gap-3">
                <Search className="w-5 h-5 text-zinc-600 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  placeholder="Search for tools (e.g. Portfolio Tracker, Invoice...)"
                  className="w-full bg-transparent border-none focus:outline-none text-white placeholder:text-zinc-600 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-400 hover:bg-emerald-300 text-zinc-950 px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors shrink-0"
              >
                Find Tool
              </button>
            </form>

            {/* Search Results Dropdown */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-30 max-h-[400px] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="flex flex-col">
                    {searchResults.map((result, idx) => (
                      <Link 
                        key={idx} 
                        href={result.href}
                        className="flex items-start gap-4 p-4 hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 last:border-0"
                      >
                        <div className="bg-emerald-400/10 p-2 rounded-lg text-emerald-400 shrink-0">
                          <result.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white">{result.title}</h4>
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                              {result.type}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-1">{result.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-zinc-500 text-sm">
                    No tools found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Category Showcase Grid ───────────────────────────── */}
      <section className="px-6 py-20 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Built for Every Professional
          </h2>
          <div className="h-1 w-20 bg-emerald-400 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="glass-card p-6 rounded-xl group hover:border-emerald-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {cat.title}
              </h3>
              <p className="text-zinc-400 text-base mb-6 leading-relaxed">
                {cat.description}
              </p>
              <Link
                href={cat.href}
                className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group/btn"
              >
                EXPLORE
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Power Tools ─────────────────────────────── */}
      <section className="bg-zinc-900/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                Featured Power Tools
              </h2>
              <p className="text-zinc-400">
                The most utilized instruments in our ecosystem.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => scrollTools("left")}
                className="p-3 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTools("right")}
                className="p-3 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div
            ref={toolsScrollRef}
            className="flex overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {featuredTools.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="min-w-[280px] sm:min-w-[300px] bg-zinc-950 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-all group shrink-0 snap-start"
              >
                <div className="flex justify-between items-start mb-6">
                  <tool.icon className="w-6 h-6 text-emerald-400" />
                  <div className="flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded text-emerald-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-emerald-400" />
                    {tool.rating}
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
                  {tool.title}
                </h4>
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-600">
                  <span>{tool.users} USERS</span>
                  <span className="text-emerald-400">{tool.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest from our Blog ─────────────────────────────── */}
      <section className="px-6 py-20 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Latest from our Blog
          </h2>
          <Link
            href="/blog"
            className="text-emerald-400 text-xs font-bold uppercase tracking-widest border-b border-emerald-400 pb-0.5 hover:text-emerald-300 hover:border-emerald-300 transition-colors"
          >
            VIEW ALL POSTS
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogHighlights.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="flex flex-col group cursor-pointer"
            >
              <div className="aspect-video overflow-hidden rounded-xl mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
                {post.badge}
              </span>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-zinc-400 text-base line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────── */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto bg-emerald-400 text-zinc-950 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, #000 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
              Ready to optimize your productivity?
            </h2>
            <p className="text-lg md:text-xl mb-10 opacity-90 font-medium max-w-2xl mx-auto">
              Join 50,000+ power users using Starts Now to dominate their
              respective markets. Get started for free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="bg-zinc-950 text-emerald-400 px-10 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all active:scale-95 text-center"
              >
                Get Started for Free
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent border-2 border-zinc-950 text-zinc-950 px-10 py-4 rounded-xl font-bold text-lg hover:bg-zinc-950/10 transition-all text-center"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
