import { Device, DeviceSchedule, DeviceQuery } from '../../types/device';

export type { Device, DeviceSchedule, DeviceQuery };

export interface CreateDeviceData extends Omit<Device, 'id' | 'created_at' | 'updated_at' | 'schedule'> {
  schedule?: Omit<DeviceSchedule, 'next_run'>;
}

export interface UpdateDeviceData extends Partial<CreateDeviceData> {}