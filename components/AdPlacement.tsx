import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdPlacementProps {
  className?: string;
  type?: "horizontal" | "vertical" | "square";
  label?: string;
}

export default function AdPlacement({ className, type = "horizontal", label = "Sponsored Intelligence" }: AdPlacementProps) {
  const dimensions = {
    horizontal: "w-full min-h-[90px] md:min-h-[250px]",
    vertical: "w-full md:w-[300px] min-h-[600px]",
    square: "w-full aspect-square md:w-[300px] md:h-[250px]"
  };

  return (
    <div className={cn(
      "relative bg-zinc-900/40 border border-zinc-800/50 rounded-xl flex flex-col items-center justify-center overflow-hidden transition-all hover:bg-zinc-900/60",
      dimensions[type],
      className
    )}>
      <div className="absolute top-2 left-3 flex items-center gap-1.5 opacity-30">
        <Info className="w-3 h-3" />
        <span className="text-[8px] font-mono font-bold uppercase tracking-widest">{label}</span>
      </div>
      
      <div className="text-zinc-800 font-mono text-[10px] uppercase tracking-[0.5em] text-center px-4">
        AdSense_Node_Placeholder
        <br />
        <span className="text-[8px] opacity-50 lowercase tracking-normal">id: 0xREDACTED</span>
      </div>

      <div className="absolute inset-0 pointer-events-none border border-emerald-500/5 rounded-xl"></div>
    </div>
  );
}
