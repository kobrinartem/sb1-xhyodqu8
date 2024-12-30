import { ScheduleTimeFrame } from '../../types/device';

export function getNextRunDate(timeFrame: ScheduleTimeFrame): Date {
  const now = new Date();
  const nextRun = new Date();
  
  // Set time to end of day (23:59:59)
  nextRun.setHours(23, 59, 59, 999);

  switch (timeFrame) {
    case 'daily':
      // If it's already past today's end time, move to next day
      if (now.getHours() >= 23 && now.getMinutes() >= 59) {
        nextRun.setDate(now.getDate() + 1);
      }
      break;
      
    case 'weekly':
      // Calculate days until next Sunday
      const daysUntilSunday = 7 - now.getDay();
      nextRun.setDate(now.getDate() + (daysUntilSunday === 0 ? 7 : daysUntilSunday));
      break;
      
    case 'monthly':
      // Move to last day of next month
      nextRun.setMonth(nextRun.getMonth() + 1, 0);
      break;

    case 'quarterly':
      // Calculate next quarter end
      const currentMonth = now.getMonth();
      const currentQuarter = Math.floor(currentMonth / 3);
      const nextQuarterEndMonth = (currentQuarter + 1) * 3 + 2; // Add 2 to get to end month of quarter
      nextRun.setMonth(nextQuarterEndMonth, 0); // Set to last day of quarter
      if (nextRun <= now) {
        nextRun.setMonth(nextRun.getMonth() + 3); // Move to next quarter if current one is past
      }
      break;

    case 'yearly':
      // Move to December 31st
      nextRun.setMonth(11, 31);
      // If we're past this year's end, move to next year
      if (nextRun <= now) {
        nextRun.setFullYear(nextRun.getFullYear() + 1);
      }
      break;
  }

  return nextRun;
}

export function formatNextRunDate(date: string): string {
  const nextRun = new Date(date);
  const now = new Date();
  const diffTime = nextRun.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const formattedDate = nextRun.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  if (diffDays === 0) {
    return `Today at ${formattedDate.split(' ').slice(-2).join(' ')}`;
  } else if (diffDays === 1) {
    return `Tomorrow at ${formattedDate.split(' ').slice(-2).join(' ')}`;
  } else if (diffDays <= 7) {
    return formattedDate;
  } else {
    return formattedDate.split(',')[1].trim();
  }
}