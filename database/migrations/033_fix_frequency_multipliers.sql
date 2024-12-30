-- First ensure the columns exist with correct defaults
DO $$ 
BEGIN
  -- Add columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'cost_settings' 
                AND column_name = 'yearly_frequency_multiplier') THEN
    ALTER TABLE cost_settings
    ADD COLUMN yearly_frequency_multiplier DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    ADD COLUMN quarterly_frequency_multiplier DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    ADD COLUMN monthly_frequency_multiplier DECIMAL(4,2) NOT NULL DEFAULT 1.10,
    ADD COLUMN weekly_frequency_multiplier DECIMAL(4,2) NOT NULL DEFAULT 1.20,
    ADD COLUMN daily_frequency_multiplier DECIMAL(4,2) NOT NULL DEFAULT 1.30;
  END IF;
END $$;

-- Update existing records with default values if null
UPDATE cost_settings 
SET 
  yearly_frequency_multiplier = COALESCE(yearly_frequency_multiplier, 1.00),
  quarterly_frequency_multiplier = COALESCE(quarterly_frequency_multiplier, 1.00),
  monthly_frequency_multiplier = COALESCE(monthly_frequency_multiplier, 1.10),
  weekly_frequency_multiplier = COALESCE(weekly_frequency_multiplier, 1.20),
  daily_frequency_multiplier = COALESCE(daily_frequency_multiplier, 1.30);

-- Add check constraints to ensure valid values
ALTER TABLE cost_settings
  ADD CONSTRAINT check_yearly_multiplier CHECK (yearly_frequency_multiplier >= 0),
  ADD CONSTRAINT check_quarterly_multiplier CHECK (quarterly_frequency_multiplier >= 0),
  ADD CONSTRAINT check_monthly_multiplier CHECK (monthly_frequency_multiplier >= 0),
  ADD CONSTRAINT check_weekly_multiplier CHECK (weekly_frequency_multiplier >= 0),
  ADD CONSTRAINT check_daily_multiplier CHECK (daily_frequency_multiplier >= 0);