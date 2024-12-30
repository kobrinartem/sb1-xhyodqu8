-- First ensure the cost_settings table has the correct structure
CREATE TABLE IF NOT EXISTS cost_settings (
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
  CONSTRAINT unique_company_cost_settings UNIQUE (company_id)
);

-- Create a function to initialize cost settings for new companies
CREATE OR REPLACE FUNCTION initialize_company_cost_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO cost_settings (company_id)
  VALUES (NEW.id)
  ON CONFLICT (company_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS initialize_cost_settings_on_company_create ON companies;

CREATE TRIGGER initialize_cost_settings_on_company_create
  AFTER INSERT ON companies
  FOR EACH ROW
  EXECUTE FUNCTION initialize_company_cost_settings();

-- Initialize cost settings for existing companies that don't have them
INSERT INTO cost_settings (company_id)
SELECT id FROM companies
WHERE NOT EXISTS (
  SELECT 1 FROM cost_settings WHERE cost_settings.company_id = companies.id
);