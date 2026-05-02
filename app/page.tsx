import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSearch from "@/components/HeroSearch";
import FeaturedToolsCarousel from "@/components/FeaturedToolsCarousel";
import { categories, blogHighlights } from "@/components/HomeData";

/* ─── Page Component ─────────────────────────────────────────── */

export default function HomePage() {

  return (
    <div className="flex min-h-full flex-col w-full">
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="relative px-6 py-20 md:py-32 w-full min-h-[520px] contain-layout">
        {/* Gradient blobs replaced with lighter radial background for better LCP */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 10% 10%, rgba(52, 211, 153, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(6, 95, 70, 0.15) 0%, transparent 40%)'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center min-h-[360px] md:min-h-[336px] flex flex-col justify-start">
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-8xl mx-auto">
            Free Calculators, Converters & Smart Tools{" "}
            <span className="text-emerald-400">for Everyday Work</span>
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Free Online Tools for Crypto, Freelancers, Business & Office Work. Calculate, convert, and solve real problems with fast, simple tools, all in one place.
          </p>

          <HeroSearch />
        </div>
      </section>

      {/* ── Category Showcase Grid ───────────────────────────── */}
      <section className="px-6 py-20 max-w-7xl mx-auto w-full min-h-[556px] contain-layout">
        <div className="mb-12 min-h-[76px]">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Built for Every Professional
          </h2>
          <div className="h-1 w-20 bg-emerald-400 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="glass-card p-6 rounded-xl group hover:border-emerald-500/50 transition-all min-h-[292px] h-full flex flex-col"
            >
              <div className="w-12 h-12 bg-emerald-400/10 rounded-lg flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                <cat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3">
                {cat.title}
              </h3>
              <p className="text-zinc-400 text-base mb-6 leading-relaxed flex-grow min-h-[96px]">
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
      <section className="bg-zinc-900/30 py-20 w-full min-h-[500px] contain-layout">
        <div className="max-w-7xl mx-auto px-6 min-h-[340px]">
          <FeaturedToolsCarousel />
        </div>
      </section>

      {/* ── Latest from our Blog ─────────────────────────── */}
      <section className="px-6 py-20 max-w-7xl mx-auto w-full min-h-[604px] contain-layout">
        <div className="flex justify-between items-center mb-12 min-h-[40px]">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {blogHighlights.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="glass-card p-6 rounded-xl flex flex-col group hover:border-emerald-500/50 transition-all cursor-pointer min-h-[280px]"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3 h-4">
                {post.category}
              </span>
              <h3 className="text-lg md:text-xl font-semibold mb-3 group-hover:text-emerald-400 transition-colors leading-tight min-h-[56px]">
                {post.title}
              </h3>
              <p className="text-zinc-400 text-sm line-clamp-2 leading-relaxed flex-grow mb-4 min-h-[40px]">
                {post.excerpt}
              </p>
              <div className="text-xs text-zinc-300 h-4">{post.date}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA Section ──────────────────────────────────────── */}
      <section className="px-6 py-24 min-h-[492px]">
        <div className="max-w-5xl mx-auto bg-emerald-400 text-zinc-950 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden min-h-[300px]">
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

HomePage.displayName = 'HomePage';
