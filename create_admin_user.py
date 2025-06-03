#!/usr/bin/env python3
"""
Create admin user in Supabase Auth
"""
import requests
import json

# Supabase configuration
SUPABASE_URL = "https://ggdahlksbsqpmfbhtcqd.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZGFobGtzYnNxcG1mYmh0Y3FkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg5MDc4NywiZXhwIjoyMDY0NDY2Nzg3fQ.8biObYZJnOWcSELNQbSmmbwwsPG0G_SuxQdMM9YEVGA"

# Admin user details
ADMIN_EMAIL = "chukofilmstv@gmail.com"
ADMIN_PASSWORD = "1Amsogood"

def create_admin_user():
    """Create admin user in Supabase Auth"""
    
    # Headers for Supabase Admin API
    headers = {
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY
    }
    
    print("🔐 Creating admin user in Supabase Auth...")
    
    # Step 1: Create user in auth.users using Admin API
    auth_url = f"{SUPABASE_URL}/auth/v1/admin/users"
    
    user_data = {
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD,
        "email_confirm": True,  # Skip email confirmation
        "user_metadata": {
            "role": "admin",
            "full_name": "Admin User"
        }
    }
    
    print(f"📧 Creating auth user: {ADMIN_EMAIL}")
    response = requests.post(auth_url, headers=headers, json=user_data)
    
    if response.status_code == 200 or response.status_code == 201:
        user_auth_data = response.json()
        user_id = user_auth_data.get("id")
        print(f"✅ Auth user created successfully!")
        print(f"   User ID: {user_id}")
        print(f"   Email: {user_auth_data.get('email')}")
        
        # Step 2: Create corresponding record in public.users
        print("👤 Creating user record in public.users table...")
        
        public_user_data = {
            "id": user_id,
            "email": ADMIN_EMAIL,
            "full_name": "Admin User",
            "role": "admin"
        }
        
        # Insert into public.users table
        users_url = f"{SUPABASE_URL}/rest/v1/users"
        users_response = requests.post(users_url, headers=headers, json=public_user_data)
        
        if users_response.status_code == 201:
            print("✅ Public user record created successfully!")
            print(f"   Role: admin")
            print(f"   Email: {ADMIN_EMAIL}")
            
            # Step 3: Verify the user was created properly
            print("🔍 Verifying user creation...")
            
            # Check auth.users
            auth_check_url = f"{SUPABASE_URL}/auth/v1/admin/users/{user_id}"
            auth_check = requests.get(auth_check_url, headers=headers)
            
            if auth_check.status_code == 200:
                print("✅ User verified in auth.users")
            else:
                print("❌ User verification failed in auth.users")
            
            # Check public.users
            users_check_url = f"{SUPABASE_URL}/rest/v1/users?id=eq.{user_id}"
            users_check = requests.get(users_check_url, headers=headers)
            
            if users_check.status_code == 200 and users_check.json():
                user_record = users_check.json()[0]
                print("✅ User verified in public.users")
                print(f"   ID: {user_record.get('id')}")
                print(f"   Email: {user_record.get('email')}")
                print(f"   Role: {user_record.get('role')}")
                print(f"   Created: {user_record.get('created_at')}")
            else:
                print("❌ User verification failed in public.users")
            
            print("\n🎉 ADMIN USER SETUP COMPLETE!")
            print(f"📧 Email: {ADMIN_EMAIL}")
            print(f"🔑 Password: {ADMIN_PASSWORD}")
            print(f"👑 Role: admin")
            print("\n✅ You can now sign in to the application with these credentials.")
            
        else:
            print(f"❌ Failed to create public user record: {users_response.status_code}")
            print(f"   Response: {users_response.text}")
            
    else:
        print(f"❌ Failed to create auth user: {response.status_code}")
        print(f"   Response: {response.text}")
        
        # Check if user already exists
        if "already been registered" in response.text or response.status_code == 422:
            print("🔍 User might already exist. Checking...")
            
            # Try to find existing user
            list_users_url = f"{SUPABASE_URL}/auth/v1/admin/users"
            list_response = requests.get(list_users_url, headers=headers)
            
            if list_response.status_code == 200:
                users = list_response.json().get("users", [])
                existing_user = next((u for u in users if u.get("email") == ADMIN_EMAIL), None)
                
                if existing_user:
                    user_id = existing_user.get("id")
                    print(f"✅ Found existing auth user: {user_id}")
                    
                    # Check if public.users record exists
                    users_check_url = f"{SUPABASE_URL}/rest/v1/users?id=eq.{user_id}"
                    users_check = requests.get(users_check_url, headers=headers)
                    
                    if users_check.status_code == 200 and users_check.json():
                        print("✅ Public user record already exists")
                        user_record = users_check.json()[0]
                        print(f"   Role: {user_record.get('role')}")
                    else:
                        print("⚠️  Creating missing public user record...")
                        public_user_data = {
                            "id": user_id,
                            "email": ADMIN_EMAIL,
                            "full_name": "Admin User",
                            "role": "admin"
                        }
                        
                        users_url = f"{SUPABASE_URL}/rest/v1/users"
                        users_response = requests.post(users_url, headers=headers, json=public_user_data)
                        
                        if users_response.status_code == 201:
                            print("✅ Public user record created!")
                        else:
                            print(f"❌ Failed to create public user record: {users_response.text}")

if __name__ == "__main__":
    create_admin_user()
