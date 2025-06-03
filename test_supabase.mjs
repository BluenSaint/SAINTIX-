#!/usr/bin/env node

// Test Supabase connection
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testing Supabase Connection...')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : 'Not found')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    // Test basic connection
    console.log('\n📡 Testing basic connection...')
    const { data, error } = await supabase.from('users').select('count').limit(1)
    
    if (error) {
      console.error('❌ Connection failed:', error.message)
      return false
    }
    
    console.log('✅ Connection successful!')
    
    // Test each table
    const tables = ['users', 'credit_reports', 'dispute_letters', 'ai_logs', 'notifications', 'payments']
    
    console.log('\n📊 Testing table access...')
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('*').limit(1)
        if (error) {
          console.log(`❌ ${table}: ${error.message}`)
        } else {
          console.log(`✅ ${table}: Accessible`)
        }
      } catch (err) {
        console.log(`❌ ${table}: ${err.message}`)
      }
    }
    
    return true
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    return false
  }
}

testConnection().then(success => {
  if (success) {
    console.log('\n🎉 All tests passed!')
  } else {
    console.log('\n💥 Some tests failed')
  }
  process.exit(success ? 0 : 1)
})
