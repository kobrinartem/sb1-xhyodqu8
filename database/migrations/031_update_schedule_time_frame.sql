-- First, temporarily disable the constraint
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

-- Add index for schedule queries
DROP INDEX IF EXISTS idx_devices_schedule;
CREATE INDEX idx_devices_schedule ON devices (
  schedule_time_frame,
  schedule_next_run,
  schedule_is_active
) WHERE schedule_time_frame IS NOT NULL;