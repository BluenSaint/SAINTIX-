-- Row-Level Security (RLS) Policies for Saintrix
-- Execute these commands in the Supabase SQL Editor

-- Enable RLS on all tables
ALTER TABLE credit_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE dispute_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_activity_log ENABLE ROW LEVEL SECURITY;

-- Credit Reports Policies
-- Clients can only read their own credit reports
CREATE POLICY "Clients can only read their own credit reports" ON credit_reports
    FOR SELECT USING (auth.uid() = user_id);

-- Clients can insert their own credit reports
CREATE POLICY "Clients can insert their own credit reports" ON credit_reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Clients can update their own credit reports
CREATE POLICY "Clients can update their own credit reports" ON credit_reports
    FOR UPDATE USING (auth.uid() = user_id);

-- Admins can access all credit reports
CREATE POLICY "Admins can access all credit reports" ON credit_reports
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Dispute Letters Policies
-- Clients can only see their own dispute letters
CREATE POLICY "Clients can only see their own dispute letters" ON dispute_letters
    FOR SELECT USING (auth.uid() = user_id);

-- Clients can insert their own dispute letters
CREATE POLICY "Clients can insert their own dispute letters" ON dispute_letters
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Clients can update their own dispute letters
CREATE POLICY "Clients can update their own dispute letters" ON dispute_letters
    FOR UPDATE USING (auth.uid() = user_id);

-- Admins can access all dispute letters
CREATE POLICY "Admins can access all dispute letters" ON dispute_letters
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Notifications Policies
-- Client-specific alerts
CREATE POLICY "Client-specific alerts" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

-- Clients can update their own notifications (mark as read)
CREATE POLICY "Clients can update their own notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- Admins can manage all notifications
CREATE POLICY "Admins can manage all notifications" ON notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- System can insert notifications
CREATE POLICY "System can insert notifications" ON notifications
    FOR INSERT WITH CHECK (true);

-- Payments Policies
-- View-only payment history for clients
CREATE POLICY "View-only payment history" ON payments
    FOR SELECT USING (auth.uid() = user_id);

-- Admins can access all payments
CREATE POLICY "Admins can access all payments" ON payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- System can insert payments
CREATE POLICY "System can insert payments" ON payments
    FOR INSERT WITH CHECK (true);

-- AI Logs Policies
-- View only personal AI usage
CREATE POLICY "View only personal AI usage" ON ai_logs
    FOR SELECT USING (auth.uid() = user_id);

-- Clients can insert their own AI logs
CREATE POLICY "Clients can insert their own AI logs" ON ai_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can access all AI logs
CREATE POLICY "Admins can access all AI logs" ON ai_logs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Admin Notes Policies
-- Only admins can access admin notes
CREATE POLICY "Only admins can access admin notes" ON admin_notes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Client Activity Log Policies
-- Clients can view their own activity
CREATE POLICY "Clients can view their own activity" ON client_activity_log
    FOR SELECT USING (auth.uid() = user_id);

-- System can insert activity logs
CREATE POLICY "System can insert activity logs" ON client_activity_log
    FOR INSERT WITH CHECK (true);

-- Admins can access all activity logs
CREATE POLICY "Admins can access all activity logs" ON client_activity_log
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );

-- Users table policies (if needed)
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Admins can access all users
CREATE POLICY "Admins can access all users" ON users
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE users.id = auth.uid() 
            AND users.role = 'admin'
        )
    );
