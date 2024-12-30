-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum type for article relevance
CREATE TYPE article_relevance AS ENUM ('vigilance', 'pmcf', 'not_relevant');

-- Drop existing tables
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS device_queries CASCADE;
DROP TABLE IF EXISTS devices CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS report_schedules CASCADE;
DROP TABLE IF EXISTS generated_reports CASCADE;
DROP TABLE IF EXISTS report_articles CASCADE;
DROP TABLE IF EXISTS cost_settings CASCADE;
DROP TABLE IF EXISTS monthly_bills CASCADE;
DROP TABLE IF EXISTS bill_device_costs CASCADE;

-- Create companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create devices table
CREATE TABLE devices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  manufacturer TEXT NOT NULL,
  model TEXT NOT NULL,
  device_type TEXT,
  device_category TEXT CHECK (device_category IN ('III', 'IIb', 'IIa', 'I', 'NotBod')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create device queries table
CREATE TABLE device_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  query_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  device_id UUID REFERENCES devices(id) ON DELETE SET NULL,
  source TEXT NOT NULL,
  publication_name TEXT NOT NULL,
  title TEXT NOT NULL,
  analysis_part TEXT NOT NULL CHECK (analysis_part IN ('FT', 'A&I')),
  findings TEXT NOT NULL,
  relevant_to article_relevance NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'processed', 'failed')) DEFAULT 'pending',
  received_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  issn TEXT,
  e_issn TEXT,
  pmid TEXT,
  pmcid TEXT,
  doi TEXT,
  authors TEXT[] NOT NULL DEFAULT '{}',
  abstract TEXT,
  equipment_type TEXT,
  effect TEXT
);

-- Create report schedules table
CREATE TABLE report_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  report_category TEXT NOT NULL CHECK (report_category IN ('vigilance', 'pmcf')),
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  next_run TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create generated reports table
CREATE TABLE generated_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  schedule_id UUID REFERENCES report_schedules(id) ON DELETE SET NULL,
  report_category TEXT NOT NULL CHECK (report_category IN ('vigilance', 'pmcf')),
  time_frame TEXT NOT NULL CHECK (time_frame IN ('daily', 'weekly', 'monthly', 'yearly')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  generated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create report articles junction table
CREATE TABLE report_articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES generated_reports(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  findings TEXT NOT NULL,
  relevant_to TEXT NOT NULL,
  received_date TIMESTAMP WITH TIME ZONE NOT NULL,
  UNIQUE(report_id, article_id)
);

-- Create cost settings table
CREATE TABLE cost_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  baseline_device_price DECIMAL(10,2) NOT NULL DEFAULT 100.00,
  multiplier_iii DECIMAL(4,2) NOT NULL DEFAULT 3.00,
  multiplier_iib DECIMAL(4,2) NOT NULL DEFAULT 2.00,
  multiplier_iia DECIMAL(4,2) NOT NULL DEFAULT 1.50,
  multiplier_i DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  multiplier_notbod DECIMAL(4,2) NOT NULL DEFAULT 0.50,
  full_text_cost DECIMAL(10,2) NOT NULL DEFAULT 5.00,
  abstract_cost DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id)
);

-- Create monthly bills table
CREATE TABLE monthly_bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_device_fees DECIMAL(10,2) NOT NULL,
  total_article_costs DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'paid', 'overdue')),
  due_date DATE NOT NULL,
  paid_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bill device costs table
CREATE TABLE bill_device_costs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_id UUID NOT NULL REFERENCES monthly_bills(id) ON DELETE CASCADE,
  device_id UUID NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
  device_name TEXT NOT NULL,
  device_category TEXT NOT NULL,
  monthly_fee DECIMAL(10,2) NOT NULL,
  full_text_count INTEGER NOT NULL DEFAULT 0,
  abstract_count INTEGER NOT NULL DEFAULT 0,
  article_costs DECIMAL(10,2) NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_articles_title_findings ON articles USING gin(to_tsvector('english', title || ' ' || findings));
CREATE INDEX idx_articles_received_date ON articles(received_date);
CREATE INDEX idx_articles_company ON articles(company_id);
CREATE INDEX idx_articles_device ON articles(device_id);
CREATE INDEX idx_articles_relevance ON articles(relevant_to);
CREATE INDEX idx_articles_status ON articles(status);

CREATE INDEX idx_devices_company ON devices(company_id);
CREATE INDEX idx_devices_category ON devices(device_category);

CREATE INDEX idx_device_queries_device ON device_queries(device_id);

CREATE INDEX idx_report_schedules_company ON report_schedules(company_id);
CREATE INDEX idx_report_schedules_device ON report_schedules(device_id);
CREATE INDEX idx_report_schedules_next_run ON report_schedules(next_run);

CREATE INDEX idx_generated_reports_company ON generated_reports(company_id);
CREATE INDEX idx_generated_reports_device ON generated_reports(device_id);
CREATE INDEX idx_generated_reports_schedule ON generated_reports(schedule_id);

CREATE INDEX idx_report_articles_report ON report_articles(report_id);
CREATE INDEX idx_report_articles_article ON report_articles(article_id);

CREATE INDEX idx_cost_settings_company ON cost_settings(company_id);

CREATE INDEX idx_monthly_bills_company ON monthly_bills(company_id);
CREATE INDEX idx_monthly_bills_period ON monthly_bills(period_start, period_end);
CREATE INDEX idx_monthly_bills_status ON monthly_bills(status);

CREATE INDEX idx_bill_device_costs_bill ON bill_device_costs(bill_id);
CREATE INDEX idx_bill_device_costs_device ON bill_device_costs(device_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_companies_updated_at
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_devices_updated_at
    BEFORE UPDATE ON devices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_device_queries_updated_at
    BEFORE UPDATE ON device_queries
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_report_schedules_updated_at
    BEFORE UPDATE ON report_schedules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cost_settings_updated_at
    BEFORE UPDATE ON cost_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_monthly_bills_updated_at
    BEFORE UPDATE ON monthly_bills
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();