export type TimeFrame = 'all' | 'daily' | 'weekly' | 'monthly';
export type ReportType = 'all' | 'vigilance' | 'pmcf';

export interface FilterOptions {
  timeFrame: TimeFrame;
  reportType: ReportType;
  search: string;
  companyId?: string;
  deviceId?: string;
}