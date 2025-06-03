#!/usr/bin/env python3
"""
Alternative approach: Create tables using Supabase REST API
This attempts to create the missing tables using available endpoints
"""

import requests
import json

# Supabase configuration
SUPABASE_URL = "https://ggdahlksbsqpmfbhtcqd.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZGFobGtzYnNxcG1mYmh0Y3FkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg5MDc4NywiZXhwIjoyMDY0NDY2Nzg3fQ.8biObYZJnOWcSELNQbSmmbwwsPG0G_SuxQdMM9YEVGA"

def get_headers():
    return {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json"
    }

def create_admin_notes_table():
    """Attempt to create admin_notes table using API"""
    print("🔧 Attempting to create admin_notes table...")
    
    # Try to insert a dummy record to trigger table creation
    # This won't work but let's see what error we get
    try:
        url = f"{SUPABASE_URL}/rest/v1/admin_notes"
        dummy_data = {
            "user_id": "00000000-0000-0000-0000-000000000000",
            "admin_id": "00000000-0000-0000-0000-000000000000", 
            "note": "test",
            "category": "general",
            "priority": "normal"
        }
        
        response = requests.post(url, headers=get_headers(), json=dummy_data)
        print(f"Response: {response.status_code} - {response.text}")
        
        if response.status_code == 201:
            print("✅ admin_notes table exists or was created")
            return True
        else:
            print("❌ admin_notes table creation failed")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def create_client_activity_log_table():
    """Attempt to create client_activity_log table using API"""
    print("🔧 Attempting to create client_activity_log table...")
    
    try:
        url = f"{SUPABASE_URL}/rest/v1/client_activity_log"
        dummy_data = {
            "user_id": "00000000-0000-0000-0000-000000000000",
            "activity_type": "test",
            "description": "test activity",
            "metadata": {}
        }
        
        response = requests.post(url, headers=get_headers(), json=dummy_data)
        print(f"Response: {response.status_code} - {response.text}")
        
        if response.status_code == 201:
            print("✅ client_activity_log table exists or was created")
            return True
        else:
            print("❌ client_activity_log table creation failed")
            return False
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def check_table_exists(table_name):
    """Check if a table exists"""
    try:
        url = f"{SUPABASE_URL}/rest/v1/{table_name}?limit=1"
        response = requests.get(url, headers=get_headers())
        return response.status_code == 200
    except:
        return False

def main():
    print("🔧 Alternative table creation approach...")
    print("=" * 50)
    
    # Check current status
    tables = ["admin_notes", "client_activity_log"]
    for table in tables:
        if check_table_exists(table):
            print(f"✅ {table} already exists")
        else:
            print(f"❌ {table} missing - attempting creation")
            if table == "admin_notes":
                create_admin_notes_table()
            elif table == "client_activity_log":
                create_client_activity_log_table()
    
    print("\n📋 Final Status:")
    all_tables = ["users", "credit_reports", "dispute_letters", "ai_logs", 
                  "notifications", "payments", "admin_notes", "client_activity_log"]
    
    existing = 0
    for table in all_tables:
        if check_table_exists(table):
            print(f"✅ {table}")
            existing += 1
        else:
            print(f"❌ {table}")
    
    print(f"\n📊 Summary: {existing}/8 tables exist")
    
    if existing == 8:
        print("🎉 All tables exist! Backend setup complete!")
        return True
    else:
        print("⚠️  Manual intervention still required")
        return False

if __name__ == "__main__":
    main()
