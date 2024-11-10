import React from 'react';
import { Sprout, TreeDeciduous, TreePine, Palmtree, Shovel, Leaf, Wind } from 'lucide-react';
import type { PlantedTree, ShopItem } from '../types';
import { TREES } from '../data/trees';
import { getTillingRequired } from '../hooks/useGameState';

interface TreeFarmProps {
  trees: PlantedTree[];
  tilledBoxes: Record<number, number>;
  onBoxClick: (e: React.MouseEvent, position: number) => void;
  selectedSeed: ShopItem | null;
  recentlyMaturedTrees: Record<string, number>;
  autoTillers: Record<number, number>;
}

const TreeIcons = {
  oak: TreeDeciduous,
  pine: TreePine,
  willow: Palmtree,
};

export function TreeFarm({ 
  trees, 
  tilledBoxes, 
  onBoxClick, 
  selectedSeed,
  recentlyMaturedTrees,
  autoTillers
}: TreeFarmProps) {
  const getTillingProgress = (position: number): number => {
    const required = getTillingRequired(position);
    return ((tilledBoxes[position] || 0) / required) * 100;
  };

  const getGrowthProgress = (tree: PlantedTree): number => {
    if (tree.maturedAt) return 100;
    const elapsed = Date.now() - tree.plantedAt;
    const total = TREES[tree.type].growthTime;
    return Math.min(100, (elapsed / total) * 100);
  };

  const getRemainingTime = (tree: PlantedTree): string => {
    if (tree.maturedAt) return 'Mature';
    const elapsed = Date.now() - tree.plantedAt;
    const total = TREES[tree.type].growthTime;
    const remaining = Math.max(0, total - elapsed);
    return `${Math.ceil(remaining / 1000)}s`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative p-8 rounded-2xl bg-gradient-to-b from-emerald-950/90 to-emerald-900/90 backdrop-blur-md shadow-2xl">
        {/* Static border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-300/20 to-emerald-500/20"></div>
        <div className="absolute inset-0 rounded-2xl backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-emerald-400/5"></div>
        </div>
        
        {/* Grid container */}
        <div className="relative grid grid-cols-4 gap-4 z-10">
          {Array.from({ length: 16 }).map((_, position) => {
            const tree = trees.find(t => t.position === position);
            const isRecentlyMatured = tree?.maturedAt && tree.id in recentlyMaturedTrees;
            const tillingProgress = getTillingProgress(position);
            const growthProgress = tree ? getGrowthProgress(tree) : 0;
            const required = getTillingRequired(position);
            const isTilled = tillingProgress >= 100;
            const canPlantHere = selectedSeed && isTilled && !tree;
            const hasAutoTiller = position in autoTillers;

            return (
              <div key={position} className="relative group">
                {/* Hover effect container */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></div>
                
                <button
                  onClick={(e) => onBoxClick(e, position)}
                  disabled={tillingProgress >= 100 && !canPlantHere}
                  className={`w-full aspect-square rounded-xl transition-all duration-500 relative overflow-visible
                    transform hover:scale-105 hover:-translate-y-1 active:scale-95
                    ${tree ? 'bg-emerald-800/80 hover:bg-emerald-700/90' : 
                      canPlantHere ? 'bg-emerald-600/80 hover:bg-emerald-500/90' :
                      isTilled ? 'bg-amber-900/80 hover:bg-amber-800/90' :
                      'bg-emerald-950/80 hover:bg-emerald-900/90'}
                    border-2 ${tree ? 'border-emerald-600/30' : 
                      canPlantHere ? 'border-emerald-400/40' :
                      isTilled ? 'border-amber-600/30' :
                      'border-emerald-800/30'} 
                    group-hover:border-emerald-400/50
                    shadow-lg shadow-black/50 group-hover:shadow-emerald-500/30`}
                  style={{
                    background: !tree && tillingProgress > 0 && tillingProgress < 100 
                      ? `linear-gradient(to top, rgba(180, 83, 9, 0.8) ${tillingProgress}%, rgba(6, 78, 59, 0.8) ${tillingProgress}%)`
                      : undefined
                  }}
                >
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-lg"></div>
                  </div>

                  {tree ? (
                    <div className="w-full h-full flex items-center justify-center group/tree">
                      {tree.maturedAt ? (
                        <>
                          <div className={`transition-all duration-500 ${
                            isRecentlyMatured ? 'animate-mature' : 
                            'group-hover/tree:scale-110 group-hover/tree:rotate-3'
                          }`}>
                            {React.createElement(TreeIcons[tree.type], {
                              className: `w-12 h-12 ${
                                tree.type === 'oak' ? 'text-emerald-400' :
                                tree.type === 'pine' ? 'text-green-500' :
                                'text-emerald-300'
                              } relative z-10 drop-shadow-lg transition-all duration-300
                              group-hover/tree:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]`,
                            })}
                          </div>
                          {isRecentlyMatured && (
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                              <Leaf className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-300 animate-leaf-1" />
                              <Leaf className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400 animate-leaf-2" />
                              <Leaf className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-300 animate-leaf-3" />
                              <Leaf className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400 animate-leaf-4" />
                            </div>
                          )}
                          {/* Tooltip */}
                          <div className="absolute z-[100] left-1/2 -translate-x-1/2 -top-32 w-48 opacity-0 group-hover/tree:opacity-100 transition-all duration-300 pointer-events-none">
                            <div className="bg-black/90 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-emerald-500/20">
                              <div className="text-emerald-300 font-medium mb-1">{TREES[tree.type].title}</div>
                              <div className="flex items-center gap-1.5 text-xs text-emerald-400/80">
                                <Wind className="w-3.5 h-3.5" />
                                <span>Producing {TREES[tree.type].baseProduction} oxygen/s</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-emerald-400/80 mt-1">
                                <Leaf className="w-3.5 h-3.5" />
                                <span>+{TREES[tree.type].baseMultiplier}x multiplier</span>
                              </div>
                              <div className="absolute left-1/2 -bottom-2 w-4 h-4 -translate-x-1/2 rotate-45 bg-black/90 border-r border-b border-emerald-500/20"></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1 group-hover:scale-105 transition-transform duration-300">
                          <div className="text-xs text-emerald-300/90 font-medium">
                            {TREES[tree.type].title}
                          </div>
                          <div className="relative">
                            <Sprout className="w-8 h-8 text-emerald-400 animate-seed-pulse drop-shadow-lg" />
                            <div className="absolute inset-0 bg-emerald-400/10 rounded-full blur-xl animate-seed-pulse" />
                          </div>
                          <div className="text-xs text-emerald-300/70">
                            {getRemainingTime(tree)}
                          </div>
                          <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-950/30">
                            <div 
                              className="h-full bg-emerald-400/50 transition-all duration-300"
                              style={{ width: `${growthProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      {(tillingProgress > 0 || hasAutoTiller) && (
                        <>
                          <Shovel className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12
                            drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]
                            ${canPlantHere ? 'text-emerald-400' : 
                              isTilled ? 'text-amber-500' : 
                              'text-emerald-600/50'}`} 
                          />
                          <div className="absolute bottom-1 left-0 w-full text-center text-xs text-emerald-200/70 transition-all duration-300 group-hover:text-emerald-200 group-hover:scale-110">
                            {Math.floor(tilledBoxes[position] || 0)}/{required}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}