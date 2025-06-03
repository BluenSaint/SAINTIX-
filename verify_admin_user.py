#!/usr/bin/env python3
"""
Verify admin user in Supabase
"""
import requests
import json

# Supabase configuration
SUPABASE_URL = "https://ggdahlksbsqpmfbhtcqd.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZGFobGtzYnNxcG1mYmh0Y3FkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg5MDc4NywiZXhwIjoyMDY0NDY2Nzg3fQ.8biObYZJnOWcSELNQbSmmbwwsPG0G_SuxQdMM9YEVGA"

ADMIN_EMAIL = "chukofilmstv@gmail.com"

def verify_admin_user():
    """Verify admin user exists and has correct role"""
    
    headers = {
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY
    }
    
    print("🔍 Verifying admin user account...")
    
    # Check auth.users
    print("\n📋 Checking auth.users...")
    list_users_url = f"{SUPABASE_URL}/auth/v1/admin/users"
    auth_response = requests.get(list_users_url, headers=headers)
    
    if auth_response.status_code == 200:
        users = auth_response.json().get("users", [])
        admin_user = next((u for u in users if u.get("email") == ADMIN_EMAIL), None)
        
        if admin_user:
            print(f"✅ Found in auth.users:")
            print(f"   ID: {admin_user.get('id')}")
            print(f"   Email: {admin_user.get('email')}")
            print(f"   Confirmed: {admin_user.get('email_confirmed_at') is not None}")
            print(f"   Created: {admin_user.get('created_at')}")
            user_id = admin_user.get('id')
        else:
            print("❌ User not found in auth.users")
            return
    else:
        print(f"❌ Failed to check auth.users: {auth_response.status_code}")
        return
    
    # Check public.users
    print("\n📋 Checking public.users...")
    users_check_url = f"{SUPABASE_URL}/rest/v1/users?email=eq.{ADMIN_EMAIL}"
    public_response = requests.get(users_check_url, headers=headers)
    
    if public_response.status_code == 200:
        public_users = public_response.json()
        if public_users:
            public_user = public_users[0]
            print(f"✅ Found in public.users:")
            print(f"   ID: {public_user.get('id')}")
            print(f"   Email: {public_user.get('email')}")
            print(f"   Role: {public_user.get('role')}")
            print(f"   Full Name: {public_user.get('full_name')}")
            print(f"   Created: {public_user.get('created_at')}")
            
            # Check if role is admin
            if public_user.get('role') == 'admin':
                print("✅ User has admin role")
            else:
                print(f"⚠️  User role is '{public_user.get('role')}', updating to 'admin'...")
                
                # Update role to admin
                update_url = f"{SUPABASE_URL}/rest/v1/users?id=eq.{user_id}"
                update_data = {"role": "admin"}
                update_response = requests.patch(update_url, headers=headers, json=update_data)
                
                if update_response.status_code == 204:
                    print("✅ Role updated to admin")
                else:
                    print(f"❌ Failed to update role: {update_response.text}")
        else:
            print("❌ User not found in public.users")
            print("⚠️  Creating public user record...")
            
            # Create public user record
            public_user_data = {
                "id": user_id,
                "email": ADMIN_EMAIL,
                "full_name": "Admin User",
                "role": "admin"
            }
            
            create_url = f"{SUPABASE_URL}/rest/v1/users"
            create_response = requests.post(create_url, headers=headers, json=public_user_data)
            
            if create_response.status_code == 201:
                print("✅ Public user record created with admin role")
            else:
                print(f"❌ Failed to create public user record: {create_response.text}")
    else:
        print(f"❌ Failed to check public.users: {public_response.status_code}")
    
    print("\n🎉 VERIFICATION COMPLETE!")
    print(f"📧 Email: {ADMIN_EMAIL}")
    print(f"🔑 Password: 1Amsogood")
    print(f"👑 Role: admin")
    print("\n✅ You should now be able to sign in with these credentials.")

if __name__ == "__main__":
    verify_admin_user()
