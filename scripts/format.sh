#!/bin/bash

format_check_staged() {
  echo "Checking staged files for formatting..."
  FILES=$(git diff --cached --name-only --diff-filter=ACM \
    | grep -E '\.(ts|tsx|js|json|jsonc|jsx)$' \
    | grep -vE '^dist/|/dist/|^temp/|/temp/|^node_modules/|/node_modules/')

  if [ -n "$FILES" ]; then
    echo "$FILES" | xargs biome format
  else
    echo "No staged files to check."
  fi
}

format_fix_staged() {
  echo "Fixing staged files..."
  FILES=$(git diff --cached --name-only --diff-filter=ACM \
    | grep -E '\.(ts|tsx|js|json|jsonc|jsx)$')

  if [ -n "$FILES" ]; then
    echo "$FILES" | xargs biome format --write
  else
    echo "No staged files to fix."
  fi
}

if [ "$1" ]; then
  "$1"
else
  echo "Usage: $0 {format_check_staged|format_fix_staged}"
  exit 1
fi
