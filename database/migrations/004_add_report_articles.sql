-- Create report_articles junction table
CREATE TABLE IF NOT EXISTS report_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES generated_reports(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Store snapshot of key article data at report generation time
  title TEXT NOT NULL,
  findings TEXT NOT NULL,
  relevant_to TEXT NOT NULL,
  received_date TIMESTAMP WITH TIME ZONE NOT NULL,
  
  -- Ensure each article is only included once per report
  UNIQUE(report_id, article_id)
);

-- Create indexes
CREATE INDEX idx_report_articles_report_id ON report_articles(report_id);
CREATE INDEX idx_report_articles_article_id ON report_articles(article_id);