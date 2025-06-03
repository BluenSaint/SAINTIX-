#!/usr/bin/env python3
"""
Execute SQL commands on Supabase database
"""

import requests
import json

# Supabase configuration
SUPABASE_URL = "https://ggdahlksbsqpmfbhtcqd.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZGFobGtzYnNxcG1mYmh0Y3FkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg5MDc4NywiZXhwIjoyMDY0NDY2Nzg3fQ.8biObYZJnOWcSELNQbSmmbwwsPG0G_SuxQdMM9YEVGA"

def execute_sql(sql_command):
    """Execute SQL command using Supabase RPC"""
    url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "sql": sql_command
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error executing SQL: {e}")
        return False

def create_missing_tables():
    """Create the missing tables"""
    
    # Read the SQL file
    try:
        with open('create_missing_tables.sql', 'r') as f:
            sql_content = f.read()
        
        # Split by semicolon and execute each statement
        statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]
        
        for i, statement in enumerate(statements):
            print(f"\n🔧 Executing statement {i+1}/{len(statements)}...")
            print(f"SQL: {statement[:100]}...")
            
            success = execute_sql(statement)
            if success:
                print("✅ Success")
            else:
                print("❌ Failed")
                
    except FileNotFoundError:
        print("❌ SQL file not found")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🚀 Creating missing Supabase tables...")
    create_missing_tables()
