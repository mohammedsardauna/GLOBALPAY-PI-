# GitHub OAuth Authentication Setup Guide

## Overview
This project uses NextAuth.js with GitHub OAuth for secure authentication on GlobalPay Pi.

## Step 1: Create GitHub OAuth App

1. Go to: [GitHub Settings → Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. Click **"New OAuth App"** or **"Register a new application"**
3. Fill in the following:
   - **Application name**: `GlobalPay Pi Sandbox`
   - **Homepage URL**: `https://globalpay-pi.vercel.app`
   - **Authorization callback URL**: `https://globalpay-pi.vercel.app/api/auth/callback/github`
4. Click **Register application**
5. Copy your **Client ID**
6. Click **Generate a new client secret** and save it

## Step 2: Generate NEXTAUTH_SECRET

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output.

## Step 3: Configure Environment Variables

### Local Development (.env.local)
```env
GITHUB_CLIENT_ID=your_client_id_from_step_1
GITHUB_CLIENT_SECRET=your_client_secret_from_step_1
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_from_step_2
GITHUB_API_TOKEN=your_personal_access_token_optional
```

### Vercel Production
In your Vercel dashboard:
1. Go to your project settings
2. Navigate to **Environment Variables**
3. Add these variables:
   - `GITHUB_CLIENT_ID` = your_client_id
   - `GITHUB_CLIENT_SECRET` = your_client_secret
   - `NEXTAUTH_URL` = https://globalpay-pi.vercel.app
   - `NEXTAUTH_SECRET` = your_generated_secret

## Step 4: Install Dependencies

```bash
npm install next-auth
# or
yarn add next-auth
```

## Step 5: Update package.json

Ensure your `package.json` includes:
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "next-auth": "^4.24.0"
  }
}
```

## Step 6: Test Locally

```bash
npm run dev
```

Then visit:
- Sign In: `http://localhost:3000/api/auth/signin`
- Dashboard: `http://localhost:3000/dashboard`

## Step 7: Deploy to Vercel

```bash
vercel deploy
```

## OAuth Flow URLs Reference

| Component | URL |
|-----------|-----|
| **GitHub Authorize** | `https://github.com/login/oauth/authorize` |
| **GitHub Token** | `https://github.com/login/oauth/access_token` |
| **Sign-In Page** | `https://globalpay-pi.vercel.app/api/auth/signin` |
| **GitHub Callback** | `https://globalpay-pi.vercel.app/api/auth/callback/github` |
| **Dashboard** | `https://globalpay-pi.vercel.app/dashboard` |
| **Sign-Out** | `https://globalpay-pi.vercel.app/api/auth/signout` |
| **API User Info** | `https://api.github.com/user` (with Bearer token) |

## Security Notes

✅ Never commit `.env.local` to git
✅ Keep `GITHUB_CLIENT_SECRET` and `NEXTAUTH_SECRET` private
✅ Always use HTTPS in production
✅ Callback URLs must match exactly in GitHub OAuth app settings

## Troubleshooting

### "OAuth app not found"
- Verify your GitHub OAuth app is created
- Check `GITHUB_CLIENT_ID` matches the app

### "Callback URL mismatch"
- Ensure callback URL in GitHub OAuth settings matches your deployment URL
- For Vercel: use `https://your-domain.vercel.app/api/auth/callback/github`

### "Session not persisting"
- Verify `NEXTAUTH_SECRET` is set correctly
- Check NextAuth cookies are enabled

## Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [GitHub OAuth Documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [NextAuth GitHub Provider](https://next-auth.js.org/providers/github)
