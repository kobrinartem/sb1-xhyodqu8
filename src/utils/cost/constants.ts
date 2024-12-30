import { CostSettings } from '../../types/cost';

export const DEFAULT_COST_SETTINGS: CostSettings = {
  baselineDevicePrice: 100,
  multipliers: {
    III: 3,
    IIb: 2,
    IIa: 1.5,
    I: 1,
    NotBod: 0.5
  },
  articleCosts: {
    fullText: 5,
    abstract: 1
  },
  frequencyMultipliers: {
    yearly: 1.0,
    quarterly: 1.0,
    monthly: 1.1,
    weekly: 1.2,
    daily: 1.3
  }
};