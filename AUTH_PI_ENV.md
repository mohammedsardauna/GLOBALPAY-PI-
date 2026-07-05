# Pi OAuth and NextAuth environment variables

Below are the recommended environment variables to enable Pi Network sign-in in this project.

Local (.env.local)

```
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret

# GitHub provider (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Pi provider (set these values according to Pi's OAuth docs)
PI_CLIENT_ID=your_pi_client_id
PI_CLIENT_SECRET=your_pi_client_secret
# Either provide a well-known OpenID Connect discovery URL:
PI_WELL_KNOWN=
# Or provide the endpoints individually:
PI_AUTHORIZATION_URL=https://minepi.com/oauth/authorize
PI_TOKEN_URL=https://minepi.com/oauth/token
PI_USERINFO_URL=https://api.minepi.com/userinfo
PI_SCOPE=profile email

# Pi SDK / API settings (sandbox)
PI_API_BASE=https://sandbox-api.minepi.example
PI_API_KEY=your_sandbox_api_key
PI_NETWORK_SANDBOX=true
```

Important callback URL (set this when registering OAuth app with Pi):

- Local: http://localhost:3000/api/auth/callback/pi
- Production (Vercel): https://<your-vercel-domain>/api/auth/callback/pi
