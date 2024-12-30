import type { Frequency, TimeFrame } from '../../types/report';

export function getNextScheduledRunDate(frequency: Frequency): Date {
  const now = new Date();
  const nextRun = new Date();
  
  // Set time to end of day (23:59:59)
  nextRun.setHours(23, 59, 59, 999);

  switch (frequency) {
    case 'daily':
      // If it's already past today's end time, move to next day
      if (now.getHours() >= 23 && now.getMinutes() >= 59) {
        nextRun.setDate(now.getDate() + 1);
      }
      break;
      
    case 'weekly':
      // Calculate days until next Sunday
      const daysUntilSunday = 7 - now.getDay();
      if (daysUntilSunday === 0) {
        // If it's Sunday and past end time, move to next Sunday
        if (now.getHours() >= 23 && now.getMinutes() >= 59) {
          nextRun.setDate(now.getDate() + 7);
        }
      } else {
        nextRun.setDate(now.getDate() + daysUntilSunday);
      }
      break;
      
    case 'monthly':
      // Get last day of current month
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      if (now.getDate() === lastDay.getDate() && now.getHours() >= 23 && now.getMinutes() >= 59) {
        // If it's last day of month and past end time, move to last day of next month
        nextRun.setMonth(now.getMonth() + 2, 0);
      } else if (now.getDate() < lastDay.getDate()) {
        // If not yet last day of month, set to this month's last day
        nextRun.setMonth(now.getMonth() + 1, 0);
      } else {
        // If past last day, move to next month's last day
        nextRun.setMonth(now.getMonth() + 2, 0);
      }
      break;
  }

  return nextRun;
}

export function getDateRangeForReport(timeFrame: TimeFrame): { startDate: Date; endDate: Date } {
  const endDate = new Date();
  const startDate = new Date();

  switch (timeFrame) {
    case 'daily':
      startDate.setDate(startDate.getDate() - 1);
      break;
    case 'weekly':
      startDate.setDate(startDate.getDate() - 7);
      break;
    case 'monthly':
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'yearly':
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
  }

  return { startDate, endDate };
}

export function getScheduleDescription(frequency: Frequency): string {
  switch (frequency) {
    case 'daily':
      return 'Every day at 11:59 PM';
    case 'weekly':
      return 'Every Sunday at 11:59 PM';
    case 'monthly':
      return 'Last day of each month at 11:59 PM';
    default:
      return frequency;
  }
}

export function formatReportDate(date: string): string {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}