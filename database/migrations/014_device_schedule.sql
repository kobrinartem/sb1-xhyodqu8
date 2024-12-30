-- Drop existing report_schedules table
DROP TABLE IF EXISTS report_schedules CASCADE;

-- Add schedule fields to devices table
ALTER TABLE devices
ADD COLUMN schedule_type TEXT CHECK (schedule_type IN ('none', 'daily', 'weekly', 'monthly')),
ADD COLUMN schedule_report_type TEXT CHECK (schedule_report_type IN ('vigilance', 'pmcf')),
ADD COLUMN schedule_next_run TIMESTAMP WITH TIME ZONE,
ADD COLUMN schedule_is_active BOOLEAN DEFAULT false;

-- Create index for schedule fields
CREATE INDEX idx_devices_schedule ON devices(schedule_type, schedule_next_run) 
WHERE schedule_type IS NOT NULL;