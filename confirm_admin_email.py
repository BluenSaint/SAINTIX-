#!/usr/bin/env python3
"""
Confirm admin user email in Supabase Auth
"""
import requests
import json

# Supabase configuration
SUPABASE_URL = "https://ggdahlksbsqpmfbhtcqd.supabase.co"
SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZGFobGtzYnNxcG1mYmh0Y3FkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODg5MDc4NywiZXhwIjoyMDY0NDY2Nzg3fQ.8biObYZJnOWcSELNQbSmmbwwsPG0G_SuxQdMM9YEVGA"

ADMIN_EMAIL = "chukofilmstv@gmail.com"
USER_ID = "fd532a8b-e61f-4afc-be69-b30b85605a87"

def confirm_admin_email():
    """Confirm admin user email"""
    
    headers = {
        "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY
    }
    
    print("📧 Confirming admin user email...")
    
    # Update user to confirm email
    update_url = f"{SUPABASE_URL}/auth/v1/admin/users/{USER_ID}"
    
    update_data = {
        "email_confirm": True
    }
    
    response = requests.put(update_url, headers=headers, json=update_data)
    
    if response.status_code == 200:
        user_data = response.json()
        print("✅ Email confirmed successfully!")
        print(f"   Email: {user_data.get('email')}")
        print(f"   Confirmed: {user_data.get('email_confirmed_at') is not None}")
        print(f"   ID: {user_data.get('id')}")
        
        print("\n🎉 ADMIN USER SETUP COMPLETE!")
        print(f"📧 Email: {ADMIN_EMAIL}")
        print(f"🔑 Password: 1Amsogood")
        print(f"👑 Role: admin")
        print(f"✅ Email Confirmed: Yes")
        print("\n✅ You can now sign in to the application with these credentials.")
        
    else:
        print(f"❌ Failed to confirm email: {response.status_code}")
        print(f"   Response: {response.text}")

if __name__ == "__main__":
    confirm_admin_email()

