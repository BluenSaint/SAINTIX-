#!/usr/bin/env python3
"""
Supabase Database Schema Manager for Saintrix
This script helps manage the database schema and verify table structures.
"""

import requests
import json
import sys

# Supabase configuration
SUPABASE_URL = "https://ggdahlksbsqpmfbhtcqd.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZGFobGtzYnNxcG1mYmh0Y3FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4OTA3ODcsImV4cCI6MjA2NDQ2Njc4N30.l2ztTe-5tohX3fhlTBWIIOt10z52NIzbOxKYxY2sSIY"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZGFobGtzYnNxcG1mYmh0Y3FkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg5MDc4NywiZXhwIjoyMDY0NDY2Nzg3fQ.8biObYZJnOWcSELNQbSmmbwwsPG0G_SuxQdMM9YEVGA"

def get_headers(use_service_key=False):
    """Get headers for Supabase API requests"""
    key = SUPABASE_SERVICE_KEY if use_service_key else SUPABASE_ANON_KEY
    return {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }

def check_table_exists(table_name):
    """Check if a table exists by trying to query it"""
    try:
        url = f"{SUPABASE_URL}/rest/v1/{table_name}?limit=1"
        response = requests.get(url, headers=get_headers())
        return response.status_code == 200
    except Exception as e:
        print(f"Error checking table {table_name}: {e}")
        return False

def get_table_schema(table_name):
    """Get table schema information"""
    try:
        url = f"{SUPABASE_URL}/rest/v1/{table_name}?limit=0"
        response = requests.get(url, headers=get_headers())
        if response.status_code == 200:
            return response.headers.get('content-range', 'Unknown')
        else:
            return f"Error: {response.status_code}"
    except Exception as e:
        return f"Error: {e}"

def main():
    """Main function to check database status"""
    print("🔍 Checking Saintrix Database Schema...")
    print("=" * 50)
    
    # Required tables from the specification
    required_tables = [
        "users",
        "credit_reports", 
        "dispute_letters",
        "ai_logs",
        "notifications",
        "payments",
        "admin_notes",
        "client_activity_log"
    ]
    
    existing_tables = []
    missing_tables = []
    
    for table in required_tables:
        if check_table_exists(table):
            existing_tables.append(table)
            print(f"✅ {table} - EXISTS")
        else:
            missing_tables.append(table)
            print(f"❌ {table} - MISSING")
    
    print("\n📊 Summary:")
    print(f"Existing tables: {len(existing_tables)}")
    print(f"Missing tables: {len(missing_tables)}")
    
    if missing_tables:
        print(f"\n🔧 Tables to create: {', '.join(missing_tables)}")
    
    return existing_tables, missing_tables

if __name__ == "__main__":
    main()
