#!/bin/bash

cd /home/xeroc/projects/chaoscraft/demo/.git/.worktrees/2

echo "=== REPOSITORY EXPLORATION REPORT ==="
echo "Date: $(date)"
echo "Repository: $(pwd)"
echo "Branch: $(git branch --show-current 2>/dev/null || echo 'Unable to determine')"
echo ""

echo "=== ALL FILES IN REPOSITORY ==="
find . -type f ! -path '*/\.git/*' ! -name 'setup_*.sh' ! -name 'ENVIRONMENT_SETUP.md' 2>/dev/null

echo ""
echo "=== CONFIGURATION FILES ==="
for file in package.json pyproject.toml setup.py requirements.txt Makefile composer.json Cargo.toml go.mod pom.xml build.gradle Gemfile; do
    if [ -f "$file" ]; then
        echo "--- $file ---"
        cat "$file"
        echo ""
    fi
done

echo ""
echo "=== CI/CD CONFIGURATION ==="
if [ -d ".github/workflows" ]; then
    echo "GitHub Actions detected"
    find .github/workflows -name "*.yml" -o -name "*.yaml" 2>/dev/null | while read f; do
        echo "--- $f ---"
        cat "$f"
        echo ""
    done
fi

if [ -f ".gitlab-ci.yml" ]; then
    echo "--- .gitlab-ci.yml ---"
    cat .gitlab-ci.yml
    echo ""
fi

if [ -f ".travis.yml" ]; then
    echo "--- .travis.yml ---"
    cat .travis.yml
    echo ""
fi

if [ -f "Jenkinsfile" ]; then
    echo "--- Jenkinsfile ---"
    cat Jenkinsfile
    echo ""
fi

echo ""
echo "=== DIRECTORY STRUCTURE ==="
tree -L 3 -I 'node_modules|__pycache__|.git' 2>/dev/null || find . -maxdepth 3 -type d ! -path '*/node_modules/*' ! -path '*/__pycache__/*' ! -path '*/\.git/*' 2>/dev/null

echo ""
echo "=== TEST FILES ==="
find . -name "test_*" -o -name "*_test.*" -o -name "*.test.*" -o -name "*.spec.*" 2>/dev/null | grep -v node_modules | grep -v __pycache__

echo ""
echo "=== SOURCE CODE FILES ==="
echo "Python files:"
find . -name "*.py" 2>/dev/null | grep -v __pycache__ | head -20

echo ""
echo "JavaScript/TypeScript files:"
find . -name "*.js" -o -name "*.ts" -o -name "*.jsx" -o -name "*.tsx" 2>/dev/null | grep -v node_modules | head -20

echo ""
echo "=== README ==="
if [ -f "README.md" ]; then
    cat README.md
elif [ -f "README.rst" ]; then
    cat README.rst
elif [ -f "README.txt" ]; then
    cat README.txt
fi
