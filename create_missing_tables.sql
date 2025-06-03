-- Create admin_notes table
CREATE TABLE IF NOT EXISTS admin_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    note TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_activity_log table
CREATE TABLE IF NOT EXISTS client_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_notes_user_id ON admin_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_admin_id ON admin_notes(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_notes_created_at ON admin_notes(created_at);
CREATE INDEX IF NOT EXISTS idx_admin_notes_priority ON admin_notes(priority);

CREATE INDEX IF NOT EXISTS idx_client_activity_log_user_id ON client_activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_client_activity_log_activity_type ON client_activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_client_activity_log_created_at ON client_activity_log(created_at);

-- Create updated_at trigger for admin_notes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_admin_notes_updated_at 
    BEFORE UPDATE ON admin_notes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
