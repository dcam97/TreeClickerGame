import React from 'react';
import { Sparkles } from 'lucide-react';

interface SpecialEventProps {
  active: boolean;
  multiplier: number;
}

export function SpecialEvent({ active, multiplier }: SpecialEventProps) {
  if (!active) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-yellow-500/90 text-yellow-900 rounded-lg shadow-lg animate-bounce">
      <Sparkles className="w-5 h-5" />
      <span className="font-medium">
        Special Event! {multiplier}x multiplier active!
      </span>
    </div>
  );
}