#!/usr/bin/env sh
# Husky v9 hook installer
# This script ensures git hooks are properly installed

HOOK_DIR=".git/hooks"
HUSKY_DIR=".husky"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
  echo "Not a git repository"
  exit 0
fi

# Create hooks directory if it doesn't exist
mkdir -p "$HOOK_DIR"

# Install pre-commit hook
cat > "$HOOK_DIR/pre-commit" << 'EOF'
#!/bin/sh
# Git pre-commit hook managed by Husky

.husky/pre-commit
EOF

chmod +x "$HOOK_DIR/pre-commit"
chmod +x "$HUSKY_DIR/pre-commit"

echo "Husky hooks installed successfully"
