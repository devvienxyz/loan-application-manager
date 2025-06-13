#!/bin/bash

# Define common file types for Biome to process
BIOME_FILE_TYPES='\.(ts|tsx|js|json|jsonc|jsx)$'

# Define paths to exclude from checks/fixes
# ADDED: |^\.vscode/  to exclude any file within the .vscode directory
EXCLUDE_PATHS='jest.config.js|^dist/|/dist/|^temp/|/temp/|^node_modules/|/node_modules/|^\.husky/|package-lock\.json|^\.vscode/'

format_check_staged() {
  echo "Checking staged files for formatting..."

  FILES=$(git diff --cached --name-only --diff-filter=ACM \
    | grep -E "$BIOME_FILE_TYPES" \
    | grep -vE "$EXCLUDE_PATHS")

  if [ -z "$FILES" ]; then
    echo "Checked 0 files. No unformatted staged files to check."
    exit 0 # Success: no relevant files were staged or all are already formatted
  fi

  echo "Files to check: $FILES" # For debugging: show which files are being processed

  biome format --staged --files-ignore-unknown=true $FILES

  if [ $? -ne 0 ]; then
    echo "Biome detected unformatted staged files. Please run 'npm run format-fix-staged' (or the relevant command) to fix them."
    echo "Commit aborted."
    exit 1 # Fail the commit
  fi

  echo "All staged files are correctly formatted."
  exit 0 # Success: no formatting issues found
}

format_fix_staged() {
  echo "Fixing staged files..."

  FILES=$(git diff --cached --name-only --diff-filter=ACM \
    | grep -E "$BIOME_FILE_TYPES" \
    | grep -vE "$EXCLUDE_PATHS")

  if [ -z "$FILES" ]; then
    echo "No staged files to fix."
    exit 0 # Success: no relevant files were staged
  fi

  echo "Files to fix: $FILES" # For debugging

  biome format --write --staged --files-ignore-unknown=true $FILES

  if [ $? -ne 0 ]; then
    echo "Biome encountered an error while fixing staged files."
    echo "Commit aborted."
    exit 1 # Fail the commit
  fi

  echo "Staged files have been formatted."
  exit 0 # Success: files were formatted
}

if [ "$1" ]; then
  "$1"
else
  echo "Usage: $0 {format_check_staged|format_fix_staged}"
  exit 1
fi