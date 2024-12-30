-- First, backup existing data
CREATE TABLE devices_backup AS SELECT * FROM devices;

-- Drop existing constraint
ALTER TABLE devices 
DROP CONSTRAINT IF EXISTS check_schedule_time_frame;

-- Update existing records to handle new values
UPDATE devices 
SET schedule_time_frame = 'monthly' 
WHERE schedule_time_frame NOT IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly');

-- Add the new constraint with updated values
ALTER TABLE devices 
ADD CONSTRAINT check_schedule_time_frame 
CHECK (schedule_time_frame IN ('daily', 'weekly', 'monthly', 'quarterly', 'yearly'));

-- Update indexes
DROP INDEX IF EXISTS idx_devices_schedule;
CREATE INDEX idx_devices_schedule ON devices (
  schedule_time_frame,
  schedule_next_run,
  schedule_is_active
) WHERE schedule_time_frame IS NOT NULL;

-- Add frequency multiplier columns if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'cost_settings' 
                AND column_name = 'yearly_frequency_multiplier') THEN
    ALTER TABLE cost_settings
    ADD COLUMN yearly_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.0,
    ADD COLUMN quarterly_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.0,
    ADD COLUMN monthly_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.1,
    ADD COLUMN weekly_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.2,
    ADD COLUMN daily_frequency_multiplier DECIMAL(3,1) NOT NULL DEFAULT 1.3;
  END IF;
END $$;

-- Update existing cost settings with default multipliers
UPDATE cost_settings 
SET 
  yearly_frequency_multiplier = COALESCE(yearly_frequency_multiplier, 1.0),
  quarterly_frequency_multiplier = COALESCE(quarterly_frequency_multiplier, 1.0),
  monthly_frequency_multiplier = COALESCE(monthly_frequency_multiplier, 1.1),
  weekly_frequency_multiplier = COALESCE(weekly_frequency_multiplier, 1.2),
  daily_frequency_multiplier = COALESCE(daily_frequency_multiplier, 1.3);