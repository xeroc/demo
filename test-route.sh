#!/bin/bash
# Route Tests for Story 3: Add Impressum route to application
# This test suite verifies that the /impressum route is properly configured

set -e

echo "=== Testing Impressum Route Configuration ==="
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

# Test 1: Impressum route file exists
echo "Testing Route Configuration..."

if [ -f "impressum.html" ]; then
    pass "Impressum route file (impressum.html) exists at root level"
else
    fail "Impressum route file missing"
fi

# Test 2: Verify route is accessible (file exists and is readable)
if [ -r "impressum.html" ]; then
    pass "Impressum route is accessible (file readable)"
else
    fail "Impressum route file not readable"
fi

# Test 3: Verify route contains valid HTML
echo ""
echo "Testing Route Content..."

if grep -q "<!DOCTYPE html>" "impressum.html"; then
    pass "Route returns valid HTML5 document"
else
    fail "Route does not return valid HTML5"
fi

# Test 4: Verify navigation to impressum route exists from index.html
echo ""
echo "Testing Navigation Links..."

if grep -q 'href="impressum.html"' "index.html"; then
    pass "Navigation link to /impressum exists in index.html"
else
    fail "Navigation link to /impressum missing in index.html"
fi

# Test 5: Verify navigation to impressum route exists from contact.html
if grep -q 'href="impressum.html"' "contact.html"; then
    pass "Navigation link to /impressum exists in contact.html"
else
    fail "Navigation link to /impressum missing in contact.html"
fi

# Test 6: Verify route contains Impressum content
echo ""
echo "Testing Route Displays Impressum Component..."

if grep -q "Angaben gemäß § 5 TMG" "impressum.html"; then
    pass "Route displays company information (§ 5 TMG)"
else
    fail "Route missing company information"
fi

if grep -q "Kontakt" "impressum.html"; then
    pass "Route displays contact information"
else
    fail "Route missing contact information"
fi

if grep -q "Umsatzsteuer" "impressum.html"; then
    pass "Route displays VAT information"
else
    fail "Route missing VAT information"
fi

# Test 7: Verify route has proper navigation structure
echo ""
echo "Testing Route Navigation Structure..."

if grep -q '<nav' "impressum.html"; then
    pass "Route has navigation element"
else
    fail "Route missing navigation element"
fi

if grep -q 'href="index.html"' "impressum.html"; then
    pass "Route provides navigation back to home"
else
    fail "Route missing home link"
fi

if grep -q 'href="contact.html"' "impressum.html"; then
    pass "Route provides navigation to contact page"
else
    fail "Route missing contact link"
fi

# Test 8: Verify proper semantic structure
echo ""
echo "Testing Route Structure..."

if grep -q '<main' "impressum.html"; then
    pass "Route uses semantic HTML (main element)"
else
    fail "Route missing main element"
fi

if grep -q '<section' "impressum.html"; then
    pass "Route uses section elements for content organization"
else
    fail "Route missing section elements"
fi

# Test 9: Verify consistency with existing pages
echo ""
echo "Testing Design Consistency..."

if grep -q "bg-gradient-to-br from-purple-500" "impressum.html"; then
    pass "Route uses consistent gradient background with other pages"
else
    fail "Route gradient background inconsistent"
fi

if grep -q "cdn.tailwindcss.com" "impressum.html"; then
    pass "Route uses Tailwind CSS like other pages"
else
    fail "Route styling inconsistent"
fi

echo ""
echo "=== Test Results ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "✓ All route tests passed!"
    echo ""
    echo "Summary:"
    echo "  - Impressum route properly configured at /impressum (impressum.html)"
    echo "  - Route accessible via file-based routing"
    echo "  - Navigation links present in all pages"
    echo "  - Route displays Impressum component correctly"
    echo "  - Route follows application patterns and conventions"
    exit 0
else
    echo "✗ Some route tests failed"
    exit 1
fi
