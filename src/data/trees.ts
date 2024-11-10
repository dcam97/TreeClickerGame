import type { TreeData } from '../types';

export const TREES: Record<string, TreeData> = {
  oak: {
    type: 'oak',
    title: 'Oak Tree',
    growthTime: 3000,
    baseProduction: 0.5,
    baseMultiplier: 0.2
  },
  pine: {
    type: 'pine',
    title: 'Pine Tree',
    growthTime: 4000,
    baseProduction: 2,
    baseMultiplier: 0.5
  },
  willow: {
    type: 'willow',
    title: 'Willow Tree',
    growthTime: 5000,
    baseProduction: 5,
    baseMultiplier: 1
  }
}