import { Achievement, GameState } from '../types';

export const achievements: Achievement[] = [
  {
    id: 'clicking-pro',
    title: 'Clicking Pro',
    description: 'Click 100 times',
    condition: (state: GameState) => state.totalClicks >= 100,
    reward: 50,
    unlocked: false,
  },
  {
    id: 'oxygen-master',
    title: 'Oxygen Master',
    description: 'Generate 1,000 total oxygen',
    condition: (state: GameState) => state.totalOxygenGenerated >= 1000,
    reward: 100,
    unlocked: false,
  },
  {
    id: 'tree-collector',
    title: 'Tree Collector',
    description: 'Own at least one of each tree type',
    condition: (state: GameState) => 
      state.plantedTrees.some(t => t.type === 'oak') && 
      state.plantedTrees.some(t => t.type === 'pine') && 
      state.plantedTrees.some(t => t.type === 'willow'),
    reward: 200,
    unlocked: false,
  },
  {
    id: 'forest-guardian',
    title: 'Forest Guardian',
    description: 'Own a total of 10 trees',
    condition: (state: GameState) => state.plantedTrees.length >= 10,
    reward: 500,
    unlocked: false,
  },
];