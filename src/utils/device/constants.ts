import { DeviceCategory } from '../../types/device';

export const DEVICE_CATEGORIES: { value: DeviceCategory; label: string }[] = [
  { value: 'III', label: 'Class III' },
  { value: 'IIb', label: 'Class IIb' },
  { value: 'IIa', label: 'Class IIa' },
  { value: 'I', label: 'Class I' },
  { value: 'NotBod', label: 'Not Body' }
];