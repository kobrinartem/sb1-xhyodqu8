import { DeviceCategory, ScheduleTimeFrame } from '../../types/device';
import { CostSettings } from '../../types/cost';

export type FrequencyKey = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export interface CalculationContext {
  settings: CostSettings;
  categoryMultiplier: number;
  frequencyMultiplier?: number;
}

export interface DeviceCostInput {
  category: DeviceCategory;
  schedule?: {
    time_frame?: ScheduleTimeFrame;
    is_active?: boolean;
  } | null;
}

export interface ArticleCostInput {
  analysis_part: 'FT' | 'A&I';
}

export interface CostMultiplier {
  value: number;
  description: string;
}