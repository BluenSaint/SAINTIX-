#!/usr/bin/env node

/**
 * Pre-Build Environment Validation Script
 * 
 * This script validates all required environment variables before the build process starts.
 * It prevents deployment failures by catching missing or invalid environment variables early.
 * 
 * Usage: node scripts/validate-env.js
 */

const fs = require('fs')
const path = require('path')

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
}

// Environment variable definitions
const envVars = {
  // Always required
  required: [
    {
      name: 'NEXT_PUBLIC_SUPABASE_URL',
      description: 'Supabase project URL',
      example: 'https://your-project.supabase.co',
      validation: (value) => {
        if (!value.startsWith('https://') || !value.includes('.supabase.co')) {
          return 'Must be a valid Supabase URL (https://your-project.supabase.co)'
        }
        return null
      }
    },
    {
      name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      description: 'Supabase anonymous/public key',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      validation: (value) => {
        if (!value.startsWith('eyJ') || value.length < 100) {
          return 'Must be a valid Supabase anon key (JWT token)'
        }
        return null
      }
    }
  ],
  
  // Required in production only
  production: [
    {
      name: 'SUPABASE_SERVICE_ROLE_KEY',
      description: 'Supabase service role key (admin access)',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      validation: (value) => {
        if (!value.startsWith('eyJ') || value.length < 100) {
          return 'Must be a valid Supabase service role key (JWT token)'
        }
        return null
      }
    }
  ],
  
  // Optional but recommended
  optional: [
    {
      name: 'VERCEL_URL',
      description: 'Vercel deployment URL (auto-set by Vercel)',
      example: 'your-app.vercel.app'
    },
    {
      name: 'VERCEL_ENV',
      description: 'Vercel environment (auto-set by Vercel)',
      example: 'production'
    }
  ]
}

// Load environment variables from .env files
function loadEnvFiles() {
  const envFiles = ['.env.local', '.env.production', '.env.development', '.env']
  
  for (const file of envFiles) {
    const filePath = path.join(process.cwd(), file)
    if (fs.existsSync(filePath)) {
      console.log(`${colors.blue}📄 Loading ${file}${colors.reset}`)
      const content = fs.readFileSync(filePath, 'utf8')
      
      content.split('\n').forEach(line => {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=')
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').replace(/^["']|["']$/g, '')
            if (!process.env[key]) {
              process.env[key] = value
            }
          }
        }
      })
    }
  }
}

// Validate a single environment variable
function validateEnvVar(envVar) {
  const value = process.env[envVar.name]
  const result = {
    name: envVar.name,
    value: value,
    exists: !!value,
    valid: true,
    error: null
  }
  
  if (!value) {
    result.valid = false
    result.error = 'Missing'
    return result
  }
  
  if (envVar.validation) {
    const validationError = envVar.validation(value)
    if (validationError) {
      result.valid = false
      result.error = validationError
    }
  }
  
  return result
}

// Main validation function
function validateEnvironment() {
  console.log(`${colors.bold}${colors.cyan}🔍 Environment Variable Validation${colors.reset}\n`)
  
  const isProduction = process.env.NODE_ENV === 'production'
  const isVercel = !!process.env.VERCEL
  
  console.log(`Environment: ${colors.yellow}${process.env.NODE_ENV || 'development'}${colors.reset}`)
  console.log(`Platform: ${colors.yellow}${isVercel ? 'Vercel' : 'Local'}${colors.reset}\n`)
  
  let hasErrors = false
  let hasWarnings = false
  
  // Validate required variables
  console.log(`${colors.bold}Required Variables:${colors.reset}`)
  for (const envVar of envVars.required) {
    const result = validateEnvVar(envVar)
    
    if (result.valid) {
      console.log(`  ${colors.green}✅ ${result.name}${colors.reset}`)
    } else {
      console.log(`  ${colors.red}❌ ${result.name}: ${result.error}${colors.reset}`)
      console.log(`     ${colors.yellow}Description: ${envVar.description}${colors.reset}`)
      console.log(`     ${colors.yellow}Example: ${envVar.example}${colors.reset}`)
      hasErrors = true
    }
  }
  
  // Validate production-only variables
  if (isProduction) {
    console.log(`\n${colors.bold}Production Variables:${colors.reset}`)
    for (const envVar of envVars.production) {
      const result = validateEnvVar(envVar)
      
      if (result.valid) {
        console.log(`  ${colors.green}✅ ${result.name}${colors.reset}`)
      } else {
        console.log(`  ${colors.red}❌ ${result.name}: ${result.error}${colors.reset}`)
        console.log(`     ${colors.yellow}Description: ${envVar.description}${colors.reset}`)
        console.log(`     ${colors.yellow}Example: ${envVar.example}${colors.reset}`)
        hasErrors = true
      }
    }
  } else {
    console.log(`\n${colors.bold}Production Variables (skipped in development):${colors.reset}`)
    for (const envVar of envVars.production) {
      const result = validateEnvVar(envVar)
      if (result.exists) {
        console.log(`  ${colors.green}✅ ${result.name} (available)${colors.reset}`)
      } else {
        console.log(`  ${colors.yellow}⚠️  ${result.name} (not required in development)${colors.reset}`)
      }
    }
  }
  
  // Check optional variables
  console.log(`\n${colors.bold}Optional Variables:${colors.reset}`)
  for (const envVar of envVars.optional) {
    const result = validateEnvVar(envVar)
    
    if (result.exists) {
      console.log(`  ${colors.green}✅ ${result.name}${colors.reset}`)
    } else {
      console.log(`  ${colors.yellow}⚠️  ${result.name} (optional)${colors.reset}`)
      hasWarnings = true
    }
  }
  
  // Summary
  console.log(`\n${colors.bold}Validation Summary:${colors.reset}`)
  
  if (hasErrors) {
    console.log(`${colors.red}❌ Validation failed! Missing required environment variables.${colors.reset}`)
    console.log(`\n${colors.bold}Next steps:${colors.reset}`)
    console.log(`1. Add missing variables to your .env.local file`)
    console.log(`2. For Vercel deployment, add them to your Vercel project settings`)
    console.log(`3. Run this script again to verify`)
    
    if (isVercel) {
      console.log(`\n${colors.cyan}Vercel Environment Variables:${colors.reset}`)
      console.log(`https://vercel.com/dashboard -> Your Project -> Settings -> Environment Variables`)
    }
    
    process.exit(1)
  } else {
    console.log(`${colors.green}✅ All required environment variables are present and valid!${colors.reset}`)
    
    if (hasWarnings) {
      console.log(`${colors.yellow}⚠️  Some optional variables are missing, but build can proceed.${colors.reset}`)
    }
    
    console.log(`${colors.green}🚀 Ready for build!${colors.reset}`)
  }
}

// Generate environment file templates
function generateEnvTemplates() {
  const templates = {
    '.env.local.example': `# Saintrix Environment Variables
# Copy this file to .env.local and fill in your actual values

# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Service Role Key (Required for production)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Vercel (Auto-set by Vercel, optional for local development)
# VERCEL_URL=your-app.vercel.app
# VERCEL_ENV=production
`,
    
    '.env.production.example': `# Production Environment Variables
# These should be set in your Vercel project settings

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
`,
    
    '.env.development.example': `# Development Environment Variables
# For local development only

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Service role key is optional in development
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
`
  }
  
  console.log(`${colors.bold}${colors.magenta}📝 Generating environment templates...${colors.reset}\n`)
  
  for (const [filename, content] of Object.entries(templates)) {
    const filePath = path.join(process.cwd(), filename)
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content)
      console.log(`${colors.green}✅ Created ${filename}${colors.reset}`)
    } else {
      console.log(`${colors.yellow}⚠️  ${filename} already exists (skipped)${colors.reset}`)
    }
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--generate-templates')) {
    generateEnvTemplates()
    return
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`${colors.bold}Environment Validation Script${colors.reset}
    
Usage:
  node scripts/validate-env.js                 Validate environment variables
  node scripts/validate-env.js --generate-templates  Generate .env template files
  node scripts/validate-env.js --help          Show this help message

This script validates all required environment variables for the Saintrix application.
It should be run before building or deploying to catch configuration issues early.
`)
    return
  }
  
  // Load environment files
  loadEnvFiles()
  
  // Run validation
  validateEnvironment()
}

// Run the script
if (require.main === module) {
  main()
}

module.exports = {
  validateEnvironment,
  generateEnvTemplates,
  envVars
}

