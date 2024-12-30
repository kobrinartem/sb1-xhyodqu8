import { CompanyCosts } from './cost';

export interface BillingPeriod {
  startDate: Date;
  endDate: Date;
}

export interface MonthlyBill {
  id: string;
  companyId: string;
  period: BillingPeriod;
  costs: CompanyCosts;
  status: 'pending' | 'paid' | 'overdue';
  dueDate: Date;
  paidDate?: Date;
}