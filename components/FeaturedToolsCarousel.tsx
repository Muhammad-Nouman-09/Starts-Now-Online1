"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { featuredTools } from "./HomeData";

export default function FeaturedToolsCarousel() {
  const toolsScrollRef = useRef<HTMLDivElement>(null);

  const scrollTools = (direction: "left" | "right") => {
    if (toolsScrollRef.current) {
      toolsScrollRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex min-h-[96px] flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
            aria-label="Scroll left"
            className="p-3 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTools("right")}
            aria-label="Scroll right"
            className="p-3 border border-zinc-800 rounded-full text-white hover:bg-zinc-800 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={toolsScrollRef}
        className="flex min-h-[244px] overflow-x-auto gap-6 pb-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {featuredTools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="min-h-[228px] min-w-[280px] sm:min-w-[300px] bg-zinc-950 p-6 rounded-xl border border-zinc-800 hover:border-emerald-500/50 transition-all group shrink-0 snap-start flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <tool.icon className="w-6 h-6 text-emerald-400" />
              <div className="flex items-center gap-1 bg-emerald-400/10 px-2 py-1 rounded text-emerald-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-emerald-400" />
                {tool.rating}
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
              {tool.title}
            </h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed flex-grow min-h-[60px]">
              {tool.description}
            </p>
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-zinc-400">
              <span>{tool.users} USERS</span>
              <span className="text-emerald-400">{tool.category}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
