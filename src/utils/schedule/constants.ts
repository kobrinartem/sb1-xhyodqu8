import { ScheduleTimeFrame } from '../../types/device';

export const SCHEDULE_FREQUENCIES: { value: ScheduleTimeFrame; label: string }[] = [
  { value: 'yearly', label: 'Yearly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'daily', label: 'Daily' }
];

export const SCHEDULE_DESCRIPTIONS: Record<ScheduleTimeFrame, string> = {
  yearly: 'December 31st at 11:59 PM',
  quarterly: 'Last day of each quarter at 11:59 PM',
  monthly: 'Last day of each month at 11:59 PM',
  weekly: 'Every Sunday at 11:59 PM',
  daily: 'Every day at 11:59 PM'
};