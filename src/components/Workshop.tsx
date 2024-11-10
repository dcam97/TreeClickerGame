import React, { useState } from 'react';
import { Wrench, X, Lock } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Upgrade, UpgradeType } from '../types';

interface WorkshopProps {
  onClose: () => void;
  oxygen: number;
  upgrades: Record<string, Upgrade>;
  onPurchase: (upgrade: Upgrade, position?: number) => void;
  highestOxygenReached: number;
  autoTillers: Record<number, number>;
}

export function Workshop({ 
  onClose, 
  oxygen, 
  upgrades, 
  onPurchase, 
  highestOxygenReached,
  autoTillers 
}: WorkshopProps) {
  const [activeTab, setActiveTab] = useState<UpgradeType>('tool');
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  const filteredUpgrades = Object.values(upgrades).filter(upgrade => upgrade.type === activeTab);

  const handlePurchase = (upgrade: Upgrade) => {
    if (upgrade.type === 'automation' && selectedPosition === null) {
      alert('Please select a plot to place the auto-tiller');
      return;
    }
    onPurchase(upgrade, selectedPosition ?? undefined);
    if (upgrade.type === 'automation') {
      setSelectedPosition(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-emerald-900/95 rounded-xl w-full max-w-4xl p-4 shadow-xl border border-emerald-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-emerald-100">Workshop</h2>
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

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('tool')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'tool'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-800/50 text-emerald-200 hover:bg-emerald-700/50'
            }`}
          >
            Tools
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'automation'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-800/50 text-emerald-200 hover:bg-emerald-700/50'
            }`}
          >
            Auto-Tillers
          </button>
        </div>

        {activeTab === 'automation' && (
          <div className="mb-4 p-4 bg-emerald-800/30 rounded-lg">
            <p className="text-emerald-200 mb-2">Select a plot to place the auto-tiller:</p>
            <div className="w-48 mx-auto">
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 16 }).map((_, position) => (
                  <button
                    key={position}
                    onClick={() => setSelectedPosition(position)}
                    className={`aspect-square rounded-lg transition-all text-xs ${
                      selectedPosition === position
                        ? 'bg-emerald-600 border-2 border-emerald-400'
                        : autoTillers[position]
                        ? 'bg-emerald-700/50 cursor-not-allowed'
                        : 'bg-emerald-800/50 hover:bg-emerald-700/50'
                    }`}
                  >
                    {position + 1}
                    {autoTillers[position] && (
                      <div className="text-[8px] text-emerald-200 mt-1">
                        Active
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-4">
          {filteredUpgrades.map((upgrade) => {
            const Icon = Icons[upgrade.icon as keyof typeof Icons] || Icons.Box;
            const isUnlocked = highestOxygenReached >= upgrade.unlockThreshold;
            const canAfford = oxygen >= upgrade.price;

            return (
              <div
                key={upgrade.id}
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
                        {upgrade.name}
                        {upgrade.owned > 0 && upgrade.type === 'tool' && ` (${upgrade.owned})`}
                      </h3>
                      <p className="text-sm text-emerald-300/70 mb-4">
                        {isUnlocked 
                          ? upgrade.description
                          : `Unlocks at ${upgrade.unlockThreshold} oxygen`
                        }
                      </p>
                      <button
                        onClick={() => handlePurchase(upgrade)}
                        disabled={!isUnlocked || !canAfford || (upgrade.type === 'automation' && selectedPosition === null)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                          ${isUnlocked && canAfford && (upgrade.type !== 'automation' || selectedPosition !== null)
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 hover:scale-105'
                            : 'bg-emerald-900/50 text-emerald-500/50 cursor-not-allowed'
                          }`}
                      >
                        Buy for {upgrade.price} oxygen
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