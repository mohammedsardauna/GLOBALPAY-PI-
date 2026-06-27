# GlobalPay Pi (pidom8.pi) — frontend demo

A small static frontend demo that showcases a Pi-themed payment UI (GlobalPay Pi). It is a lightweight single-page app (HTML/CSS/JS) intended as a prototype.

## What I changed
- Removed the raw validation key from the repository (validation-key.txt now contains a placeholder). Please rotate any affected keys immediately.
- Cleaned up and fixed script.js (removed accidental pasted fragments and template bugs).
- Cleaned up style.css to remove accidental extra content.
- Added a .gitignore to avoid committing secrets and common artifacts.
- Added this README with run instructions.

## Run locally
1. Clone the repo
2. From the repo root serve the files as static content. Example (Python 3):

```
python -m http.server 8000
```

Open http://localhost:8000/index.html in your browser.

Alternative (Node):
```
npx http-server -p 8000
```

## Security note
A validation key was previously committed. Commits are immutable — removing the file from the latest commit does not erase the key from git history. Rotate any secrets and consider rewriting history only after coordinating with collaborators.

## Next steps I can take for you
- Remove the secret file from git history (git filter-repo or BFG) and force-push (I will NOT do this without your approval).
- Add a minimal Node/Express dev server and package.json.
- Create a pull request instead of committing to `main` directly.

Tell me which of those you want next.
