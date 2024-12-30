-- Add new columns to companies table
ALTER TABLE companies 
ADD COLUMN email TEXT,
ADD COLUMN company_type TEXT CHECK (company_type IN ('manufacturer', 'notified_body'));

-- Create index for company type
CREATE INDEX idx_companies_type ON companies(company_type);

-- Update existing companies with default type (manufacturer)
UPDATE companies SET company_type = 'manufacturer' WHERE company_type IS NULL;

-- Make company_type NOT NULL after setting defaults
ALTER TABLE companies ALTER COLUMN company_type SET NOT NULL;