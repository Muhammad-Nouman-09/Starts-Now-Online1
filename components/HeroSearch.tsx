"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { allSearchableItems } from "./HomeData";

export default function HeroSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchResults = allSearchableItems.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search:", searchQuery);
    }
  };

  return (
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
            aria-label="Search for tools"
            className="w-full bg-transparent border-none focus:outline-none text-white placeholder:text-zinc-400 text-sm"
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
  );
}
