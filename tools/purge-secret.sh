#!/bin/bash
# tools/purge-secret.sh
# WARNING: This script rewrites git history and force-pushes. Use only after rotating keys and coordinating with collaborators.

set -euo pipefail

if [ -z "${1-}" ]; then
  echo "Usage: $0 <repo-url>"
  echo "Example: $0 https://github.com/mohammedsardauna/GLOBALPAY-PI-.git"
  exit 1
fi

REPO_URL="$1"
TMP_DIR="repo-purge-$(date +%s)"

echo "Cloning mirror..."
git clone --mirror "$REPO_URL" "$TMP_DIR"
cd "$TMP_DIR"

echo "Running git-filter-repo to remove validation-key.txt..."
if ! command -v git-filter-repo >/dev/null 2>&1; then
  echo "git-filter-repo not found. Install it first: https://github.com/newren/git-filter-repo"
  exit 2
fi

git filter-repo --invert-paths --path validation-key.txt

echo "Pushing rewritten history (force)..."
git push --force origin main

echo "Done. Clean-up local mirror: ../$TMP_DIR"
