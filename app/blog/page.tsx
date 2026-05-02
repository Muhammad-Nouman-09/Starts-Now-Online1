"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { BookOpen, ArrowRight, ChevronRight, ChevronLeft, Hash, Zap } from "lucide-react";
import Link from "next/link";
import { mockBlogPosts } from "@/constants";
import AdPlacement from "@/components/AdPlacement";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Intelligence");
  const sectorsRef = useRef<HTMLDivElement>(null);
  const scrollSectors = (direction: 'left' | 'right') => {
    if (sectorsRef.current) {
      const scrollAmount = 200;
      sectorsRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(mockBlogPosts.map(post => post.category)));
    return ["All Intelligence", ...cats];
  }, []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All Intelligence") return mockBlogPosts;
    return mockBlogPosts.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  const recentPosts = useMemo(() => {
    return [...mockBlogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[1200px]">
      <header className="mb-10 lg:mb-16 min-h-[86px]">
        <h1 className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-300 flex items-center gap-2 mb-2">
          <BookOpen className="w-3 h-3 text-emerald-500" />
          Insight & Analysis Archive
        </h1>
        <p className="text-3xl md:text-4xl font-semibold tracking-tight italic">Intelligence Terminal</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Ad in Top Position for Mobile */}
        <div className="lg:hidden w-full mb-8 min-h-[90px]">
           <AdPlacement type="horizontal" className="w-full" label="Mobile Briefing" />
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-12 space-y-10 lg:space-y-12">
            
            {/* Categories Section - Carousel for all screens */}
            <section className="min-h-[92px] lg:min-h-[236px]">
              <div className="flex items-center justify-between mb-4 lg:mb-6 min-h-[24px]">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 flex items-center gap-2">
                   <Hash className="w-3 h-3 text-emerald-500" />
                   Intelligence Sectors
                </h3>
                <div className="flex gap-1 lg:hidden">
                  <button onClick={() => scrollSectors('left')} className="w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors bg-zinc-950">
                    <ChevronLeft className="w-3 h-3" />
                  </button>
                  <button onClick={() => scrollSectors('right')} className="w-6 h-6 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-500 transition-colors bg-zinc-950">
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="relative group">
                <div 
                  ref={sectorsRef}
                  className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 no-scrollbar scroll-smooth"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`whitespace-nowrap flex items-center justify-between px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 ${
                        activeCategory === cat 
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                          : "bg-zinc-900/40 text-zinc-300 border border-transparent hover:bg-zinc-900 hover:text-white shadow-xl"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Ad in Sidebar for Desktop */}
            <AdPlacement type="square" className="hidden lg:flex w-full" label="Security Partner" />

            {/* Recent Posts Section */}
            <section className="hidden md:block min-h-[344px]">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-6 flex items-center gap-2">
                 <Zap className="w-3 h-3 text-emerald-500" />
                 Latest Relays
              </h3>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <Link 
                    key={`side-${post.id}`} 
                    href={`/blog/${post.id}`}
                    className="block min-h-[64px] p-4 rounded-2xl bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 transition-all group"
                  >
                    <div className="text-[8px] font-mono text-zinc-300 uppercase mb-2">{post.date}</div>
                    <div className="text-xs font-bold leading-tight line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {post.title}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Support / Help Section */}
            <div className="min-h-[96px] p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10">
              <p className="text-[10px] text-emerald-500/70 font-mono leading-relaxed italic">
                // SYSTEM_STATUS: ALL_NODES_OPERATIONAL
                <br />
                // UPDATING_ARCHIVE: EVERY_180_MIN
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          <div className="mb-12 flex min-h-[36px] items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight italic text-zinc-400">
               {activeCategory} <span className="text-[10px] font-mono not-italic text-zinc-700 ml-4">Found {filteredPosts.length} Results</span>
            </h2>
          </div>

          <div className="grid min-h-[760px] grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-12 auto-rows-fr">
            {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="min-h-[340px] bg-zinc-900/20 border border-zinc-900 p-8 lg:p-10 rounded-[40px] flex flex-col justify-between group hover:border-emerald-500/20 hover:bg-zinc-900/40 transition-all shadow-xl w-full"
                >
                  <div>
                    <div className="flex items-center gap-4 text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-300 mb-6 group-hover:text-emerald-500 transition-colors">
                      <span className="bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-4 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-zinc-300 text-sm leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="pt-8 border-t border-zinc-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-[10px] text-zinc-300">
                          {post.author[0]}
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-zinc-400">{post.author}</span>
                          <span className="text-[8px] font-mono text-zinc-700">{post.date}</span>
                       </div>
                    </div>
                    <Link href={`/blog/${post.id}`} className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-700 group-hover:text-white group-hover:border-emerald-500/40 transition-all">
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          {/* Scroll cue for main content */}
          <div className="mt-8 mb-12 flex justify-center">
             <div
               className="flex flex-col items-center gap-2 opacity-40 group cursor-pointer"
               onClick={() => window.scrollTo({ top: window.scrollY + 400, behavior: 'smooth' })}
             >
                <div className="text-[9px] font-bold font-mono uppercase tracking-[0.4em] text-emerald-500/80 group-hover:text-emerald-400 transition-colors">Intelligence Stream</div>
                <div className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors bg-zinc-900/50">
                   <ChevronRight className="w-5 h-5 rotate-90 text-emerald-500" />
                </div>
             </div>
          </div>

          <AdPlacement type="horizontal" className="mt-16 w-full" label="Briefing Sponsor" />

          {/* Featured Newsletter Box */}
          <section className="mt-24 min-h-[360px] p-10 lg:p-16 rounded-[40px] bg-zinc-900/40 border border-zinc-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BookOpen className="w-32 h-32 text-emerald-500" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-black italic tracking-tighter mb-4">Stay Ahead of the Pulse.</h3>
              <p className="text-zinc-300 text-sm max-w-xl mb-8 leading-relaxed">
                Our automated intelligence relay extracts market signals every minute. 
                Subscribe to get the executive summary delivered directly to your tactical interface.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input 
                  type="email" 
                  placeholder="TERMINAL_IDENTIFIER@MAIL.COM" 
                  className="flex-1 bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 font-mono text-[10px] focus:outline-none focus:border-emerald-500 transition-all uppercase tracking-widest text-white"
                />
                <button className="bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest text-[10px] px-8 py-4 rounded-2xl transition-all active:scale-95 whitespace-nowrap shadow-lg shadow-emerald-500/10">
                  Connect Node
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
