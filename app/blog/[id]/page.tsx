import Link from "next/link";
import { ArrowLeft, Share2, MessageSquare, ChevronRight, Hash, Zap, BookOpen } from "lucide-react";
import { mockBlogPosts } from "@/constants";
import AdPlacement from "@/components/AdPlacement";

export default async function BlogPostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = mockBlogPosts.find(p => p.id === id);

  const categories = Array.from(new Set(mockBlogPosts.map(post => post.category)));
  const recentPosts = [...mockBlogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  if (!post) {
    return <div className="p-20 text-center font-mono">POST_NOT_FOUND</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest mb-12">
        <ArrowLeft className="w-4 h-4" /> Back to Archives
      </Link>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
        {/* Main Article Content */}
        <article className="flex-1 min-w-0 space-y-10 lg:space-y-12">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-500 mb-4">
               <span className="bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">{post.category}</span>
               <span>{post.readTime} Read</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-black italic tracking-tighter leading-tight">{post.title}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between pt-8 border-t border-zinc-900 gap-6">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-400">
                    {post.author[0]}
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold">{post.author}</span>
                     <span className="text-[10px] font-mono text-zinc-700">{post.date}</span>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button className="flex-1 md:flex-none p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:text-emerald-500 transition-all flex items-center justify-center"><Share2 className="w-4 h-4" /></button>
                  <button className="flex-1 md:flex-none p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:text-indigo-500 transition-all flex items-center justify-center"><MessageSquare className="w-4 h-4" /></button>
               </div>
            </div>
          </header>

          <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-p:text-base md:prose-p:text-lg prose-p:leading-relaxed prose-headings:italic prose-headings:tracking-tighter prose-headings:text-white">
            <p>{post.content}</p>
            <p>
              Cryptocurrency markets in 2026 are defined by rapid institutional onboarding and the emergence of sovereign-level digital assets. 
              As we analyze the current velocity, it becomes clear that decentralized systems are no longer a "parallel" path but are becoming the core infrastructure of the global exchange network.
            </p>
            <p>
              The technical hurdles that once plagued the industry—specifically scalability and security—vulnerability models—have been largely addressed by the shift toward zk-proofs and modular storage hierarchies. 
              However, the human element remains the most significant risk factor.
            </p>

            <AdPlacement type="horizontal" className="my-10 md:my-16" label="Market Intelligence Partner" />
          </div>

          <section className="mt-16 md:mt-20 pt-12 border-t border-zinc-900">
             <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">Related Intelligence Tags</h4>
                <div className="flex flex-wrap gap-2">
                   {["CRYPTO", "MARKETS", "TECH", "2026", post.category.toUpperCase().replace(/\s+/g, '_')].map(tag => (
                     <span key={tag} className="text-[8px] font-mono text-zinc-500 px-2 py-1 border border-zinc-900 rounded bg-zinc-950">{tag}</span>
                   ))}
                </div>
             </div>
          </section>
        </article>

        {/* Article Sidebar */}
        <aside className="w-full lg:w-80 shrink-0">
          <div className="lg:sticky lg:top-12 space-y-10 lg:space-y-12">
            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6 flex items-center gap-2">
                 <Hash className="w-3 h-3 text-emerald-500" />
                 Sectors
              </h3>
              <div className="flex flex-row overflow-x-auto pb-4 lg:pb-0 lg:flex-col gap-1 no-scrollbar">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href="/blog"
                    className={`whitespace-nowrap flex items-center justify-between px-4 py-2.5 lg:py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      post.category === cat 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-zinc-900/40 text-zinc-500 border border-transparent hover:bg-zinc-900 hover:text-zinc-300"
                    }`}
                  >
                    {cat}
                    <ChevronRight className="hidden lg:block w-3 h-3 transition-transform translate-x-1" />
                  </Link>
                ))}
              </div>
            </section>

            <AdPlacement type="square" className="w-full" label="Briefing Sponsor" />

            <section>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-6 flex items-center gap-2">
                 <Zap className="w-3 h-3 text-emerald-500" />
                 Latest Relays
              </h3>
              <div className="space-y-4">
                {recentPosts.filter(p => p.id !== id).map((p) => (
                  <Link 
                    key={`side-detail-${p.id}`} 
                    href={`/blog/${p.id}`}
                    className="block p-4 rounded-2xl bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 transition-all group"
                  >
                    <div className="text-[8px] font-mono text-zinc-600 uppercase mb-2">{p.date}</div>
                    <div className="text-xs font-bold leading-tight line-clamp-2 group-hover:text-emerald-400 transition-colors">
                      {p.title}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
               <h4 className="text-[10px] font-bold text-zinc-400 mb-4 flex items-center gap-2">
                 <BookOpen className="w-3 h-3" /> Tactical Intel
               </h4>
               <p className="text-[9px] text-zinc-600 leading-relaxed font-mono">
                 This report was transmitted at high-frequency and verified by three independent relay nodes.
                 Encryption: ZK_PROCESSED_V4
               </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
