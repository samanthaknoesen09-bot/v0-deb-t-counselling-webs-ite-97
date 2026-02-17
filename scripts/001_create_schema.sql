-- =====================================================
-- DCSA Client Portal Database Schema
-- Creates all tables with RLS policies for secure access
-- =====================================================

-- 1. Clients table (profile data, references auth.users)
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT GENERATED ALWAYS AS (COALESCE(first_name, '') || ' ' || COALESCE(last_name, '')) STORED,
  email TEXT,
  phone TEXT,
  role TEXT DEFAULT 'client',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Clients can read their own profile
CREATE POLICY "clients_select_own" ON public.clients
  FOR SELECT USING (auth.uid() = id);

-- Clients can insert their own profile
CREATE POLICY "clients_insert_own" ON public.clients
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Clients can update their own profile
CREATE POLICY "clients_update_own" ON public.clients
  FOR UPDATE USING (auth.uid() = id);

-- Admins can read all clients
CREATE POLICY "admins_select_all_clients" ON public.clients
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

-- 2. Documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT DEFAULT 0,
  mime_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "documents_select_own" ON public.documents
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "documents_insert_own" ON public.documents
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "documents_delete_own" ON public.documents
  FOR DELETE USING (auth.uid() = client_id);

-- Admins can read all documents
CREATE POLICY "admins_select_all_documents" ON public.documents
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

-- 3. Form 16 Applications table
CREATE TABLE IF NOT EXISTS public.form16_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  id_number TEXT,
  email TEXT,
  phone TEXT,
  marital_status TEXT,
  street_address TEXT,
  suburb TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  employment_status TEXT,
  employer TEXT,
  monthly_income NUMERIC DEFAULT 0,
  other_income NUMERIC DEFAULT 0,
  home_loans NUMERIC DEFAULT 0,
  vehicle_loans NUMERIC DEFAULT 0,
  personal_loans NUMERIC DEFAULT 0,
  credit_cards NUMERIC DEFAULT 0,
  store_credit_accounts NUMERIC DEFAULT 0,
  other_debts NUMERIC DEFAULT 0,
  total_monthly_debt_payment NUMERIC DEFAULT 0,
  rent_or_bond NUMERIC DEFAULT 0,
  utilities NUMERIC DEFAULT 0,
  groceries NUMERIC DEFAULT 0,
  transport NUMERIC DEFAULT 0,
  insurance NUMERIC DEFAULT 0,
  medical NUMERIC DEFAULT 0,
  education NUMERIC DEFAULT 0,
  other_expenses NUMERIC DEFAULT 0,
  reason_for_debt_review TEXT,
  current_financial_difficulties TEXT,
  poa_agreement BOOLEAN DEFAULT FALSE,
  consent_to_contact_creditors BOOLEAN DEFAULT FALSE,
  consent_to_process_personal_info BOOLEAN DEFAULT FALSE,
  understand_debt_review_process BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.form16_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "form16_select_own" ON public.form16_applications
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "form16_insert_own" ON public.form16_applications
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- Admins can read all
CREATE POLICY "admins_select_all_form16" ON public.form16_applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

-- Admins can update status
CREATE POLICY "admins_update_form16" ON public.form16_applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

-- 4. Credit Repair Applications table
CREATE TABLE IF NOT EXISTS public.credit_repair_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  id_number TEXT,
  email TEXT,
  phone TEXT,
  credit_score TEXT,
  credit_bureaus JSONB,
  specific_issues JSONB,
  issue_description TEXT,
  dispute_accounts TEXT,
  dispute_reasons TEXT,
  desired_outcome TEXT,
  timeframe TEXT,
  poa_agreement BOOLEAN DEFAULT FALSE,
  consent_to_dispute_on_behalf BOOLEAN DEFAULT FALSE,
  consent_to_contact_bureaus BOOLEAN DEFAULT FALSE,
  consent_to_process_personal_info BOOLEAN DEFAULT FALSE,
  understand_credit_repair_process BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.credit_repair_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "credit_repair_select_own" ON public.credit_repair_applications
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "credit_repair_insert_own" ON public.credit_repair_applications
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "admins_select_all_credit_repair" ON public.credit_repair_applications
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

CREATE POLICY "admins_update_credit_repair" ON public.credit_repair_applications
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

-- 5. Transfer Requests table
CREATE TABLE IF NOT EXISTS public.transfer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  id_number TEXT,
  email TEXT,
  phone TEXT,
  current_dc_name TEXT,
  current_dc_registration_number TEXT,
  current_dc_contact_number TEXT,
  current_dc_email TEXT,
  debt_review_start_date TEXT,
  current_monthly_payment NUMERIC DEFAULT 0,
  number_of_creditors INTEGER,
  reason_for_transfer TEXT,
  issues_with_current_dc TEXT,
  authorize_contact_current_dc BOOLEAN DEFAULT FALSE,
  authorize_transfer_of_records BOOLEAN DEFAULT FALSE,
  understand_transfer_process BOOLEAN DEFAULT FALSE,
  consent_to_process_personal_info BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'submitted',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.transfer_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "transfer_select_own" ON public.transfer_requests
  FOR SELECT USING (auth.uid() = client_id);

CREATE POLICY "transfer_insert_own" ON public.transfer_requests
  FOR INSERT WITH CHECK (auth.uid() = client_id);

CREATE POLICY "admins_select_all_transfers" ON public.transfer_requests
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

CREATE POLICY "admins_update_transfers" ON public.transfer_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

-- 6. Email Logs table (non-sensitive, for tracking)
CREATE TABLE IF NOT EXISTS public.email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient TEXT,
  subject TEXT,
  application_type TEXT,
  application_id UUID,
  status TEXT DEFAULT 'sent',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.email_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view email logs
CREATE POLICY "admins_select_email_logs" ON public.email_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.clients c WHERE c.id = auth.uid() AND c.role = 'admin')
  );

-- Allow inserts from authenticated users (for logging their own emails)
CREATE POLICY "email_logs_insert" ON public.email_logs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 7. Auto-create client profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.clients (id, first_name, last_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'first_name', NULL),
    COALESCE(NEW.raw_user_meta_data ->> 'last_name', NULL),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'phone', NULL)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
