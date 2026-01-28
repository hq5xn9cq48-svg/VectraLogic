-- VectraLogic Invoice Parser - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to set up the database

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    vendor TEXT,
    amount DECIMAL(15, 2),
    currency VARCHAR(3),
    date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for faster queries by user
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at DESC);

-- Enable Row Level Security
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own invoices
CREATE POLICY "Users can view own invoices" ON invoices
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy for users to insert their own invoices
CREATE POLICY "Users can insert own invoices" ON invoices
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own invoices
CREATE POLICY "Users can update own invoices" ON invoices
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy for users to delete their own invoices
CREATE POLICY "Users can delete own invoices" ON invoices
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_invoices_updated_at
    BEFORE UPDATE ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create Storage bucket for invoice files (run this separately in Supabase Dashboard)
-- Go to Storage > Create bucket > Name: "invoices" > Public: false

-- Storage policy for authenticated users to upload to their folder
-- Go to Storage > invoices > Policies > New Policy:
-- Name: "Users can upload to own folder"
-- Operation: INSERT
-- Policy: bucket_id = 'invoices' AND (storage.foldername(name))[1] = auth.uid()::text

-- Storage policy for authenticated users to read their files
-- Name: "Users can read own files"
-- Operation: SELECT
-- Policy: bucket_id = 'invoices' AND (storage.foldername(name))[1] = auth.uid()::text
