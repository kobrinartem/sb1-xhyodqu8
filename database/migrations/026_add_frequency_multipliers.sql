-- Add frequency multiplier columns to cost_settings table
ALTER TABLE cost_settings
  ADD COLUMN multiplier_yearly DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  ADD COLUMN multiplier_quarterly DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  ADD COLUMN multiplier_monthly DECIMAL(4,2) NOT NULL DEFAULT 1.10,
  ADD COLUMN multiplier_weekly DECIMAL(4,2) NOT NULL DEFAULT 1.20,
  ADD COLUMN multiplier_daily DECIMAL(4,2) NOT NULL DEFAULT 1.30;

-- Update existing records with default values
UPDATE cost_settings SET
  multiplier_yearly = 1.00,
  multiplier_quarterly = 1.00,
  multiplier_monthly = 1.10,
  multiplier_weekly = 1.20,
  multiplier_daily = 1.30;