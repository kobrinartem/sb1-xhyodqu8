import { DeviceCategory } from '../../types/device';
import { DEVICE_CATEGORIES } from './constants';

export function formatDeviceCategory(category: DeviceCategory): string {
  const found = DEVICE_CATEGORIES.find(c => c.value === category);
  return found ? found.label : category;
}