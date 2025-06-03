# Environment Variables Documentation

This document describes all environment variables used in the Saintrix application and how to configure them properly.

## Overview

Saintrix uses environment variables to configure database connections, API keys, and deployment settings. Proper configuration is essential for the application to function correctly in both development and production environments.

## Required Variables

### NEXT_PUBLIC_SUPABASE_URL
- **Description**: The URL of your Supabase project
- **Required**: Always
- **Example**: `https://ggdahlksbsqpmfbhtcqd.supabase.co`
- **Where to find**: Supabase Dashboard → Project Settings → API
- **Notes**: This is safe to expose to the frontend (hence the `NEXT_PUBLIC_` prefix)

### NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Description**: Supabase anonymous/public key for client-side operations
- **Required**: Always
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Where to find**: Supabase Dashboard → Project Settings → API → anon/public key
- **Notes**: This is safe to expose to the frontend and is used for user authentication and RLS-protected operations

### SUPABASE_SERVICE_ROLE_KEY
- **Description**: Supabase service role key for server-side admin operations
- **Required**: Production only (optional in development)
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **Where to find**: Supabase Dashboard → Project Settings → API → service_role key
- **Notes**: ⚠️ **NEVER expose this to the frontend!** This key bypasses RLS and has full database access

## Optional Variables

### VERCEL_URL
- **Description**: The URL of your Vercel deployment
- **Required**: No (auto-set by Vercel)
- **Example**: `saintrix.vercel.app`
- **Notes**: Automatically provided by Vercel during deployment

### VERCEL_ENV
- **Description**: The Vercel environment (production, preview, development)
- **Required**: No (auto-set by Vercel)
- **Example**: `production`
- **Notes**: Automatically provided by Vercel during deployment

## Environment Setup

### Local Development

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. Validate your configuration:
   ```bash
   npm run validate-env
   ```

### Production Deployment (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

4. Deploy your application

## Security Best Practices

### ✅ Safe to Expose (Frontend)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `VERCEL_URL`
- `VERCEL_ENV`

### ❌ Never Expose (Backend Only)
- `SUPABASE_SERVICE_ROLE_KEY`

### Environment-Aware Configuration

The application automatically selects the appropriate Supabase key based on the environment:

- **Development**: Uses `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Production**: Uses `SUPABASE_SERVICE_ROLE_KEY` for API routes, `NEXT_PUBLIC_SUPABASE_ANON_KEY` for frontend

This ensures that:
1. Sensitive keys are never exposed to the browser
2. Development works without requiring service role key
3. Production has full admin capabilities for API operations

## Validation and Debugging

### Validate Environment Variables
```bash
npm run validate-env
```

This script will:
- Check all required variables are present
- Validate variable formats
- Provide helpful error messages
- Show environment-specific requirements

### Generate Template Files
```bash
npm run generate-env-templates
```

This creates example files for different environments.

### Common Issues

#### Build Fails with "Missing SUPABASE_SERVICE_ROLE_KEY"
- **Cause**: Service role key not set in production environment
- **Solution**: Add the key to your Vercel project environment variables

#### "Invalid Supabase URL" Error
- **Cause**: URL format is incorrect
- **Solution**: Ensure URL starts with `https://` and ends with `.supabase.co`

#### Authentication Not Working
- **Cause**: Incorrect anon key or URL
- **Solution**: Verify keys in Supabase dashboard match your environment variables

#### Admin Operations Failing
- **Cause**: Service role key missing or incorrect
- **Solution**: Verify service role key is correctly set and has admin permissions

## File Structure

```
├── .env.local.example          # Template for local development
├── .env.production.example     # Template for production
├── .env.development.example    # Template for development
├── .env.local                  # Your actual local environment (ignored by git)
└── scripts/validate-env.js     # Environment validation script
```

## Troubleshooting

### Environment Variable Not Loading
1. Check file name (must be `.env.local` for Next.js)
2. Restart development server after changes
3. Ensure no spaces around `=` in env files
4. Check for typos in variable names

### Vercel Deployment Issues
1. Verify all required variables are set in Vercel dashboard
2. Check build logs for specific error messages
3. Use `vercel env pull` to sync environment variables locally
4. Ensure variable names match exactly (case-sensitive)

### Database Connection Issues
1. Verify Supabase project is active
2. Check if RLS policies are properly configured
3. Ensure service role key has necessary permissions
4. Test connection using the validation script

## Support

If you encounter issues with environment configuration:

1. Run the validation script: `npm run validate-env`
2. Check the build logs for specific error messages
3. Verify your Supabase project settings
4. Ensure all required variables are properly set in your deployment platform

For additional help, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

