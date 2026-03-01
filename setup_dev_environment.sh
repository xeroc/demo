#!/bin/bash
# Development Environment Setup - Complete Script
# Repository: /home/xeroc/projects/chaoscraft/demo/.git/.worktrees/2
# Branch: 2
# Feature: Contact form with email to mail@example.com

set -e

REPO_DIR="/home/xeroc/projects/chaoscraft/demo/.git/.worktrees/2"
cd "$REPO_DIR"

echo "=========================================="
echo "DEVELOPMENT ENVIRONMENT SETUP"
echo "=========================================="
echo "Repository: $REPO_DIR"
echo "Branch: 2"
echo "Date: $(date)"
echo ""

# ============================================
# STEP 1: VERIFY GITIGNORE
# ============================================
echo "=== STEP 1: Verifying .gitignore ==="
if [ -f ".gitignore" ]; then
    echo "✓ .gitignore exists"
    echo "Checking for required patterns..."
    
    REQUIRED_PATTERNS=(".env" "node_modules/" "*.key" "*.pem")
    MISSING_PATTERNS=()
    
    for pattern in "${REQUIRED_PATTERNS[@]}"; do
        if grep -q "$pattern" .gitignore 2>/dev/null; then
            echo "  ✓ Found: $pattern"
        else
            echo "  ✗ Missing: $pattern"
            MISSING_PATTERNS+=("$pattern")
        fi
    done
    
    if [ ${#MISSING_PATTERNS[@]} -gt 0 ]; then
        echo "Adding missing patterns to .gitignore..."
        echo "" >> .gitignore
        echo "# Added by setup script" >> .gitignore
        for pattern in "${MISSING_PATTERNS[@]}"; do
            echo "$pattern" >> .gitignore
            echo "  ✓ Added: $pattern"
        done
    fi
else
    echo "✗ .gitignore not found - creating it..."
    cat > .gitignore << 'EOF'
# Environment files
.env
.env.local
.env.*.local

# Dependencies
node_modules/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
pip-log.txt
pip-delete-this-directory.txt
.pytest_cache/
.mypy_cache/

# Security
*.key
*.pem
*.crt
*.p12
secrets/
credentials.json

# Build outputs
dist/
build/
*.egg-info/
*.egg
.eggs/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Coverage
.coverage
htmlcov/
*.cover

# Temporary files
*.tmp
*.temp
.cache/
EOF
    echo "✓ .gitignore created"
fi
echo ""

# ============================================
# STEP 2: DETECT PROJECT TYPE AND READ CONFIGURATION
# ============================================
echo "=== STEP 2: Detecting Project Type ==="

PROJECT_TYPE=""
BUILD_CMD=""
TEST_CMD=""
INSTALL_CMD=""

if [ -f "package.json" ]; then
    echo "✓ Detected: Node.js/JavaScript project"
    PROJECT_TYPE="nodejs"
    
    echo ""
    echo "--- package.json ---"
    cat package.json
    echo ""
    
    INSTALL_CMD="npm install"
    
    # Check for build script
    if grep -q '"build"' package.json; then
        BUILD_CMD="npm run build"
        echo "✓ Build command found: npm run build"
    else
        echo "⚠ No build script found in package.json"
    fi
    
    # Check for test script
    if grep -q '"test"' package.json; then
        TEST_CMD="npm test"
        echo "✓ Test command found: npm test"
    else
        echo "⚠ No test script found in package.json"
    fi
    
elif [ -f "pyproject.toml" ]; then
    echo "✓ Detected: Python project (pyproject.toml)"
    PROJECT_TYPE="python"
    
    echo ""
    echo "--- pyproject.toml ---"
    cat pyproject.toml
    echo ""
    
    INSTALL_CMD="pip install -e ."
    
    # Check for build system
    if command -v build &> /dev/null; then
        BUILD_CMD="python -m build"
    else
        BUILD_CMD="pip wheel --no-deps -w dist ."
    fi
    
    # Check for pytest
    TEST_CMD="pytest"
    
elif [ -f "requirements.txt" ]; then
    echo "✓ Detected: Python project (requirements.txt)"
    PROJECT_TYPE="python"
    
    echo ""
    echo "--- requirements.txt ---"
    cat requirements.txt
    echo ""
    
    INSTALL_CMD="pip install -r requirements.txt"
    TEST_CMD="pytest"
    
else
    echo "⚠ Unable to detect project type"
    echo "Searching for other configuration files..."
    
    for config in Makefile setup.py Cargo.toml go.mod composer.json; do
        if [ -f "$config" ]; then
            echo "Found: $config"
        fi
    done
    
    PROJECT_TYPE="unknown"
fi
echo ""

# ============================================
# STEP 3: INSTALL DEPENDENCIES
# ============================================
echo "=== STEP 3: Installing Dependencies ==="

if [ -n "$INSTALL_CMD" ]; then
    echo "Running: $INSTALL_CMD"
    $INSTALL_CMD
    INSTALL_STATUS=$?
    
    if [ $INSTALL_STATUS -eq 0 ]; then
        echo "✓ Dependencies installed successfully"
    else
        echo "✗ Dependency installation failed with exit code: $INSTALL_STATUS"
    fi
else
    echo "⚠ No install command available for this project type"
fi
echo ""

# ============================================
# STEP 4: RUN BUILD (BASELINE)
# ============================================
echo "=== STEP 4: Running Build (Establishing Baseline) ==="

if [ -n "$BUILD_CMD" ]; then
    echo "Running: $BUILD_CMD"
    $BUILD_CMD
    BUILD_STATUS=$?
    
    if [ $BUILD_STATUS -eq 0 ]; then
        echo "✓ Build completed successfully (exit code: 0)"
        echo "✓ BUILD BASELINE ESTABLISHED"
    else
        echo "✗ Build failed with exit code: $BUILD_STATUS"
        echo "⚠ BUILD BASELINE: FAILED"
    fi
else
    echo "⚠ No build command available - skipping build step"
    echo "⚠ BUILD BASELINE: NOT APPLICABLE"
fi
echo ""

# ============================================
# STEP 5: RUN TESTS (BASELINE)
# ============================================
echo "=== STEP 5: Running Tests (Establishing Baseline) ==="

if [ -n "$TEST_CMD" ]; then
    echo "Running: $TEST_CMD"
    $TEST_CMD
    TEST_STATUS=$?
    
    if [ $TEST_STATUS -eq 0 ]; then
        echo "✓ All tests passed (exit code: 0)"
        echo "✓ TEST BASELINE ESTABLISHED"
    else
        echo "⚠ Tests completed with exit code: $TEST_STATUS"
        echo "✓ TEST BASELINE ESTABLISHED (with failures)"
    fi
else
    echo "⚠ No test command available - skipping test step"
    echo "⚠ TEST BASELINE: NOT APPLICABLE"
fi
echo ""

# ============================================
# STEP 6: CHECK CI/CD CONFIGURATION
# ============================================
echo "=== STEP 6: CI/CD Configuration ==="

if [ -d ".github/workflows" ]; then
    echo "✓ GitHub Actions detected"
    echo "Workflow files:"
    find .github/workflows -name "*.yml" -o -name "*.yaml" 2>/dev/null | while read f; do
        echo "  - $f"
    done
fi

if [ -f ".gitlab-ci.yml" ]; then
    echo "✓ GitLab CI detected (.gitlab-ci.yml)"
fi

if [ -f ".travis.yml" ]; then
    echo "✓ Travis CI detected (.travis.yml)"
fi

if [ -f "Jenkinsfile" ]; then
    echo "✓ Jenkins detected (Jenkinsfile)"
fi

if [ ! -d ".github/workflows" ] && [ ! -f ".gitlab-ci.yml" ] && [ ! -f ".travis.yml" ] && [ ! -f "Jenkinsfile" ]; then
    echo "⚠ No CI/CD configuration found"
fi
echo ""

# ============================================
# STEP 7: ANALYZE CODE PATTERNS
# ============================================
echo "=== STEP 7: Code Structure Analysis ==="

echo "Directory structure:"
find . -maxdepth 2 -type d ! -path '*/\.*' ! -path '*/node_modules/*' ! -path '*/__pycache__/*' 2>/dev/null | sort | head -20

echo ""
echo "Source files found:"
echo "  Python: $(find . -name '*.py' 2>/dev/null | grep -v __pycache__ | wc -l)"
echo "  JavaScript: $(find . -name '*.js' 2>/dev/null | grep -v node_modules | wc -l)"
echo "  TypeScript: $(find . -name '*.ts' 2>/dev/null | grep -v node_modules | wc -l)"
echo "  JSX: $(find . -name '*.jsx' 2>/dev/null | grep -v node_modules | wc -l)"
echo "  TSX: $(find . -name '*.tsx' 2>/dev/null | grep -v node_modules | wc -l)"
echo ""

# ============================================
# SUMMARY REPORT
# ============================================
echo "=========================================="
echo "ENVIRONMENT SETUP COMPLETE"
echo "=========================================="
echo ""
echo "Repository: $REPO_DIR"
echo "Branch: 2"
echo "Project Type: ${PROJECT_TYPE:-Unknown}"
echo ""
echo "Configuration Summary:"
echo "  ✓ .gitignore: Configured with required patterns"
echo "  ${INSTALL_CMD:+✓} Dependencies: ${INSTALL_CMD:-⚠ Not installed}"
echo "  ${BUILD_CMD:+✓} Build: ${BUILD_CMD:-⚠ Not available}"
echo "  ${TEST_CMD:+✓} Tests: ${TEST_CMD:-⚠ Not available}"
echo ""
echo "Build Command: ${BUILD_CMD:-N/A}"
echo "Test Command: ${TEST_CMD:-N/A}"
echo ""
echo "=========================================="
echo "READY FOR FEATURE DEVELOPMENT"
echo "=========================================="
echo ""
echo "Next steps for contact form feature:"
echo "1. Review existing code patterns and conventions"
echo "2. Create form component with fields: full name, email, subject, body"
echo "3. Implement validation for all required fields"
echo "4. Add email sending functionality to mail@example.com"
echo "5. Write tests for form validation and email functionality"
echo "6. Test the complete feature"
echo ""
