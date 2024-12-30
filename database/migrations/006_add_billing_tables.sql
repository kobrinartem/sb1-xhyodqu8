-- Create cost settings table
CREATE TABLE cost_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  baseline_device_price DECIMAL(10,2) NOT NULL DEFAULT 100.00,
  multiplier_iii DECIMAL(4,2) NOT NULL DEFAULT 3.00,
  multiplier_iib DECIMAL(4,2) NOT NULL DEFAULT 2.00,
  multiplier_iia DECIMAL(4,2) NOT NULL DEFAULT 1.50,
  multiplier_i DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  multiplier_notbod DECIMAL(4,2) NOT NULL DEFAULT 0.50,
  full_text_cost DECIMAL(10,2) NOT NULL DEFAULT 5.00,
  abstract_cost DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id)
);

-- Create monthly bills table
CREATE TABLE monthly_bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_device_fees DECIMAL(10,2) NOT NULL,
  total_article_costs DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date DATE NOT NULL,
  paid_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bill details table for device costs
CREATE TABLE bill_device_costs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_id UUID NOT NULL REFERENCES monthly_bills(id) ON DELETE CASCADE,
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  device_name TEXT NOT NULL,
  device_category TEXT NOT NULL,
  monthly_fee DECIMAL(10,2) NOT NULL,
  full_text_count INTEGER NOT NULL DEFAULT 0,
  abstract_count INTEGER NOT NULL DEFAULT 0,
  article_costs DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_cost_settings_company ON cost_settings(company_id);
CREATE INDEX idx_monthly_bills_company ON monthly_bills(company_id);
CREATE INDEX idx_monthly_bills_period ON monthly_bills(period_start, period_end);
CREATE INDEX idx_monthly_bills_status ON monthly_bills(status);
CREATE INDEX idx_bill_device_costs_bill ON bill_device_costs(bill_id);
CREATE INDEX idx_bill_device_costs_device ON bill_device_costs(device_id);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_cost_settings_updated_at
    BEFORE UPDATE ON cost_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monthly_bills_updated_at
    BEFORE UPDATE ON monthly_bills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default cost settings for existing companies
INSERT INTO cost_settings (company_id)
SELECT id FROM companies
WHERE NOT EXISTS (
    SELECT 1 FROM cost_settings WHERE cost_settings.company_id = companies.id
);