import React from 'react';
import { Wind, MousePointerClick, Leaf, TreePine } from 'lucide-react';

interface ResourceDisplayProps {
  oxygen: number;
  totalMultiplier: number;
  autoGeneration: number;
}

export function ResourceDisplay({ oxygen, totalMultiplier, autoGeneration }: ResourceDisplayProps) {
  return (
    <div className="text-center mb-8 relative">
      {/* Background glow effect */}
      <div className="absolute inset-x-0 top-0 -z-10">
        <div className="h-32 bg-gradient-to-b from-emerald-500/20 to-transparent blur-2xl"></div>
      </div>

      {/* Title with animated gradient */}
      <div className="relative">
        <TreePine className="w-12 h-12 mx-auto mb-2 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
        <h1 className="text-5xl font-bold mb-6 animate-pulse">
          <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-emerald-300 text-transparent bg-clip-text">
            Tree Farm Clicker
          </span>
        </h1>
      </div>

      {/* Stats container */}
      <div className="relative group max-w-3xl mx-auto">
        {/* Animated border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 via-emerald-300/30 to-emerald-500/30 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-x"></div>
        
        {/* Main stats display */}
        <div className="relative grid grid-cols-[2fr_1fr_1fr] gap-4 px-6 py-4 rounded-xl bg-emerald-950/50 backdrop-blur-sm border border-emerald-500/20 shadow-lg group-hover:border-emerald-400/30 transition-colors duration-300">
          {/* Oxygen Counter */}
          <div className="flex items-center gap-4 px-6 py-3 rounded-lg bg-emerald-900/50 border border-emerald-700/30 group-hover:border-emerald-600/30 transition-colors">
            <Leaf className="w-8 h-8 text-emerald-400 animate-pulse" />
            <div className="flex flex-col items-start">
              <span className="text-4xl font-bold text-emerald-100 tabular-nums tracking-tight">
                {oxygen.toLocaleString()}
              </span>
              <span className="text-sm text-emerald-400/80 font-medium">oxygen generated</span>
            </div>
          </div>

          {/* Click Multiplier */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-900/30 border border-emerald-700/30 group-hover:border-emerald-600/30 transition-colors">
            <MousePointerClick className="w-6 h-6 text-emerald-400" />
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-emerald-100 tabular-nums">
                ×{totalMultiplier.toFixed(1)}
              </span>
              <span className="text-xs text-emerald-400/80">multiplier</span>
            </div>
          </div>

          {/* Auto Generation */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-900/30 border border-emerald-700/30 group-hover:border-emerald-600/30 transition-colors">
            <Wind className="w-6 h-6 text-emerald-400" />
            <div className="flex flex-col items-start">
              <span className="text-2xl font-bold text-emerald-100 tabular-nums">
                {autoGeneration}/s
              </span>
              <span className="text-xs text-emerald-400/80">passive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}