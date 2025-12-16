# Husky Configuration

This project uses **Husky v9** for Git hooks management.

## What it does

- **Pre-commit hook**: Runs `lint-staged` before each commit
- **lint-staged**: Automatically formats and lints staged files

## Files

- `.husky/pre-commit` - Pre-commit hook script
- `.husky/install.sh` - Automatic installer for Git hooks
- `.git/hooks/pre-commit` - Git hook (auto-generated)

## Setup

Hooks are automatically installed when you run:

```bash
yarn install
# or
yarn prepare
```

## Manual Installation

If hooks are not working, run:

```bash
yarn prepare
```

Or manually:

```bash
sh .husky/install.sh
```

## What gets checked

When you commit, lint-staged will:

1. ✨ Format with **Prettier** (`.js`, `.html`, `.css`, `.json`)
2. 🔍 Lint with **ESLint** (`.js`, `.html`)
3. 🎨 Lint with **Stylelint** (`.css`)

Only staged files are processed, so commits are fast!

## Bypassing hooks (emergency only)

```bash
git commit --no-verify
```

⚠️ **Not recommended** - Only use in emergencies!

### When to bypass

- **Large migrations** (100+ files): The linters may timeout or run out of memory
- **Emergency hotfixes**: When you need to deploy immediately
- **CI/CD will catch it**: If your CI has linting checks

For large commits, consider:
```bash
# Run linters manually first
yarn quality:fix

# Then commit with verification disabled
git commit --no-verify -m "your message"

# Or split into smaller commits
git add specific/files
git commit -m "part 1"
```
