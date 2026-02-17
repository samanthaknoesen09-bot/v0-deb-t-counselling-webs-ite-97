-- Add role column to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'client';

-- Create index on role for faster queries
CREATE INDEX IF NOT EXISTS idx_clients_role ON clients(role);

-- Create admin user (update the UUID with your actual user ID after registration)
-- First, create an account at /client-portal/auth/sign-up with email: admin@dcsam.co.za
-- Then run this to make that account an admin:
-- UPDATE clients SET role = 'admin' WHERE email = 'admin@dcsam.co.za';

-- Add RLS policy for admins to view all data
CREATE POLICY "Admins can view all clients" ON clients
  FOR SELECT
  USING (role = 'admin');

CREATE POLICY "Admins can view all documents" ON documents
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = auth.uid() 
      AND clients.role = 'admin'
    )
  );

CREATE POLICY "Admins can view all form 16 applications" ON form_16_applications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = auth.uid() 
      AND clients.role = 'admin'
    )
  );

CREATE POLICY "Admins can view all credit repair applications" ON credit_repair_applications
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = auth.uid() 
      AND clients.role = 'admin'
    )
  );

CREATE POLICY "Admins can view all transfer requests" ON transfer_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM clients 
      WHERE clients.id = auth.uid() 
      AND clients.role = 'admin'
    )
  );
