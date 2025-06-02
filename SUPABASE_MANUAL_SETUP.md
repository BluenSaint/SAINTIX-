# 🚨 CRITICAL: Manual Supabase Configuration Required

## Missing Tables in Live Environment

The following tables need to be created manually in the Supabase dashboard:

### 1. admin_notes Table
```sql
CREATE TABLE admin_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    note TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. client_activity_log Table
```sql
CREATE TABLE client_activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL,
    description TEXT,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Required Manual Actions in Supabase Dashboard

### Step 1: Create Missing Tables
1. Go to https://supabase.com/dashboard
2. Navigate to your project: https://ggdahlksbsqpmfbhtcqd.supabase.co
3. Go to SQL Editor
4. Execute the SQL scripts above

### Step 2: Apply RLS Policies
Execute the complete RLS policy script: `setup_rls_policies.sql`

### Step 3: Create Storage Bucket
1. Go to Storage section
2. Create bucket named: `client_uploads`
3. Set as private (not public)
4. Apply storage policies from: `setup_storage_bucket.sql`

### Step 4: Setup Database Triggers
Execute the trigger script: `setup_database_triggers.sql`

## ⚠️ IMPORTANT NOTES

- All SQL scripts are ready in the repository
- Tables must be created in the public schema only
- RLS must be enabled on all tables
- Storage bucket must be named exactly: `client_uploads`
- All configurations target the live project: https://ggdahlksbsqpmfbhtcqd.supabase.co

## Verification Commands

After manual setup, run this to verify:
```bash
python3 check_schema.py
```

All tables should show as ✅ EXISTS

