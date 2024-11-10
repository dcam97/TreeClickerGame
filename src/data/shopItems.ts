import { ShopItem } from '../types';
import { TREES } from './trees';

export const shopItems: ShopItem[] = [
  {
    id: 'oak-seed',
    name: 'Oak Seed',
    description: `Produces ${TREES.oak.baseProduction} oxygen/s when mature. Growth time: ${TREES.oak.growthTime / 1000}s`,
    price: 1,
    type: 'seed',
    treeType: 'oak',
    icon: 'Leaf',
    unlockThreshold: 0
  },
  {
    id: 'pine-seed',
    name: 'Pine Seed',
    description: `Produces ${TREES.pine.baseProduction} oxygen/s when mature. Growth time: ${TREES.pine.growthTime / 1000}s`,
    price: 15,
    type: 'seed',
    treeType: 'pine',
    icon: 'TreePine',
    unlockThreshold: 10
  },
  {
    id: 'willow-seed',
    name: 'Willow Seed',
    description: `Produces ${TREES.willow.baseProduction} oxygen/s when mature. Growth time: ${TREES.willow.growthTime / 1000}s`,
    price: 50,
    type: 'seed',
    treeType: 'willow',
    icon: 'Leaf',
    unlockThreshold: 40
  }
];