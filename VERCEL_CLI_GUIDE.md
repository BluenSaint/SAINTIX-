# Vercel CLI Integration Guide

This guide covers how to use the Vercel CLI for managing environment variables, debugging deployments, and maintaining your Saintrix application.

## Installation and Setup

### Install Vercel CLI
```bash
npm install -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Link Your Project
```bash
# Run this in your project directory
vercel link
```

## Environment Variable Management

### Pull Environment Variables from Vercel
```bash
# Download all environment variables to .env.local
vercel env pull

# Pull specific environment (production, preview, development)
vercel env pull .env.production --environment=production
vercel env pull .env.preview --environment=preview
vercel env pull .env.development --environment=development
```

### Push Environment Variables to Vercel
```bash
# Add a new environment variable
vercel env add VARIABLE_NAME

# Add variable for specific environment
vercel env add VARIABLE_NAME production
vercel env add VARIABLE_NAME preview
vercel env add VARIABLE_NAME development
```

### List Environment Variables
```bash
# List all environment variables
vercel env ls

# List variables for specific environment
vercel env ls production
```

### Remove Environment Variables
```bash
# Remove a variable (interactive selection)
vercel env rm VARIABLE_NAME

# Remove from specific environment
vercel env rm VARIABLE_NAME production
```

## Deployment Commands

### Deploy to Preview
```bash
# Deploy current branch to preview URL
vercel

# Deploy with custom alias
vercel --alias my-preview.vercel.app
```

### Deploy to Production
```bash
# Deploy to production (main branch)
vercel --prod

# Force deploy current branch to production
vercel --prod --force
```

### Deploy with Environment Variables
```bash
# Deploy with specific environment
vercel --env NODE_ENV=production

# Deploy with multiple environment variables
vercel --env CUSTOM_VAR=value --env ANOTHER_VAR=value2
```

## Debugging and Monitoring

### View Deployment Logs
```bash
# View logs for latest deployment
vercel logs

# View logs for specific deployment
vercel logs [deployment-url]

# Follow logs in real-time
vercel logs --follow

# View logs for specific function
vercel logs --function=api/ai/analyze-credit
```

### Inspect Deployments
```bash
# List all deployments
vercel ls

# Get detailed info about a deployment
vercel inspect [deployment-url]

# View deployment source code
vercel inspect [deployment-url] --source
```

### Check Build Status
```bash
# View build logs
vercel logs --build

# Check build configuration
vercel inspect --build
```

## Project Management

### Project Information
```bash
# View project details
vercel project ls

# Get project info
vercel project info

# View project settings
vercel project inspect
```

### Domain Management
```bash
# List domains
vercel domains ls

# Add custom domain
vercel domains add example.com

# Remove domain
vercel domains rm example.com
```

## Environment-Specific Workflows

### Development Workflow
```bash
# 1. Pull latest environment variables
vercel env pull

# 2. Validate environment
npm run validate-env

# 3. Start development server
npm run dev

# 4. Deploy preview for testing
vercel
```

### Production Deployment
```bash
# 1. Ensure all environment variables are set
vercel env ls production

# 2. Validate environment locally
NODE_ENV=production npm run validate-env

# 3. Deploy to production
vercel --prod

# 4. Monitor deployment
vercel logs --follow
```

## Troubleshooting Common Issues

### Build Failures

#### Missing Environment Variables
```bash
# Check what variables are set
vercel env ls production

# Add missing variables
vercel env add SUPABASE_SERVICE_ROLE_KEY production

# Redeploy
vercel --prod
```

#### Build Timeout
```bash
# Check build logs
vercel logs --build

# Increase build timeout (if needed)
# This is done in vercel.json configuration
```

### Runtime Errors

#### Function Errors
```bash
# View function logs
vercel logs --function=api/ai/analyze-credit

# Check function configuration
vercel inspect --source
```

#### Database Connection Issues
```bash
# Verify Supabase environment variables
vercel env ls | grep SUPABASE

# Test connection locally with production env
vercel env pull .env.production
NODE_ENV=production npm run validate-env
```

## Automation Scripts

### Environment Sync Script
Create a script to sync environment variables:

```bash
#!/bin/bash
# sync-env.sh

echo "🔄 Syncing environment variables..."

# Pull from Vercel
vercel env pull

# Validate
npm run validate-env

# Generate templates
npm run generate-env-templates

echo "✅ Environment sync complete!"
```

### Deployment Health Check
```bash
#!/bin/bash
# health-check.sh

echo "🏥 Running deployment health check..."

# Check if deployment is live
DEPLOYMENT_URL=$(vercel ls --json | jq -r '.[0].url')
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DEPLOYMENT_URL")

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Deployment is healthy (HTTP $HTTP_STATUS)"
else
    echo "❌ Deployment issue (HTTP $HTTP_STATUS)"
    vercel logs --follow
fi
```

## Configuration Files

### vercel.json
Create a `vercel.json` file for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  }
}
```

## Best Practices

### Environment Variable Security
1. **Never commit actual environment variables** to git
2. **Use different keys for different environments**
3. **Regularly rotate sensitive keys**
4. **Use the principle of least privilege**

### Deployment Strategy
1. **Always test in preview before production**
2. **Use environment validation before deployment**
3. **Monitor logs after deployment**
4. **Keep deployment history for rollbacks**

### Development Workflow
1. **Pull environment variables regularly**
2. **Validate environment before starting work**
3. **Use preview deployments for feature testing**
4. **Keep local and remote environments in sync**

## Quick Reference

### Essential Commands
```bash
# Setup
vercel login
vercel link

# Environment
vercel env pull
vercel env add VARIABLE_NAME
vercel env ls

# Deploy
vercel                    # Preview
vercel --prod            # Production

# Debug
vercel logs
vercel logs --follow
vercel inspect [url]

# Project
vercel ls
vercel project info
```

### Environment Variable Checklist
- [ ] `NEXT_PUBLIC_SUPABASE_URL` (all environments)
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` (all environments)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` (production required)

### Pre-Deployment Checklist
- [ ] Environment variables validated
- [ ] Local build successful
- [ ] Preview deployment tested
- [ ] Database connections verified
- [ ] API endpoints functional

## Support and Resources

### Official Documentation
- [Vercel CLI Documentation](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Deployment Documentation](https://vercel.com/docs/concepts/deployments/overview)

### Saintrix-Specific Resources
- `ENVIRONMENT_VARIABLES.md` - Environment variable documentation
- `scripts/validate-env.js` - Environment validation script
- `.env*.example` - Environment templates

### Getting Help
1. Run environment validation: `npm run validate-env`
2. Check deployment logs: `vercel logs`
3. Verify environment variables: `vercel env ls`
4. Test locally with production env: `vercel env pull && NODE_ENV=production npm run validate-env`

