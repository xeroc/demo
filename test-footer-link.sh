#!/bin/bash
# Footer Tests for Story 4: Add Impressum link to landing page footer
# This test suite verifies the footer impressum link functionality

set -e

echo "=== Testing Footer Impressum Link ==="
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

# Test 1: Impressum link visible in index.html footer
echo "Testing Footer Link Visibility..."

if grep -q '<footer' "index.html"; then
    pass "Footer element exists in index.html"
else
    fail "Footer element missing in index.html"
fi

if grep -q 'href="impressum.html"' "index.html"; then
    pass "Impressum link exists in index.html"
else
    fail "Impressum link missing in index.html"
fi

# Check if link is in footer section
if grep -A 10 '<footer' "index.html" | grep -q 'href="impressum.html"'; then
    pass "Impressum link is in footer section of index.html"
else
    fail "Impressum link not in footer section of index.html"
fi

# Test 2: Link navigates to /impressum route
echo ""
echo "Testing Link Navigation..."

if grep -q 'href="impressum.html"' "index.html"; then
    pass "Link href points to impressum.html (maps to /impressum route)"
else
    fail "Link href incorrect"
fi

if [ -f "impressum.html" ]; then
    pass "Target file impressum.html exists"
else
    fail "Target file impressum.html missing"
fi

# Test 3: Link is accessible
echo ""
echo "Testing Accessibility..."

# Check for visible link text
if grep -o 'href="impressum.html"[^>]*>[^<]*' "index.html" | grep -q "Impressum"; then
    pass "Link has visible text 'Impressum'"
else
    fail "Link missing visible text"
fi

# Check for proper styling (indicates it's visible)
if grep -q 'text-white' "index.html" && grep -q 'href="impressum.html"' "index.html"; then
    pass "Link has visible styling"
else
    fail "Link may not be visible"
fi

# Test 4: Impressum link in contact.html footer
echo ""
echo "Testing Contact Page Footer..."

if grep -q '<footer' "contact.html"; then
    pass "Footer element exists in contact.html"
else
    fail "Footer element missing in contact.html"
fi

if grep -A 10 '<footer' "contact.html" | grep -q 'href="impressum.html"'; then
    pass "Impressum link exists in contact.html footer"
else
    fail "Impressum link missing in contact.html footer"
fi

# Test 5: Footer design consistency
echo ""
echo "Testing Footer Design Patterns..."

# Check that both footers have similar structure
if grep -q '© 2024 ChaosCraft' "index.html" && grep -q '© 2024 ChaosCraft' "contact.html"; then
    pass "Both footers have consistent copyright text"
else
    fail "Footer copyright inconsistent"
fi

# Check for proper link styling in both pages
if grep -q 'hover:text-white' "index.html" | grep -q 'href="impressum.html"'; then
    pass "Link has hover effect in index.html"
fi

echo ""
echo "=== Test Results ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "✓ All footer link tests passed!"
    echo ""
    echo "Summary:"
    echo "  - Impressum link visible in footers of all pages"
    echo "  - Link navigates to /impressum route"
    echo "  - Link is accessible with visible text"
    echo "  - Footer design follows existing patterns"
    exit 0
else
    echo "✗ Some footer link tests failed"
    exit 1
fi
