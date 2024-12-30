import { Device } from '../../types/device';
import { Article } from '../../types/article';
import { CostSettings } from '../../types/cost';
import { DEFAULT_COST_SETTINGS } from './constants';
import { getCategoryMultiplier, getFrequencyMultiplier } from './multipliers';
import { calculateArticleCosts } from './articleCosts';

interface DeviceCostResult {
  baseCost: number;
  articleCosts: {
    fullTextCount: number;
    abstractCount: number;
    totalCost: number;
    multipliedTotalCost: number;
  };
  totalCost: number;
}

export function calculateDeviceCost(
  device: Device,
  articles: Article[],
  settings: CostSettings = DEFAULT_COST_SETTINGS
): DeviceCostResult {
  // Calculate base cost with category multiplier
  const categoryMultiplier = getCategoryMultiplier(device.device_category, settings);
  let baseCost = settings.baselineDevicePrice * categoryMultiplier;

  // Calculate article costs
  const articleCosts = calculateArticleCosts(articles, settings);
  let multipliedArticleCosts = { ...articleCosts };

  // Get frequency multiplier if applicable
  const frequencyMultiplier = device.schedule?.is_active 
    ? getFrequencyMultiplier(device, settings) 
    : undefined;

  // Apply frequency multiplier if schedule exists and is active
  if (frequencyMultiplier) {
    baseCost *= frequencyMultiplier;
    multipliedArticleCosts.totalCost *= frequencyMultiplier;
  }

  return {
    baseCost,
    articleCosts: {
      ...articleCosts,
      multipliedTotalCost: multipliedArticleCosts.totalCost
    },
    totalCost: baseCost + multipliedArticleCosts.totalCost
  };
}