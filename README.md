# Saintrix - AI-Powered Credit Repair SaaS

A comprehensive credit repair platform with AI-powered dispute generation, real-time analytics, and automated workflows.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- Vercel account (for deployment)

### Local Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd saintrix
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # Generate environment templates
   npm run generate-env-templates
   
   # Copy and configure your environment
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   
   # Validate configuration
   npm run validate-env
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Required Variables
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (production only)

### Configuration Files
- `.env.local` - Local development (not committed)
- `.env.local.example` - Template for local setup
- `.env.production.example` - Template for production
- `.env.development.example` - Template for development

For detailed configuration instructions, see [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md).

## 🛠 Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run validate-env     # Validate environment variables
npm run generate-env-templates  # Generate environment templates
```

### Building and Deployment
```bash
npm run build           # Build with environment validation
npm run build:safe      # Build without validation (emergency use)
npm run start           # Start production server
```

### Linting and Quality
```bash
npm run lint            # Run ESLint
```

## 🏗 Build Process

The build process includes automatic environment validation:

1. **Pre-build validation** - Checks all required environment variables
2. **Build execution** - Compiles the Next.js application
3. **Error handling** - Provides clear error messages for missing variables

### Build Validation Features
- ✅ Validates required environment variables
- ✅ Checks variable formats and values
- ✅ Environment-specific requirements
- ✅ Clear error messages with solutions
- ✅ Graceful failure handling

## 🚀 Deployment

### Vercel Deployment

1. **Setup Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel link
   ```

2. **Configure Environment Variables**
   ```bash
   # Add required variables to Vercel
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   ```

3. **Deploy**
   ```bash
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

For detailed deployment instructions, see [VERCEL_CLI_GUIDE.md](./VERCEL_CLI_GUIDE.md).

## 🔒 Security

### Environment Variable Security
- ✅ Service role keys never exposed to frontend
- ✅ Environment-aware client configuration
- ✅ Automatic key selection based on environment
- ✅ Validation prevents deployment with missing secrets

### Best Practices
- Never commit actual environment variables
- Use different keys for different environments
- Regularly rotate sensitive keys
- Follow principle of least privilege

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── client-portal/     # Client portal
│   └── login/             # Authentication
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── supabase.ts       # Supabase client configuration
│   ├── database.ts       # Database operations
│   └── storage.ts        # File storage operations
├── scripts/              # Build and utility scripts
│   └── validate-env.js   # Environment validation
├── .env*.example         # Environment templates
├── ENVIRONMENT_VARIABLES.md  # Environment documentation
├── VERCEL_CLI_GUIDE.md   # Vercel CLI guide
└── vercel.json           # Vercel configuration
```

## 🔧 Troubleshooting

### Common Issues

#### Build Fails with Environment Error
```bash
# Check what's missing
npm run validate-env

# Generate templates if needed
npm run generate-env-templates

# Verify Vercel environment variables
vercel env ls
```

#### Database Connection Issues
```bash
# Test Supabase connection
npm run validate-env

# Check Supabase project status
# Verify RLS policies are configured
```

#### Deployment Failures
```bash
# Check deployment logs
vercel logs

# Verify environment variables
vercel env ls production

# Test build locally
npm run build
```

### Getting Help

1. **Environment Issues**: Run `npm run validate-env`
2. **Build Issues**: Check build logs and verify environment variables
3. **Deployment Issues**: Use `vercel logs` and `vercel env ls`
4. **Database Issues**: Verify Supabase configuration and RLS policies

## 📚 Documentation

- [Environment Variables Guide](./ENVIRONMENT_VARIABLES.md)
- [Vercel CLI Integration](./VERCEL_CLI_GUIDE.md)
- [Implementation Guide](./IMPLEMENTATION_GUIDE.md)
- [Deployment Verification](./DEPLOYMENT_VERIFICATION.md)

## 🛡 Environment Validation

The project includes a comprehensive environment validation system:

### Features
- ✅ Pre-build validation prevents deployment failures
- ✅ Environment-specific requirements
- ✅ Clear error messages with solutions
- ✅ Automatic template generation
- ✅ Production safety checks

### Usage
```bash
# Validate current environment
npm run validate-env

# Generate environment templates
npm run generate-env-templates

# Build with validation (default)
npm run build

# Emergency build without validation
npm run build:safe
```

## 🔄 Development Workflow

1. **Setup Environment**
   ```bash
   npm run generate-env-templates
   cp .env.local.example .env.local
   # Configure your .env.local
   npm run validate-env
   ```

2. **Development**
   ```bash
   npm run dev
   # Make changes
   # Test locally
   ```

3. **Deployment**
   ```bash
   # Validate before deployment
   npm run validate-env
   
   # Deploy to preview
   vercel
   
   # Deploy to production
   vercel --prod
   ```

## 🎯 Features

### Core Features
- 🤖 AI-powered dispute letter generation
- 📊 Real-time credit analytics
- 📁 Secure file upload and management
- 👥 Multi-role user management (client/admin)
- 🔔 Real-time notifications
- 💳 Payment processing integration

### Technical Features
- ⚡ Next.js 15 with App Router
- 🗄️ Supabase backend with RLS
- 🔐 Secure authentication system
- 📱 Responsive design
- 🚀 Vercel deployment ready
- 🛡️ Environment validation system

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For technical support or questions:
- Check the troubleshooting section above
- Review the documentation files
- Run environment validation: `npm run validate-env`
- Check deployment logs: `vercel logs`

