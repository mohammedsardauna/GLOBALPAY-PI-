#!/bin/bash

# GlobalPay Pi - Automated Deployment Script
# This script automates the deployment process to Vercel

set -e

echo "================================"
echo "🚀 GlobalPay Pi Deployment Script"
echo "================================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if required environment variables are set
if [ -z "$GITHUB_CLIENT_ID" ] || [ -z "$GITHUB_CLIENT_SECRET" ] || [ -z "$NEXTAUTH_SECRET" ]; then
    echo "❌ ERROR: Missing required environment variables!"
    echo ""
    echo "Please set the following environment variables:"
    echo "  export GITHUB_CLIENT_ID='your_client_id'"
    echo "  export GITHUB_CLIENT_SECRET='your_client_secret'"
    echo "  export NEXTAUTH_SECRET='your_nextauth_secret'"
    echo ""
    echo "To generate NEXTAUTH_SECRET, run:"
    echo "  openssl rand -base64 32"
    echo ""
    exit 1
fi

echo "✅ Environment variables configured"
echo ""

# Create .env.production file
echo "📝 Creating production environment file..."
cat > .env.production << EOF
GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET
NEXTAUTH_URL=https://globalpay-pi.vercel.app
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
EOF

echo "✅ Production environment configured"
echo ""

# Authenticate with Vercel
echo "🔐 Authenticating with Vercel..."
echo "Note: You may need to log in. A browser window will open."
vercel login

echo ""
echo "🔗 Linking project to Vercel..."
vercel link --yes

echo ""
echo "🌍 Deploying to production..."
vercel env add GITHUB_CLIENT_ID $GITHUB_CLIENT_ID production
vercel env add GITHUB_CLIENT_SECRET $GITHUB_CLIENT_SECRET production
vercel env add NEXTAUTH_SECRET $NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL https://globalpay-pi.vercel.app production

echo ""
echo "📦 Building and deploying application..."
vercel deploy --prod

echo ""
echo "================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "================================"
echo ""
echo "🔗 Live URLs:"
echo "  Main App:    https://globalpay-pi.vercel.app"
echo "  Sign In:     https://globalpay-pi.vercel.app/api/auth/signin"
echo "  Dashboard:   https://globalpay-pi.vercel.app/dashboard"
echo ""
echo "📊 Next Steps:"
echo "  1. Visit https://globalpay-pi.vercel.app/api/auth/signin"
echo "  2. Click 'Sign in with GitHub'"
echo "  3. Verify authentication works"
echo "  4. Access dashboard at https://globalpay-pi.vercel.app/dashboard"
echo ""
