import { Upgrade } from '../types';

export const upgrades: Upgrade[] = [
  {
    id: 'basic-shovel',
    name: 'Basic Shovel',
    description: 'Increases tilling power by 1',
    price: 5,
    type: 'tool',
    power: 1,
    icon: 'Shovel',
    unlockThreshold: 0,
    owned: 0
  },
  {
    id: 'power-shovel',
    name: 'Power Shovel',
    description: 'Increases tilling power by 2',
    price: 25,
    type: 'tool',
    power: 2,
    icon: 'Hammer',
    unlockThreshold: 20,
    owned: 0
  },
  {
    id: 'excavator',
    name: 'Mini Excavator',
    description: 'Increases tilling power by 3',
    price: 100,
    type: 'tool',
    power: 3,
    icon: 'Truck',
    unlockThreshold: 75,
    owned: 0
  },
  {
    id: 'auto-tiller-1',
    name: 'Auto-Tiller Mk1',
    description: 'Automatically tills 2 per second',
    price: 50,
    type: 'automation',
    power: 2,
    icon: 'Cog',
    unlockThreshold: 30,
    owned: 0
  },
  {
    id: 'auto-tiller-2',
    name: 'Auto-Tiller Mk2',
    description: 'Automatically tills 5 per second',
    price: 200,
    type: 'automation',
    power: 5,
    icon: 'Cogs',
    unlockThreshold: 150,
    owned: 0
  },
  {
    id: 'auto-tiller-3',
    name: 'Auto-Tiller Mk3',
    description: 'Automatically tills 15 per second',
    price: 750,
    type: 'automation',
    power: 15,
    icon: 'Factory',
    unlockThreshold: 500,
    owned: 0
  }
];