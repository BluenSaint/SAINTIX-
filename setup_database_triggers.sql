-- Database Triggers for Saintrix
-- Execute these commands in the Supabase SQL Editor

-- Function to log credit report uploads
CREATE OR REPLACE FUNCTION log_credit_report_upload()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into ai_logs when a credit report is uploaded
  INSERT INTO ai_logs (user_id, intent, input_data, response, timestamp)
  VALUES (
    NEW.user_id,
    'credit_report_upload',
    jsonb_build_object(
      'file_url', NEW.file_url,
      'source', NEW.source,
      'report_id', NEW.id
    ),
    jsonb_build_object(
      'status', 'uploaded',
      'message', 'Credit report uploaded successfully'
    ),
    NOW()
  );
  
  -- Create a notification for the user
  INSERT INTO notifications (user_id, message, read, created_at)
  VALUES (
    NEW.user_id,
    'Your credit report has been uploaded and is being processed.',
    false,
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for credit report uploads
CREATE TRIGGER trigger_log_credit_report_upload
  AFTER INSERT ON credit_reports
  FOR EACH ROW
  EXECUTE FUNCTION log_credit_report_upload();

-- Function to log dispute letter creation
CREATE OR REPLACE FUNCTION log_dispute_letter_creation()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into ai_logs when a dispute letter is created
  INSERT INTO ai_logs (user_id, intent, input_data, response, timestamp)
  VALUES (
    NEW.user_id,
    'dispute_letter_generation',
    jsonb_build_object(
      'credit_bureau', NEW.credit_bureau,
      'type', NEW.type,
      'generated_by', NEW.generated_by,
      'dispute_id', NEW.id
    ),
    jsonb_build_object(
      'status', 'created',
      'message', 'Dispute letter generated successfully'
    ),
    NOW()
  );
  
  -- Create a notification for the user
  INSERT INTO notifications (user_id, message, read, created_at)
  VALUES (
    NEW.user_id,
    CASE 
      WHEN NEW.generated_by = 'ai' THEN 
        'AI has generated a new dispute letter for ' || NEW.credit_bureau || '.'
      ELSE 
        'A new dispute letter has been created for ' || NEW.credit_bureau || '.'
    END,
    false,
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for dispute letter creation
CREATE TRIGGER trigger_log_dispute_letter_creation
  AFTER INSERT ON dispute_letters
  FOR EACH ROW
  EXECUTE FUNCTION log_dispute_letter_creation();

-- Function to log dispute status updates
CREATE OR REPLACE FUNCTION log_dispute_status_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if status actually changed
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    -- Insert into ai_logs
    INSERT INTO ai_logs (user_id, intent, input_data, response, timestamp)
    VALUES (
      NEW.user_id,
      'dispute_status_update',
      jsonb_build_object(
        'dispute_id', NEW.id,
        'old_status', OLD.status,
        'new_status', NEW.status,
        'credit_bureau', NEW.credit_bureau
      ),
      jsonb_build_object(
        'status', 'updated',
        'message', 'Dispute status updated from ' || OLD.status || ' to ' || NEW.status
      ),
      NOW()
    );
    
    -- Create a notification for the user
    INSERT INTO notifications (user_id, message, read, created_at)
    VALUES (
      NEW.user_id,
      'Your dispute with ' || NEW.credit_bureau || ' has been updated to: ' || NEW.status,
      false,
      NOW()
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for dispute status updates
CREATE TRIGGER trigger_log_dispute_status_update
  AFTER UPDATE ON dispute_letters
  FOR EACH ROW
  EXECUTE FUNCTION log_dispute_status_update();

-- Function to log user activity
CREATE OR REPLACE FUNCTION log_user_activity()
RETURNS TRIGGER AS $$
BEGIN
  -- Log user login activity
  INSERT INTO client_activity_log (
    user_id, 
    activity_type, 
    description, 
    metadata, 
    created_at
  )
  VALUES (
    NEW.id,
    'user_login',
    'User logged in',
    jsonb_build_object(
      'email', NEW.email,
      'last_sign_in', NEW.last_sign_in_at
    ),
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Note: This trigger would be on auth.users table, which requires special permissions
-- For now, we'll handle login logging in the application code

-- Function to automatically set user role for new signups
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, full_name, role, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'client',
    NOW()
  );
  
  -- Log the signup activity
  INSERT INTO client_activity_log (
    user_id,
    activity_type,
    description,
    metadata,
    created_at
  )
  VALUES (
    NEW.id,
    'user_signup',
    'New user account created',
    jsonb_build_object(
      'email', NEW.email,
      'signup_method', 'email'
    ),
    NOW()
  );
  
  -- Send welcome notification
  INSERT INTO notifications (user_id, message, read, created_at)
  VALUES (
    NEW.id,
    'Welcome to Saintrix! Your credit repair journey starts now.',
    false,
    NOW()
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for new user signups (on auth.users table)
-- Note: This requires special permissions and may need to be set up through Supabase dashboard
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW
--   EXECUTE FUNCTION handle_new_user();

