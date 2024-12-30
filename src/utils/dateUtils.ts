import { TimeFrame } from '../types/filters';

export function getDateRange(timeFrame: TimeFrame) {
  const now = new Date();
  const start = new Date();

  switch (timeFrame) {
    case 'daily':
      start.setDate(now.getDate() - 1);
      break;
    case 'weekly':
      start.setDate(now.getDate() - 7);
      break;
    case 'monthly':
      start.setDate(now.getDate() - 30);
      break;
    default:
      start.setFullYear(1970);
  }

  return { start, end: now };
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatFullDate(date: string | null): string {
  if (!date) return 'Not specified';
  
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatNextRunDate(date: string): string {
  const nextRun = new Date(date);
  const now = new Date();
  const diffTime = nextRun.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // Format the date
  const formattedDate = nextRun.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // Add relative time context
  if (diffDays === 0) {
    return `Today at ${formattedDate.split(' ').slice(-2).join(' ')}`;
  } else if (diffDays === 1) {
    return `Tomorrow at ${formattedDate.split(' ').slice(-2).join(' ')}`;
  } else if (diffDays <= 7) {
    return formattedDate; // Shows weekday for next 7 days
  } else {
    // Remove weekday for dates more than a week away
    return formattedDate.split(',')[1].trim();
  }
}

export function getScheduleDescription(frequency: string): string {
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