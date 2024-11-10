import React from 'react';
import { TreeDeciduous } from 'lucide-react';
import type { TreeType } from '../types';

interface UpgradeCardProps {
  title: string;
  type: TreeType;
  description: string;
  cost: number;
  owned: number;
  multiplier: number;
  onBuy: () => void;
  disabled: boolean;
}

const TreeImage = {
  oak: '/images/oak.png',
  pine: '/images/pine.png',
  willow: '/images/willow.png',
};

export function UpgradeCard({
  title,
  type,
  description,
  cost,
  owned,
  multiplier,
  onBuy,
  disabled,
}: UpgradeCardProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="bg-emerald-800/30 backdrop-blur-sm rounded-lg p-6 border border-emerald-700/50 shadow-lg hover:shadow-emerald-600/10 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-emerald-700/30 rounded-lg">
          {imageError ? (
            <TreeDeciduous className="w-8 h-8 text-emerald-400" />
          ) : (
            <img 
              src={TreeImage[type]} 
              alt={title}
              onError={() => setImageError(true)}
              className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" 
            />
          )}
        </div>
        <h3 className="text-xl font-bold text-green-100">{title}</h3>
      </div>
      <p className="text-sm mb-4 text-emerald-100/70">{description}</p>
      <div className="flex justify-between items-center">
        <div className="text-sm text-emerald-100/90">
          <div>Owned: {owned}</div>
          <div>Bonus: +{multiplier.toFixed(1)}×</div>
        </div>
        <button
          onClick={onBuy}
          disabled={disabled}
          className={`px-4 py-2 rounded-lg transition-all ${
            disabled
              ? 'bg-gray-700/50 cursor-not-allowed text-gray-400'
              : 'bg-green-600 hover:bg-green-500 text-white shadow-lg hover:shadow-green-500/20'
          }`}
        >
          Buy ({cost})
        </button>
      </div>
    </div>
  );
}