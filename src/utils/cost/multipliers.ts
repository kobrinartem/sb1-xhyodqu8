import { Device, DeviceCategory, ScheduleTimeFrame } from '../../types/device';
import { CostSettings } from '../../types/cost';
import { DEFAULT_COST_SETTINGS } from './constants';

const FREQUENCY_MAP: Record<ScheduleTimeFrame, keyof CostSettings['frequencyMultipliers']> = {
  'yearly': 'yearly',
  'quarterly': 'quarterly',
  'monthly': 'monthly',
  'weekly': 'weekly',
  'daily': 'daily'
};

export function getCategoryMultiplier(category: DeviceCategory, settings: CostSettings): number {
  return settings.multipliers[category] || DEFAULT_COST_SETTINGS.multipliers[category] || 1;
}

export function getFrequencyMultiplier(device: Device, settings: CostSettings): number | undefined {
  if (!device.schedule?.time_frame || !device.schedule.is_active) {
    return undefined;
  }

  const frequencyKey = FREQUENCY_MAP[device.schedule.time_frame];
  if (!frequencyKey) {
    return undefined;
  }

  return settings.frequencyMultipliers[frequencyKey] || 
         DEFAULT_COST_SETTINGS.frequencyMultipliers[frequencyKey] || 
         1;
}