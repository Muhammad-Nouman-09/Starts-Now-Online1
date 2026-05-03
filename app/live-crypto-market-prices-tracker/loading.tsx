import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="relative flex flex-col items-center gap-6">
        {/* Glowing background effect */}
        <div className="absolute inset-0 -z-10 h-32 w-32 animate-pulse rounded-full bg-emerald-500/20 blur-3xl" />
        
        {/* Animated rings */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute h-full w-full animate-[spin_3s_linear_infinite] rounded-full border-b-2 border-emerald-500" />
          <div className="absolute h-16 w-16 animate-[spin_2s_linear_infinite_reverse] rounded-full border-t-2 border-emerald-400/60" />
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-lg font-medium text-white tracking-widest uppercase">
            Loading
            <span className="animate-[ping_1.5s_infinite_0ms] rounded-full">.</span>
            <span className="animate-[ping_1.5s_infinite_300ms] rounded-full">.</span>
            <span className="animate-[ping_1.5s_infinite_600ms] rounded-full">.</span>
          </h3>
          <p className="text-sm text-zinc-300">Connecting to crypto network</p>
        </div>
      </div>
    </div>
  );
}
