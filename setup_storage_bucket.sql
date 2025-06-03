-- Storage Bucket Setup for Saintrix
-- Execute these commands in the Supabase SQL Editor

-- Create the client_uploads bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'client_uploads',
  'client_uploads',
  false,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
);

-- Storage policies for client_uploads bucket

-- Allow authenticated users to upload files to their own folder
CREATE POLICY "Users can upload to their own folder" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'client_uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to view their own files
CREATE POLICY "Users can view their own files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'client_uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to update their own files
CREATE POLICY "Users can update their own files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'client_uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'client_uploads' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Allow admins to access all files in the bucket
CREATE POLICY "Admins can access all files" ON storage.objects
  FOR ALL USING (
    bucket_id = 'client_uploads' 
    AND EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
