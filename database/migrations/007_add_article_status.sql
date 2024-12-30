-- Add status column to articles table
ALTER TABLE articles 
ADD COLUMN status TEXT CHECK (status IN ('pending', 'processing', 'processed', 'failed')) NOT NULL DEFAULT 'pending';

-- Create index for status
CREATE INDEX idx_articles_status ON articles(status);

-- Update existing articles to processed status
UPDATE articles SET status = 'processed' WHERE status = 'pending';