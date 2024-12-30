-- First, clean up any duplicate settings
WITH ranked_settings AS (
  SELECT 
    id,
    company_id,
    ROW_NUMBER() OVER (PARTITION BY company_id ORDER BY created_at DESC) as rn
  FROM cost_settings
)
DELETE FROM cost_settings
WHERE id IN (
  SELECT id 
  FROM ranked_settings 
  WHERE rn > 1
);

-- Drop existing constraint if it exists
ALTER TABLE cost_settings 
DROP CONSTRAINT IF EXISTS unique_company_cost_settings;

-- Add new unique constraint
ALTER TABLE cost_settings
ADD CONSTRAINT unique_company_cost_settings UNIQUE (company_id);

-- Add trigger to automatically create cost settings for new companies
CREATE OR REPLACE FUNCTION create_company_cost_settings()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO cost_settings (
    company_id,
    baseline_device_price,
    multiplier_iii,
    multiplier_iib,
    multiplier_iia,
    multiplier_i,
    multiplier_notbod,
    full_text_cost,
    abstract_cost
  ) VALUES (
    NEW.id,
    100.00, -- default baseline price
    3.00,   -- default III multiplier
    2.00,   -- default IIb multiplier
    1.50,   -- default IIa multiplier
    1.00,   -- default I multiplier
    0.50,   -- default NotBod multiplier
    5.00,   -- default full text cost
    1.00    -- default abstract cost
  )
  ON CONFLICT (company_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS create_cost_settings_on_company_insert ON companies;

-- Create new trigger
CREATE TRIGGER create_cost_settings_on_company_insert
  AFTER INSERT ON companies
  FOR EACH ROW
  EXECUTE FUNCTION create_company_cost_settings();