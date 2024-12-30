-- Add report frequency multipliers to cost_settings table
ALTER TABLE cost_settings
ADD COLUMN yearly_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.0,
ADD COLUMN quarterly_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.0,
ADD COLUMN monthly_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.1,
ADD COLUMN weekly_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.2,
ADD COLUMN daily_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.3;

-- Update existing records with default values
UPDATE cost_settings SET
  yearly_frequency_multiplier = 1.0,
  quarterly_frequency_multiplier = 1.0,
  monthly_frequency_multiplier = 1.1,
  weekly_frequency_multiplier = 1.2,
  daily_frequency_multiplier = 1.3;