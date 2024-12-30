/*
  # Update Literature Sources Configuration

  1. Changes
    - Safely add schedule_literature_sources if it doesn't exist
    - Add constraint to validate literature sources
    - Set default source for existing scheduled devices

  2. Details
    - Uses DO block to check column existence
    - Valid sources are: 'pubmed', 'google_scholar'
    - Existing scheduled devices will get 'pubmed' as default source
*/

-- Safely add column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'devices' 
        AND column_name = 'schedule_literature_sources'
    ) THEN
        ALTER TABLE devices 
        ADD COLUMN schedule_literature_sources TEXT[] NOT NULL DEFAULT '{}';
    END IF;
END $$;

-- Drop existing constraint if it exists
ALTER TABLE devices 
DROP CONSTRAINT IF EXISTS check_literature_sources;

-- Add check constraint to ensure only valid sources
ALTER TABLE devices 
ADD CONSTRAINT check_literature_sources 
CHECK (schedule_literature_sources <@ ARRAY['pubmed', 'google_scholar']::text[]);

-- Update existing records to have pubmed as default source if they have an active schedule
UPDATE devices 
SET schedule_literature_sources = ARRAY['pubmed']
WHERE schedule_is_active = true 
AND schedule_time_frame IS NOT NULL 
AND schedule_literature_sources = '{}';