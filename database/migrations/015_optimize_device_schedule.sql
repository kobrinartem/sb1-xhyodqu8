-- Drop old report_schedules table if it still exists
DROP TABLE IF EXISTS report_schedules CASCADE;

-- Optimize device schedule columns
ALTER TABLE devices 
  -- Add constraints to ensure valid schedule configurations
  ADD CONSTRAINT valid_schedule_config 
    CHECK (
      (schedule_type IS NULL AND schedule_report_type IS NULL AND schedule_next_run IS NULL AND NOT schedule_is_active) OR
      (schedule_type IS NOT NULL AND schedule_report_type IS NOT NULL AND schedule_next_run IS NOT NULL)
    ),
  -- Add constraint to ensure active schedules have valid type
  ADD CONSTRAINT valid_active_schedule
    CHECK (
      NOT schedule_is_active OR 
      (schedule_type IS NOT NULL AND schedule_type != 'none')
    );

-- Create function to automatically update next run date
CREATE OR REPLACE FUNCTION update_schedule_next_run()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.schedule_type IS NOT NULL AND NEW.schedule_type != 'none' THEN
    NEW.schedule_next_run := CASE NEW.schedule_type
      WHEN 'daily' THEN 
        (CURRENT_DATE + INTERVAL '1 day' + INTERVAL '23 hours 59 minutes 59 seconds')::TIMESTAMP
      WHEN 'weekly' THEN 
        (DATE_TRUNC('week', CURRENT_DATE) + INTERVAL '6 days 23 hours 59 minutes 59 seconds' + INTERVAL '1 week')::TIMESTAMP
      WHEN 'monthly' THEN 
        (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month - 1 day' + INTERVAL '23 hours 59 minutes 59 seconds')::TIMESTAMP
      ELSE NEW.schedule_next_run
    END;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update next run date
DROP TRIGGER IF EXISTS update_schedule_next_run_trigger ON devices;
CREATE TRIGGER update_schedule_next_run_trigger
  BEFORE INSERT OR UPDATE OF schedule_type
  ON devices
  FOR EACH ROW
  EXECUTE FUNCTION update_schedule_next_run();

-- Create index for efficient schedule queries
DROP INDEX IF EXISTS idx_devices_schedule;
CREATE INDEX idx_devices_schedule ON devices (
  schedule_type,
  schedule_next_run,
  schedule_is_active
) WHERE schedule_type IS NOT NULL AND schedule_is_active = true;

-- Create view for active schedules
CREATE OR REPLACE VIEW active_device_schedules AS
SELECT 
  id,
  company_id,
  name,
  schedule_type,
  schedule_report_type,
  schedule_next_run,
  schedule_is_active
FROM devices
WHERE schedule_type IS NOT NULL 
  AND schedule_type != 'none'
  AND schedule_is_active = true
ORDER BY schedule_next_run;