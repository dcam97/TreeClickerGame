import React from 'react';
import { TreeDeciduous } from 'lucide-react';

interface TreeButtonProps {
  onClick: (e: React.MouseEvent) => void;
  size?: number;
}

export function TreeButton({ onClick, size = 32 }: TreeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="transform hover:scale-105 transition-all active:scale-95"
      aria-label="Plant tree"
    >
      <TreeDeciduous 
        className="text-green-400 hover:text-green-300 transition-colors drop-shadow-lg" 
        size={size} 
      />
    </button>
  );
}