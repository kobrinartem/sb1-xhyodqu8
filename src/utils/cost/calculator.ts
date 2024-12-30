import { Device } from '../../types/device';
import { Article } from '../../types/article';
import { CostSettings, DeviceCost, CompanyCosts } from '../../types/cost';
import { DEFAULT_COST_SETTINGS } from './constants';
import { calculateDeviceCost } from './deviceCost';
import { calculateArticleCosts } from './articleCosts';

export function calculateCompanyCosts(
  devices: Device[],
  articlesByDevice: Record<string, Article[]>,
  settings: CostSettings = DEFAULT_COST_SETTINGS
): CompanyCosts {
  const deviceCosts: DeviceCost[] = devices.map(device => {
    const articles = articlesByDevice[device.id] || [];
    const { baseCost, articleCosts, totalCost } = calculateDeviceCost(device, articles, settings);

    return {
      deviceId: device.id,
      deviceName: device.name,
      category: device.device_category,
      monthlyFee: baseCost,
      articleCosts,
      totalCost,
      schedule: device.schedule
    };
  });

  const totalDeviceFees = deviceCosts.reduce((sum, d) => sum + d.monthlyFee, 0);
  const totalArticleCosts = deviceCosts.reduce((sum, d) => sum + d.articleCosts.totalCost, 0);

  return {
    totalDeviceFees,
    totalArticleCosts,
    totalMonthlyCost: totalDeviceFees + totalArticleCosts,
    devices: deviceCosts
  };
}