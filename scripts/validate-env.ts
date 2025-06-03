#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const process = require("process");

/**
 * Environment Variable Validation Script (TypeScript)
 * 
 * Validates required environment variables before build
 * Prevents deployment failures due to missing configuration
 * 
 * Usage: node scripts/validate-env.tsx
 */

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
};

// Environment variable definitions
// EnvVar: { name: string, description: string, example: string }
// EnvVarConfig: { required: EnvVar[], production: EnvVar[], optional: EnvVar[] }

const ENV_VARS = {
  // Required for all environments
  required: [
    {
      name: 'NEXT_PUBLIC_SUPABASE_URL',
      description: 'Supabase project URL',
      example: 'https://your-project.supabase.co'
    },
    {
      name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      description: 'Supabase anonymous/public key',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  ],
  // Required only in production
  production: [
    {
      name: 'SUPABASE_SERVICE_ROLE_KEY',
      description: 'Supabase service role key (backend only)',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    }
  ],
  // Optional but recommended
  optional: [
    {
      name: 'VERCEL_URL',
      description: 'Vercel deployment URL',
      example: 'your-app.vercel.app'
    },
    {
      name: 'VERCEL_ENV',
      description: 'Vercel environment',
      example: 'production'
    }
  ]
};

/**
 * Load environment variables from .env files
 */
function loadEnvFiles() {
  const envFiles = ['.env.local', '.env.production', '.env'];
  
  for (const file of envFiles) {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      console.log(`${colors.blue}📄 Loading ${file}${colors.reset}`);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Parse .env file content
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...valueParts] = trimmed.split('=');
          if (key && valueParts.length > 0) {
            const value = valueParts.join('=').replace(/^["']|["']$/g, '');
            if (!process.env[key]) {
              process.env[key] = value;
            }
          }
        }
      });
    }
  }
}

/**
 * Validate a single environment variable
 */
function validateEnvVar(envVar) {
  const value = process.env[envVar.name];
  const isPresent = value && value.trim() !== '';
  
  if (isPresent) {
    // Basic validation for Supabase URLs and keys
    if (envVar.name === 'NEXT_PUBLIC_SUPABASE_URL') {
      if (!value.startsWith('https://') || !value.includes('.supabase.co')) {
        console.log(`  ${colors.red}❌ ${envVar.name} (invalid format - should be https://your-project.supabase.co)${colors.reset}`);
        return false;
      }
    }
    
    if (envVar.name.includes('KEY') && value.length < 50) {
      console.log(`  ${colors.yellow}⚠️  ${envVar.name} (seems too short for a valid key)${colors.reset}`);
    }
    
    console.log(`  ${colors.green}✅ ${envVar.name}${colors.reset}`);
    return true;
  } else {
    console.log(`  ${colors.red}❌ ${envVar.name} (missing)${colors.reset}`);
    return false;
  }
}

/**
 * Generate environment file templates
 */
function generateEnvTemplates() {
  // TemplateConfig: { title: string, vars: EnvVar[] }

  const templates = {
    '.env.local.example': {
      title: 'Local Development Environment Variables',
      vars: [...ENV_VARS.required, ...ENV_VARS.production, ...ENV_VARS.optional]
    },
    '.env.production.example': {
      title: 'Production Environment Variables',
      vars: [...ENV_VARS.required, ...ENV_VARS.production]
    }
  };

  Object.entries(templates).forEach(([filename, config]) => {
    const content = [
      `# ${config.title}`,
      `# Copy this file to ${filename.replace('.example', '')} and fill in your values`,
      `# Generated automatically by validate-env.tsx`,
      '',
      ...config.vars.map(envVar => [
        `# ${envVar.description}`,
        `${envVar.name}=${envVar.example}`,
        ''
      ].join('\n'))
    ].join('\n');

    fs.writeFileSync(filename, content);
    console.log(`${colors.green}✅ Generated ${filename}${colors.reset}`);
  });
}

/**
 * Main validation function
 */
function validateEnvironment() {
  console.log(`${colors.bold}${colors.cyan}🔍 Environment Variable Validation${colors.reset}`);
  
  // Load environment files
  loadEnvFiles();
  
  // Determine environment
  const isProduction = process.env.NODE_ENV === 'production' || 
                      process.env.VERCEL_ENV === 'production' ||
                      !!process.env.VERCEL;
  
  const environment = isProduction ? 'production' : 'development';
  const platform = process.env.VERCEL ? 'Vercel' : 'Local';
  
  console.log(`Environment: ${colors.bold}${environment}${colors.reset}`);
  console.log(`Platform: ${colors.bold}${platform}${colors.reset}`);
  console.log('');

  let allValid = true;
  let hasWarnings = false;

  // Validate required variables
  console.log(`${colors.bold}Required Variables:${colors.reset}`);
  for (const envVar of ENV_VARS.required) {
    if (!validateEnvVar(envVar)) {
      allValid = false;
    }
  }

  // Validate production variables (only in production)
  if (isProduction) {
    console.log(`${colors.bold}Production Variables:${colors.reset}`);
    for (const envVar of ENV_VARS.production) {
      if (!validateEnvVar(envVar)) {
        allValid = false;
      }
    }
  } else {
    console.log(`${colors.bold}Production Variables (skipped in development):${colors.reset}`);
    for (const envVar of ENV_VARS.production) {
      const isPresent = process.env[envVar.name] && process.env[envVar.name].trim() !== '';
      if (isPresent) {
        console.log(`  ${colors.green}✅ ${envVar.name} (available)${colors.reset}`);
      } else {
        console.log(`  ${colors.yellow}⚠️  ${envVar.name} (not required in development)${colors.reset}`);
      }
    }
  }

  // Check optional variables
  console.log(`${colors.bold}Optional Variables:${colors.reset}`);
  for (const envVar of ENV_VARS.optional) {
    const isPresent = process.env[envVar.name] && process.env[envVar.name].trim() !== '';
    if (isPresent) {
      console.log(`  ${colors.green}✅ ${envVar.name}${colors.reset}`);
    } else {
      console.log(`  ${colors.yellow}⚠️  ${envVar.name} (optional)${colors.reset}`);
      hasWarnings = true;
    }
  }

  console.log('');
  console.log(`${colors.bold}Validation Summary:${colors.reset}`);

  if (allValid) {
    console.log(`${colors.green}✅ All required environment variables are present and valid!${colors.reset}`);
    if (hasWarnings) {
      console.log(`${colors.yellow}⚠️  Some optional variables are missing, but build can proceed.${colors.reset}`);
    }
    console.log(`${colors.green}🚀 Ready for build!${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}❌ Environment validation failed!${colors.reset}`);
    console.log('');
    console.log(`${colors.bold}${colors.red}Missing required environment variables detected.${colors.reset}`);
    console.log('');
    console.log(`${colors.bold}To fix this issue:${colors.reset}`);
    console.log(`1. Copy ${colors.cyan}.env.local.example${colors.reset} to ${colors.cyan}.env.local${colors.reset}`);
    console.log(`2. Fill in the missing values with your actual configuration`);
    console.log(`3. For production deployment, ensure all variables are set in Vercel dashboard`);
    console.log('');
    console.log(`${colors.bold}Need help?${colors.reset}`);
    console.log(`- Check the ${colors.cyan}ENVIRONMENT_VARIABLES.md${colors.reset} file for detailed setup instructions`);
    console.log(`- Verify your Supabase project settings at https://app.supabase.com`);
    console.log(`- Ensure environment variables are properly configured in your deployment platform`);
    console.log('');
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);
  
  // Handle command line arguments
  if (args.includes('--generate-templates')) {
    console.log(`${colors.bold}${colors.magenta}📝 Generating Environment Templates${colors.reset}`);
    generateEnvTemplates();
    console.log(`${colors.green}✅ Templates generated successfully!${colors.reset}`);
    return;
  }
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`${colors.bold}Environment Validation Script${colors.reset}`);
    console.log('');
    console.log(`${colors.bold}Usage:${colors.reset}`);
    console.log('  node scripts/validate-env.tsx                 Validate environment variables');
    console.log('  node scripts/validate-env.tsx --generate-templates  Generate .env template files');
    console.log('  node scripts/validate-env.tsx --help         Show this help message');
    console.log('');
    return;
  }

  // Run validation
  const isValid = validateEnvironment();
  
  if (!isValid) {
    console.log(`${colors.red}${colors.bold}🚨 Build aborted due to missing environment variables!${colors.reset}`);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  validateEnvironment,
  generateEnvTemplates
};

