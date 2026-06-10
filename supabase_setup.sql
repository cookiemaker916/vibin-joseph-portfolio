-- 1. Create the leads table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    goal TEXT NOT NULL,
    timeline TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new'
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy to allow anyone (anonymous public users) to insert leads
CREATE POLICY "Allow public insert to leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- 4. Create Policy to allow authenticated admin users to read and update leads
CREATE POLICY "Allow admin select/update/delete to leads" 
ON public.leads 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);


-- =========================================================================
-- OPTIONAL CONCEPT: Database Webhook / Trigger Example
-- This demonstrates how to automatically trigger an external service (like
-- Resend via a Supabase Edge Function or Webhook) when a new user signs up.
-- =========================================================================

-- Enable the pg_net extension to allow HTTP requests from Postgres
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Function that sends a welcome email via an external webhook/function
CREATE OR REPLACE FUNCTION public.handle_new_user_welcome()
RETURNS TRIGGER AS $$
BEGIN
  -- Perform an asynchronous HTTP POST request to your Edge Function / Endpoint
  PERFORM net.http_post(
    url := 'https://sruheylkckavvlsezhlb.supabase.co/functions/v1/send-welcome-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_SUPABASE_ANON_KEY'
    ),
    body := jsonb_build_object(
      'email', NEW.email,
      'name', COALESCE(NEW.raw_user_meta_data->>'name', 'Valued Member')
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger that runs after a user is inserted in the auth.users table
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_welcome();
