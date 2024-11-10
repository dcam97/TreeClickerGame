export type TreeType = 'oak' | 'pine' | 'willow';
export type UpgradeType = 'tool' | 'automation';

export interface TreeData {
  type: TreeType;
  title: string;
  growthTime: number;
  baseProduction: number;
  baseMultiplier: number;
}

export interface PlantedTree {
  id: string;
  type: TreeType;
  plantedAt: number;
  maturedAt: number | null;
  position: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  condition: (state: GameState) => boolean;
  reward: number;
  unlocked: boolean;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  price: number;
  type: UpgradeType;
  power: number;
  targetPosition?: number;
  icon: string;
  unlockThreshold: number;
  owned: number;
}

export interface GameState {
  oxygen: number;
  plantedTrees: PlantedTree[];
  achievements: Achievement[];
  clickPower: number;
  tillingPower: number;
  specialEventActive: boolean;
  specialEventMultiplier: number;
  totalClicks: number;
  totalOxygenGenerated: number;
  tilledBoxes: Record<number, number>;
  highestOxygenReached: number;
  recentlyMaturedTrees: Record<string, number>;
  upgrades: Record<string, Upgrade>;
  autoTillers: Record<number, number>;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'seed' | 'powerup' | 'special';
  treeType?: TreeType;
  multiplier?: number;
  icon: string;
  unlockThreshold: number;
}