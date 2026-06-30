# 🚀 QUICK START - GlobalPay Pi Deployment

## Step 1: Create GitHub OAuth App (2 minutes)

1. Open: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Fill in:
   ```
   Application name: GlobalPay Pi Production
   Homepage URL: https://globalpay-pi.vercel.app
   Authorization callback URL: https://globalpay-pi.vercel.app/api/auth/callback/github
   ```
4. Click **Register application**
5. **Copy your Client ID** and **Client Secret**

## Step 2: Generate NEXTAUTH_SECRET

Run this in your terminal:
```bash
openssl rand -base64 32
```

Copy the output.

## Step 3: Deploy Using Script (Automated)

### Option A: Run Deployment Script
```bash
# Clone/pull the repository
git clone https://github.com/mohammedsardauna/GLOBALPAY-PI-.git
cd GLOBALPAY-PI-
git checkout deploy/auth-setup

# Set environment variables
export GITHUB_CLIENT_ID="your_client_id_from_step_1"
export GITHUB_CLIENT_SECRET="your_client_secret_from_step_1"
export NEXTAUTH_SECRET="your_generated_secret_from_step_2"

# Run deployment script
bash deploy.sh
```

### Option B: Manual Deployment

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Authenticate**:
   ```bash
   vercel login
   ```

3. **Link project**:
   ```bash
   vercel link
   ```

4. **Add environment variables to Vercel**:
   ```bash
   vercel env add GITHUB_CLIENT_ID
   vercel env add GITHUB_CLIENT_SECRET
   vercel env add NEXTAUTH_SECRET
   vercel env add NEXTAUTH_URL https://globalpay-pi.vercel.app
   ```

5. **Deploy**:
   ```bash
   vercel deploy --prod
   ```

## Step 4: Verify Deployment ✅

### Test Authentication:
1. Visit: https://globalpay-pi.vercel.app/api/auth/signin
2. Click **"Sign in with GitHub"**
3. Authorize the application
4. You should be redirected to: https://globalpay-pi.vercel.app/dashboard

### Check Live Application:
- Main app: https://globalpay-pi.vercel.app
- View transactions: https://globalpay-pi.vercel.app (scroll down)
- Sign out: https://globalpay-pi.vercel.app/api/auth/signout

---

## 🔗 Important Links

| Link | Purpose |
|------|---------|
| https://github.com/settings/developers | Create OAuth App |
| https://vercel.com/dashboard | Vercel Dashboard |
| https://globalpay-pi.vercel.app | Live Application |
| https://github.com/mohammedsardauna/GLOBALPAY-PI- | GitHub Repository |

---

## ⚠️ Security Notes

✅ Never commit `.env.local` or secrets to Git
✅ Always use HTTPS in production
✅ Keep `GITHUB_CLIENT_SECRET` and `NEXTAUTH_SECRET` private
✅ Callback URLs must match exactly

---

## 🆘 Troubleshooting

**"OAuth app not found"**
- Verify GitHub OAuth app is created at https://github.com/settings/developers
- Check Client ID matches

**"Callback URL mismatch"**
- Ensure callback URL in GitHub settings is: `https://globalpay-pi.vercel.app/api/auth/callback/github`

**"Session not persisting"**
- Verify `NEXTAUTH_SECRET` is set in Vercel
- Check browser cookies are enabled

---

**🎉 You're all set! Deploy now and get GlobalPay Pi live!**
