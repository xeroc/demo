#!/bin/bash
# Explore repository structure
cd /home/xeroc/projects/chaoscraft/demo/.git/.worktrees/4-feature-branch
echo "=== Repository Structure ==="
find . -type f -name "*.json" -o -name "*.yaml" -o -name "*.yml" -o -name "*.toml" -o -name ".gitignore" -o -name "Makefile" -o -name "Dockerfile" 2>/dev/null | head -50
echo ""
echo "=== All Files ==="
ls -la
