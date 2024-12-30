-- Create a temporary table to store the latest settings for each company
CREATE TEMP TABLE latest_cost_settings AS
SELECT DISTINCT ON (company_id)
  id,
  company_id,
  baseline_device_price,
  multiplier_iii,
  multiplier_iib,
  multiplier_iia,
  multiplier_i,
  multiplier_notbod,
  full_text_cost,
  abstract_cost,
  created_at,
  updated_at
FROM cost_settings
ORDER BY company_id, created_at DESC;

-- Delete all existing cost settings
DELETE FROM cost_settings;

-- Reinsert only the latest settings for each company
INSERT INTO cost_settings
SELECT * FROM latest_cost_settings;

-- Add unique constraint to prevent multiple settings per company
ALTER TABLE cost_settings
ADD CONSTRAINT unique_company_cost_settings UNIQUE (company_id);

-- Drop the temporary table
DROP TABLE latest_cost_settings;