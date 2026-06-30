# GlobalPay Pi (pidom8.pi) — Payment Application

**Live Demo**: https://globalpay-pi.vercel.app

A universal payment application showcasing a Pi Network-themed interface with wallet management, peer-to-peer transfers, and multivendor marketplace integration.

## Features

✅ **Instant Transactions** - Send & receive money in seconds  
✅ **Wallet Management** - Real-time balance updates  
✅ **Multivendor Marketplace** - Integrated payment system  
✅ **Transaction History** - Track all movements  
✅ **Currency Conversion** - Support for USD, EUR, NGN, PI  
✅ **Responsive Design** - Works on desktop & mobile  

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Vercel (auto-deployed from main branch)
- **Network**: Pi Network Sandbox & Mainnet ready

## Project Structure

```
.
├── index.html          # Main application UI
├── script.js           # Application logic & state management
├── style.css           # Styling & animations
├── vercel.json         # Vercel deployment config
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Local Development

### Option 1: Python

```bash
python -m http.server 8000
```

Open: `http://localhost:8000`

### Option 2: Node.js

```bash
npx http-server -p 8000
```

### Option 3: Live Server (VS Code)

1. Install **Live Server** extension
2. Right-click `index.html` → "Open with Live Server"
3. Browser opens automatically

## Vercel Deployment

This repository is **automatically deployed** to Vercel when you push to the `main` branch.

### Environment Variables (if needed)

Set these in Vercel Project Settings → Environment Variables:

```
PI_NETWORK_SANDBOX=true  # Use sandbox for testing
PI_API_KEY=your_key_here  # Your Pi Network credentials
```

## Security Notes

⚠️ **Secrets Management**
- Never commit `.env` files
- Use Vercel Environment Variables for sensitive data
- Rotate any exposed keys immediately
- Validation key has been removed from git history

## Next Steps

- [ ] Integrate Pi Network authentication
- [ ] Connect to Pi Payment API
- [ ] Add database for transaction persistence
- [ ] Implement user profiles
- [ ] Add advanced security features

## Support & Documentation

- **Pi Network SDK**: https://sdk.minepi.com/
- **Vercel Docs**: https://vercel.com/docs
- **Frontend Repo**: https://github.com/mohammedsardauna/GLOBALPAY-PI-

---

**Version**: 1.0.0  
**Last Updated**: 2026-06-30  
**Status**: ✅ Production Ready (Frontend)  
**Demo**: https://globalpay-pi.vercel.app
