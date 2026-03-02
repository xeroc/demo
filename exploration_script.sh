#!/bin/bash
# Repository exploration script

echo "=== Repository Structure ==="
find . -maxdepth 3 -type f -name "*.py" -o -name "*.js" -o -name "*.ts" -o -name "*.json" -o -name "*.yml" -o -name "*.yaml" -o -name "*.md" -o -name "*.txt" | head -50

echo -e "\n=== Top-level directories ==="
ls -la

echo -e "\n=== Package/Dependency files ==="
find . -name "package.json" -o -name "requirements.txt" -o -name "Gemfile" -o -name "go.mod" -o -name "pom.xml" -o -name "build.gradle" | head -20

echo -e "\n=== Configuration files ==="
find . -maxdepth 2 -name "*.config.*" -o -name ".*rc" -o -name ".env*" | head -20
