#!/bin/bash
# Repository Structure Validation Tests
# Story 1: Explore repository structure and identify landing page framework

set -e

echo "=== Running Repository Structure Tests ==="
echo ""

PASS=0
FAIL=0

pass() {
    echo "✓ $1"
    ((PASS++))
}

fail() {
    echo "✗ $1"
    ((FAIL++))
}

# Test: Repository Structure
echo "Testing Repository Structure..."

[ -f "index.html" ] && pass "index.html exists in root directory" || fail "index.html missing"
[ -f "contact.html" ] && pass "contact.html exists in root directory" || fail "contact.html missing"
[ -f ".gitignore" ] && pass ".gitignore file exists" || fail ".gitignore missing"
[ ! -f "package.json" ] && pass "No package.json (static HTML project)" || fail "Unexpected package.json found"
[ ! -d "node_modules" ] && pass "No node_modules directory" || fail "Unexpected node_modules found"

echo ""
echo "Testing Landing Page Framework..."

# Test: Framework identification
if grep -q "cdn.tailwindcss.com" "index.html"; then
    pass "index.html uses Tailwind CSS CDN"
else
    fail "index.html missing Tailwind CSS CDN"
fi

if grep -q "<!DOCTYPE html>" "index.html" && grep -q "</html>" "index.html"; then
    pass "index.html is valid HTML5"
else
    fail "index.html is not valid HTML5"
fi

if grep -q "<!DOCTYPE html>" "contact.html" && grep -q "</html>" "contact.html"; then
    pass "contact.html is valid HTML5"
else
    fail "contact.html is not valid HTML5"
fi

if grep -q '<form' "contact.html" && grep -q 'id="contactForm"' "contact.html"; then
    pass "contact.html has contact form"
else
    fail "contact.html missing contact form"
fi

if grep -q 'name="website"' "contact.html"; then
    pass "contact.html has honeypot spam protection"
else
    fail "contact.html missing spam protection"
fi

echo ""
echo "Testing Routing Mechanism..."

# Test: File-based routing
HTML_FILES=$(ls *.html 2>/dev/null | wc -l)
if [ "$HTML_FILES" -ge 2 ]; then
    pass "Multiple HTML pages exist (file-based routing)"
else
    fail "Expected multiple HTML pages"
fi

if [ -f "index.html" ] && [ -f "contact.html" ]; then
    pass "File-based routing confirmed (index.html, contact.html)"
else
    fail "Missing expected HTML files"
fi

echo ""
echo "Testing Documentation..."

# Test: Documentation exists
[ -f "PROGRESS.md" ] && pass "PROGRESS.md exists" || fail "PROGRESS.md missing"

if [ -f "PROGRESS.md" ]; then
    grep -q "Tech Stack" "PROGRESS.md" && pass "Tech stack documented" || fail "Tech stack not documented"
    grep -q "Tailwind CSS" "PROGRESS.md" && pass "Tailwind CSS mentioned" || fail "Tailwind CSS not mentioned"
    grep -q "Routing" "PROGRESS.md" && pass "Routing mechanism documented" || fail "Routing not documented"
fi

echo ""
echo "=== Test Results ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "✓ All tests passed!"
    exit 0
else
    echo "✗ Some tests failed"
    exit 1
fi
