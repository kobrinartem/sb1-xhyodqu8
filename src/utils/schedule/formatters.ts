import { ScheduleTimeFrame } from '../../types/device';
import { SCHEDULE_DESCRIPTIONS } from './constants';

export function getScheduleDescription(timeFrame: ScheduleTimeFrame): string {
  return SCHEDULE_DESCRIPTIONS[timeFrame] || timeFrame;
}

export function formatScheduleFrequency(timeFrame: ScheduleTimeFrame): string {
  return timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1);
}