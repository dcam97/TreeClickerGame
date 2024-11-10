import React from 'react';
import { Clock, TreeDeciduous, Wind } from 'lucide-react';
import type { PlantedTree } from '../types';
import { TREES } from '../data/trees';

interface TreeDashboardProps {
  trees: PlantedTree[];
  onRemoveTree: (id: string) => void;
}

export function TreeDashboard({ trees, onRemoveTree }: TreeDashboardProps) {
  const getTreeStatus = (tree: PlantedTree) => {
    if (tree.maturedAt) return 'Mature';
    const elapsed = Date.now() - tree.plantedAt;
    const total = TREES[tree.type].growthTime;
    const remaining = Math.max(0, total - elapsed);
    return `Growing (${Math.ceil(remaining / 1000)}s)`;
  };

  return (
    <div className="fixed right-4 top-20 w-80">
      <details className="group">
        <summary className="flex items-center gap-2 p-3 bg-emerald-900/80 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-emerald-800/80 transition-colors">
          <TreeDeciduous className="w-5 h-5 text-green-400" />
          <span className="font-medium">Tree Dashboard ({trees.length} trees)</span>
        </summary>
        <div className="mt-2 p-4 bg-emerald-900/80 backdrop-blur-sm rounded-lg space-y-3 max-h-96 overflow-y-auto">
          {trees.map((tree) => (
            <div
              key={tree.id}
              className="p-3 rounded-lg bg-emerald-800/30 hover:bg-emerald-800/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{TREES[tree.type].title}</h4>
                <button
                  onClick={() => onRemoveTree(tree.id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
              <div className="mt-2 space-y-1 text-sm text-emerald-100/70">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{getTreeStatus(tree)}</span>
                </div>
                {tree.maturedAt && (
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4" />
                    <span>
                      Producing {TREES[tree.type].baseProduction} oxygen/s
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {trees.length === 0 && (
            <p className="text-center text-emerald-100/50 text-sm">
              No trees planted yet
            </p>
          )}
        </div>
      </details>
    </div>
  );
}