-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create clients table for user profiles
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  full_name TEXT,
  id_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create documents table for uploaded files
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL, -- 'id', 'payslip', 'marriage_certificate', 'other'
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending' -- 'pending', 'reviewed', 'approved', 'rejected'
);

-- Create form_16_applications table for debt review applications
CREATE TABLE IF NOT EXISTS public.form_16_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  id_number TEXT NOT NULL,
  marital_status TEXT NOT NULL,
  spouse_name TEXT,
  spouse_id_number TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  physical_address TEXT NOT NULL,
  postal_address TEXT,
  
  -- Employment Information
  employment_status TEXT NOT NULL,
  employer_name TEXT,
  employer_contact TEXT,
  monthly_income DECIMAL(10,2) NOT NULL,
  other_income DECIMAL(10,2) DEFAULT 0,
  
  -- Debt Information (JSON array)
  debts JSONB NOT NULL, -- [{ creditor, account_no, balance, monthly_payment }]
  
  -- Monthly Expenses
  monthly_expenses JSONB NOT NULL, -- { rent, utilities, groceries, transport, insurance, etc }
  
  -- Power of Attorney Acceptance
  poa_accepted BOOLEAN DEFAULT FALSE,
  poa_accepted_at TIMESTAMPTZ,
  
  -- Submission Details
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'approved', 'rejected'
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create credit_repair_applications table
CREATE TABLE IF NOT EXISTS public.credit_repair_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  id_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  physical_address TEXT NOT NULL,
  
  -- Credit Issues
  credit_issues JSONB NOT NULL, -- Array of issues they want addressed
  credit_bureau_reports BOOLEAN DEFAULT FALSE,
  has_judgements BOOLEAN DEFAULT FALSE,
  has_defaults BOOLEAN DEFAULT FALSE,
  
  -- Additional Information
  current_credit_score INTEGER,
  reasons_for_repair TEXT,
  
  -- Power of Attorney Acceptance
  poa_accepted BOOLEAN DEFAULT FALSE,
  poa_accepted_at TIMESTAMPTZ,
  
  -- Submission Details
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create transfer_requests table
CREATE TABLE IF NOT EXISTS public.transfer_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  id_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  
  -- Current Debt Counsellor Information
  current_counsellor_name TEXT NOT NULL,
  current_counsellor_contact TEXT,
  current_counsellor_email TEXT,
  ncrdc_number TEXT,
  
  -- Reason for Transfer
  reason_for_transfer TEXT NOT NULL,
  current_payment_amount DECIMAL(10,2),
  
  -- Submission Details
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create email_logs table for tracking sent emails
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  email_type TEXT NOT NULL, -- 'form_16_submission', 'credit_repair_submission', 'transfer_request', etc
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'sent', -- 'sent', 'failed', 'bounced'
  error_message TEXT
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON public.clients(email);
CREATE INDEX IF NOT EXISTS idx_documents_client_id ON public.documents(client_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON public.documents(document_type);
CREATE INDEX IF NOT EXISTS idx_form_16_client_id ON public.form_16_applications(client_id);
CREATE INDEX IF NOT EXISTS idx_form_16_status ON public.form_16_applications(status);
CREATE INDEX IF NOT EXISTS idx_credit_repair_client_id ON public.credit_repair_applications(client_id);
CREATE INDEX IF NOT EXISTS idx_transfer_requests_client_id ON public.transfer_requests(client_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_client_id ON public.email_logs(client_id);

-- Enable Row Level Security
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_16_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_repair_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transfer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Clients can only see their own data
CREATE POLICY "Clients can view own profile" ON public.clients
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Clients can update own profile" ON public.clients
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Clients can view own documents" ON public.documents
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clients can insert own documents" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can view own form 16 applications" ON public.form_16_applications
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clients can insert own form 16 applications" ON public.form_16_applications
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can view own credit repair applications" ON public.credit_repair_applications
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clients can insert own credit repair applications" ON public.credit_repair_applications
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can view own transfer requests" ON public.transfer_requests
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "Clients can insert own transfer requests" ON public.transfer_requests
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can view own email logs" ON public.email_logs
  FOR SELECT USING (auth.uid() = client_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_16_updated_at BEFORE UPDATE ON public.form_16_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credit_repair_updated_at BEFORE UPDATE ON public.credit_repair_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transfer_requests_updated_at BEFORE UPDATE ON public.transfer_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
