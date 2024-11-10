import React from 'react';
import { Trophy } from 'lucide-react';
import type { Achievement } from '../types';

interface AchievementPanelProps {
  achievements: Achievement[];
}

export function AchievementPanel({ achievements }: AchievementPanelProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed bottom-4 right-4 w-80">
      <details className="group">
        <summary className="flex items-center gap-2 p-3 bg-emerald-900/80 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-emerald-800/80 transition-colors">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="font-medium">Achievements ({unlockedCount}/{achievements.length})</span>
        </summary>
        <div className="mt-2 p-4 bg-emerald-900/80 backdrop-blur-sm rounded-lg space-y-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg transition-all ${
                achievement.unlocked
                  ? 'bg-emerald-800/50'
                  : 'bg-emerald-950/50 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{achievement.title}</h4>
                {achievement.unlocked && (
                  <span className="text-xs text-green-400">+{achievement.reward} oxygen</span>
                )}
              </div>
              <p className="text-sm text-emerald-100/70 mt-1">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}