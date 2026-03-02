#!/bin/bash
# Comprehensive Repository Analysis

cd /home/xeroc/projects/chaoscraft/demo/.git/.worktrees/email-form

echo "=== PHASE 1: Repository Structure ==="
echo "Directory tree (3 levels):"
find . -maxdepth 3 -type d | grep -v node_modules | grep -v .git | sort

echo -e "\n=== PHASE 2: Technology Stack ==="
echo "Package files:"
find . -maxdepth 3 -name "package.json" -o -name "requirements.txt" -o -name "Cargo.toml" -o -name "go.mod" -o -name "pom.xml" -o -name "build.gradle" -o -name "composer.json" 2>/dev/null

echo -e "\n=== PHASE 3: Entry Points ==="
echo "Main files:"
find . -maxdepth 2 -name "main.*" -o -name "index.*" -o -name "app.*" -o -name "server.*" 2>/dev/null

echo -e "\n=== PHASE 4: Configuration ==="
echo "Config files:"
ls -la | grep -E "\.(json|yml|yaml|env|config)" || echo "No obvious config files in root"

echo -e "\n=== PHASE 5: Documentation ==="
cat README.md 2>/dev/null || echo "No README.md found"

echo -e "\n=== File count by extension ==="
find . -type f -name "*.*" | sed 's/.*\.//' | sort | uniq -c | sort -rn | head -20
