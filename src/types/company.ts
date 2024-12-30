export type CompanyType = 'manufacturer' | 'notified_body';

export interface Company {
  id: string;
  name: string;
  email: string | null;
  company_type: CompanyType;
  created_at: string;
  updated_at: string;
}

export interface CompanyUser {
  id: string;
  email: string;
  full_name: string;
  company_id: string;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}