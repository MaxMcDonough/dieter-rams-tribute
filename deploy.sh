#!/usr/bin/env bash
# ========================================================================
# deploy.sh — Deploy the Dieter Rams Tribute to GitHub + GitHub Pages
# ========================================================================
#
# USAGE:
#   1. Open your Terminal
#   2. cd into this folder:     cd "~/CLAUDE OS/Dieter Rams Portfolio Website"
#   3. Run this script:         bash deploy.sh
#
# REQUIREMENTS:
#   - git          (built into macOS)
#   - gh           (GitHub CLI — install: brew install gh)
#   - gh auth login (run once if you haven't: gh auth login)
#
# WHAT THIS DOES:
#   1. Initializes a git repo here
#   2. Commits every file
#   3. Creates a PUBLIC GitHub repo under your account
#   4. Pushes everything
#   5. Enables GitHub Pages (serves from main branch / root)
#   6. Prints your live URL
#
# ========================================================================

set -e

REPO_NAME="dieter-rams-tribute"
REPO_DESC="A six-page editorial tribute to Dieter Rams · INTD-215 Designing for Screens · Spring 2026"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  DEPLOYING · Dieter Rams Tribute                             ║"
echo "║  Max McDonough · INTD-215 · Spring 2026                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Check requirements
command -v git >/dev/null 2>&1 || { echo "❌ git not found. Install Xcode Command Line Tools first."; exit 1; }
command -v gh  >/dev/null 2>&1 || { echo "❌ gh not found. Install with: brew install gh"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "❌ GitHub CLI not authenticated. Run: gh auth login"; exit 1; }

echo "✓ Requirements met"
echo ""

# Get GitHub username
GH_USER=$(gh api user --jq '.login')
echo "✓ Logged in as: $GH_USER"
echo ""

# Initialize git if needed
if [ ! -d .git ]; then
  echo "→ Initializing git repository..."
  git init -b main
  git config user.email "$(gh api user --jq '.email // "max.mcdonough123@gmail.com"')"
  git config user.name "Max McDonough"
fi

# Add and commit
echo "→ Adding files..."
git add -A

if git diff --cached --quiet 2>/dev/null; then
  echo "  (nothing new to commit)"
else
  git commit -m "Initial commit — Dieter Rams Tribute v4 multi-page final

Six-page editorial tribute to Dieter Rams.
Final project for INTD-215 Designing for Screens, Spring 2026.
Instructor: Colby May.

Author: Max McDonough"
fi

# Create the repo if it doesn't exist
if ! gh repo view "$GH_USER/$REPO_NAME" >/dev/null 2>&1; then
  echo "→ Creating GitHub repo: $GH_USER/$REPO_NAME"
  gh repo create "$REPO_NAME" --public --description "$REPO_DESC" --source=. --remote=origin --push
else
  echo "✓ Repo already exists: $GH_USER/$REPO_NAME"
  git remote add origin "https://github.com/$GH_USER/$REPO_NAME.git" 2>/dev/null || true
  git push -u origin main
fi

# Enable GitHub Pages
echo "→ Enabling GitHub Pages..."
gh api -X POST "repos/$GH_USER/$REPO_NAME/pages" \
  -f "source[branch]=main" \
  -f "source[path]=/" \
  2>/dev/null || echo "  (Pages already enabled or needs manual setup at Settings → Pages)"

LIVE_URL="https://$GH_USER.github.io/$REPO_NAME/"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  ✓ DEPLOYED                                                  ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "  Repository: https://github.com/$GH_USER/$REPO_NAME"
echo "  Live site:  $LIVE_URL"
echo ""
echo "  Note: GitHub Pages may take 1–2 minutes to build for the first time."
echo "  Refresh the live URL if it 404s immediately."
echo ""
