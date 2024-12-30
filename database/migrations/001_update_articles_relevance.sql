-- Step 1: Add new columns
ALTER TABLE articles 
ADD COLUMN relevant_to_pmcf BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN relevant_to_vigilance BOOLEAN NOT NULL DEFAULT false;

-- Step 2: Migrate existing data
UPDATE articles 
SET 
  relevant_to_pmcf = CASE 
    WHEN report_type = 'pmcf' AND relevance = true THEN true
    ELSE false
  END,
  relevant_to_vigilance = CASE 
    WHEN report_type = 'vigilance' AND relevance = true THEN true
    ELSE false
  END;

-- Step 3: Drop old columns
ALTER TABLE articles 
DROP COLUMN report_type,
DROP COLUMN relevance;

-- Step 4: Update generated_reports table
ALTER TABLE generated_reports
RENAME COLUMN report_type TO report_category;

ALTER TABLE generated_reports
ALTER COLUMN report_category TYPE TEXT
USING CASE 
  WHEN report_category = 'pmcf' THEN 'pmcf'
  WHEN report_category = 'vigilance' THEN 'vigilance'
  ELSE 'unknown'
END;

-- Step 5: Update report_schedules table
ALTER TABLE report_schedules
RENAME COLUMN report_type TO report_category;

ALTER TABLE report_schedules
ALTER COLUMN report_category TYPE TEXT
USING CASE 
  WHEN report_category = 'pmcf' THEN 'pmcf'
  WHEN report_category = 'vigilance' THEN 'vigilance'
  ELSE 'unknown'
END;

-- Step 6: Add indexes for new columns
CREATE INDEX idx_articles_pmcf_relevance ON articles(relevant_to_pmcf);
CREATE INDEX idx_articles_vigilance_relevance ON articles(relevant_to_vigilance);