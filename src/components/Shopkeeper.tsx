import React from 'react';
import { Store, X, Leaf, Zap, Sparkles, TreePine, Lock } from 'lucide-react';
import { shopItems } from '../data/shopItems';
import type { ShopItem } from '../types';

const IconMap = {
  Leaf,
  Zap,
  Sparkles,
  TreePine
};

interface ShopkeeperProps {
  onClose: () => void;
  oxygen: number;
  onPurchase: (item: ShopItem) => void;
  highestOxygenReached: number;
  hasTilledPlots: boolean;
}

export function Shopkeeper({ 
  onClose, 
  oxygen, 
  onPurchase, 
  highestOxygenReached,
  hasTilledPlots 
}: ShopkeeperProps) {
  const handlePurchase = (item: ShopItem) => {
    if (item.type === 'seed' && !hasTilledPlots) {
      alert('No tilled plots available! Till some land first by clicking empty plots 30 times.');
      return;
    }
    
    if (oxygen >= item.price && highestOxygenReached >= item.unlockThreshold) {
      onPurchase(item);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-emerald-900/95 rounded-xl w-full max-w-4xl p-4 shadow-xl border border-emerald-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-emerald-100">Mystical Tree Shop</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-emerald-200">
              Available Oxygen: {oxygen}
            </div>
            <button 
              onClick={onClose}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto p-4 custom-scrollbar">
          {shopItems.map((item) => {
            const Icon = IconMap[item.icon as keyof typeof IconMap];
            const isUnlocked = highestOxygenReached >= item.unlockThreshold;
            const canAfford = oxygen >= item.price;

            return (
              <div
                key={item.id}
                className={`group relative transition-all duration-300 ${
                  isUnlocked ? 'hover:-translate-y-0.5' : 'opacity-80'
                }`}
              >
                <div className={`absolute -inset-0.5 rounded-xl blur-[2px] transition-all duration-300
                  ${isUnlocked
                    ? 'bg-gradient-to-r from-emerald-600/20 to-emerald-400/20 group-hover:from-emerald-500/30 group-hover:to-emerald-300/30'
                    : 'bg-gradient-to-r from-red-950/20 to-red-900/20'
                  }`}
                />
                
                <div className={`relative p-4 rounded-xl backdrop-blur-sm border
                  ${isUnlocked
                    ? 'bg-emerald-900/50 border-emerald-700/30 group-hover:border-emerald-600/50'
                    : 'bg-red-950/80 border-red-900/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl transition-transform duration-300 group-hover:scale-105 ${
                      isUnlocked ? 'bg-emerald-800/50' : 'bg-red-950/50'
                    }`}>
                      {isUnlocked ? (
                        <Icon className="w-7 h-7 text-emerald-400" />
                      ) : (
                        <Lock className="w-7 h-7 text-red-500/50" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-emerald-200 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-emerald-300/70 mb-4">
                        {isUnlocked 
                          ? item.description
                          : `Unlocks at ${item.unlockThreshold} oxygen`
                        }
                      </p>
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={!isUnlocked || !canAfford}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                          ${isUnlocked && canAfford
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:scale-105'
                            : 'bg-emerald-900/50 text-emerald-500/50 cursor-not-allowed'
                          }`}
                      >
                        Buy for {item.price} oxygen
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}