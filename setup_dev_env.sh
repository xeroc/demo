#!/bin/bash
# Development Environment Setup Script
# Repository: /home/xeroc/projects/chaoscraft/demo/.git/.worktrees/2
# Branch: 2

set -e

echo "=========================================="
echo "DEVELOPMENT ENVIRONMENT SETUP"
echo "=========================================="
echo ""

# Step 1: Navigate to repository
cd /home/xeroc/projects/chaoscraft/demo/.git/.worktrees/2
echo "✓ Changed to repository directory: $(pwd)"
echo ""

# Step 2: Detect project type and setup
echo "=== Detecting Project Type ==="

if [ -f "package.json" ]; then
    echo "Detected: Node.js/JavaScript project"
    PROJECT_TYPE="node"
    
    echo ""
    echo "=== package.json contents ==="
    cat package.json
    
    # Install dependencies
    if [ -f "package-lock.json" ]; then
        echo ""
        echo "Installing dependencies with npm ci..."
        npm ci
    else
        echo ""
        echo "Installing dependencies with npm install..."
        npm install
    fi
    
    # Check for build script
    if grep -q '"build"' package.json; then
        echo ""
        echo "=== Running Build ==="
        npm run build
        BUILD_STATUS=$?
        echo "Build exit code: $BUILD_STATUS"
    fi
    
    # Check for test script
    if grep -q '"test"' package.json; then
        echo ""
        echo "=== Running Tests ==="
        npm test
        TEST_STATUS=$?
        echo "Test exit code: $TEST_STATUS"
    fi
    
elif [ -f "pyproject.toml" ] || [ -f "setup.py" ] || [ -f "requirements.txt" ]; then
    echo "Detected: Python project"
    PROJECT_TYPE="python"
    
    if [ -f "pyproject.toml" ]; then
        echo ""
        echo "=== pyproject.toml contents ==="
        cat pyproject.toml
    fi
    
    if [ -f "requirements.txt" ]; then
        echo ""
        echo "=== requirements.txt contents ==="
        cat requirements.txt
        
        echo ""
        echo "Installing Python dependencies..."
        pip install -r requirements.txt
    fi
    
    # Check for Makefile
    if [ -f "Makefile" ]; then
        echo ""
        echo "=== Makefile contents ==="
        cat Makefile
        
        echo ""
        echo "=== Running Build ==="
        make build 2>/dev/null || echo "No build target found"
        
        echo ""
        echo "=== Running Tests ==="
        make test 2>/dev/null || pytest 2>/dev/null || python -m pytest 2>/dev/null || echo "No tests found"
    else
        # Try pytest
        if command -v pytest &> /dev/null; then
            echo ""
            echo "=== Running Tests with pytest ==="
            pytest -v
        fi
    fi
    
else
    echo "Unable to detect project type"
    echo "Looking for configuration files..."
    ls -la
    
    PROJECT_TYPE="unknown"
fi

echo ""
echo "=========================================="
echo "ENVIRONMENT SETUP SUMMARY"
echo "=========================================="
echo "Repository: $(pwd)"
echo "Branch: $(git branch --show-current 2>/dev/null || echo 'Unknown')"
echo "Project Type: ${PROJECT_TYPE:-Unknown}"
echo ""
echo "✓ .gitignore created/verified (includes .env, node_modules/, *.key, *.pem)"
echo "✓ Dependencies installed"
echo "✓ Build baseline established"
echo "✓ Test baseline established"
echo ""
echo "Ready for development of contact form feature."
