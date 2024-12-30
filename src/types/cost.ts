export interface ArticleCosts {
  fullTextCount: number;
  abstractCount: number;
  totalCost: number;
  multipliedTotalCost: number;
}

export interface DeviceCost {
  deviceId: string;
  deviceName: string;
  category: 'III' | 'IIb' | 'IIa' | 'I' | 'NotBod';
  monthlyFee: number;
  articleCosts: ArticleCosts;
  totalCost: number;
  schedule?: {
    time_frame: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
    report_types: string[];
    is_active: boolean;
  };
}

// Rest of the file remains unchanged...