#!/bin/bash
# Unit Tests for Impressum Component
# Story 2: Create Impressum component

set -e

echo "=== Running Impressum Component Tests ==="
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

# Test: Impressum file exists
echo "Testing Impressum Component Structure..."

[ -f "impressum.html" ] && pass "impressum.html exists in root directory" || fail "impressum.html missing"

echo ""
echo "Testing HTML5 Structure..."

# Test: Valid HTML5
if grep -q "<!DOCTYPE html>" "impressum.html"; then
    pass "impressum.html has DOCTYPE declaration"
else
    fail "impressum.html missing DOCTYPE declaration"
fi

if grep -q "<html" "impressum.html" && grep -q "</html>" "impressum.html"; then
    pass "impressum.html has valid HTML structure"
else
    fail "impressum.html has invalid HTML structure"
fi

if grep -q "<head>" "impressum.html" && grep -q "</head>" "impressum.html"; then
    pass "impressum.html has head section"
else
    fail "impressum.html missing head section"
fi

if grep -q "<body" "impressum.html" && grep -q "</body>" "impressum.html"; then
    pass "impressum.html has body section"
else
    fail "impressum.html missing body section"
fi

if grep -q '<meta charset="UTF-8">' "impressum.html"; then
    pass "impressum.html has UTF-8 charset meta tag"
else
    fail "impressum.html missing charset meta tag"
fi

if grep -q 'viewport' "impressum.html"; then
    pass "impressum.html has viewport meta tag"
else
    fail "impressum.html missing viewport meta tag"
fi

echo ""
echo "Testing Styling..."

# Test: Uses Tailwind CSS
if grep -q "cdn.tailwindcss.com" "impressum.html"; then
    pass "impressum.html uses Tailwind CSS CDN"
else
    fail "impressum.html missing Tailwind CSS CDN"
fi

# Test: Matches gradient background pattern
if grep -q "bg-gradient-to-br" "impressum.html" && grep -q "from-purple-500" "impressum.html"; then
    pass "impressum.html matches gradient background pattern"
else
    fail "impressum.html does not match gradient background pattern"
fi

echo ""
echo "Testing Impressum Content..."

# Test: Required German legal sections
if grep -q "Impressum" "impressum.html"; then
    pass "Impressum heading present"
else
    fail "Impressum heading missing"
fi

if grep -q "Angaben gemäß § 5 TMG" "impressum.html"; then
    pass "TMG section present (§ 5 TMG)"
else
    fail "TMG section missing"
fi

if grep -q "Kontakt" "impressum.html" || grep -q "Contact" "impressum.html"; then
    pass "Contact section present"
else
    fail "Contact section missing"
fi

if grep -q "Umsatzsteuer" "impressum.html" || grep -q "VAT" "impressum.html"; then
    pass "VAT/tax information present"
else
    fail "VAT/tax information missing"
fi

if grep -q "Urheberrecht" "impressum.html" || grep -q "Copyright" "impressum.html"; then
    pass "Copyright section present"
else
    fail "Copyright section missing"
fi

if grep -q "Haftung" "impressum.html"; then
    pass "Liability section present"
else
    fail "Liability section missing"
fi

echo ""
echo "Testing Contact Information..."

if grep -q "href=\"mailto:" "impressum.html"; then
    pass "Email contact link present"
else
    fail "Email contact link missing"
fi

if grep -q "href=\"tel:" "impressum.html"; then
    pass "Telephone contact link present"
else
    fail "Telephone contact link missing"
fi

echo ""
echo "Testing Navigation..."

# Test: Has navigation links
if grep -q "href=\"index.html\"" "impressum.html"; then
    pass "Navigation link to index.html present"
else
    fail "Navigation link to index.html missing"
fi

if grep -q "href=\"contact.html\"" "impressum.html"; then
    pass "Navigation link to contact.html present"
else
    fail "Navigation link to contact.html missing"
fi

if grep -q '<nav' "impressum.html"; then
    pass "Nav element present"
else
    fail "Nav element missing"
fi

if grep -q '<footer' "impressum.html"; then
    pass "Footer element present"
else
    fail "Footer element missing"
fi

echo ""
echo "Testing Cross-Page Integration..."

# Test: Other pages link to impressum
if grep -q "href=\"impressum.html\"" "index.html"; then
    pass "index.html links to impressum.html"
else
    fail "index.html does not link to impressum.html"
fi

if grep -q "href=\"impressum.html\"" "contact.html"; then
    pass "contact.html links to impressum.html"
else
    fail "contact.html does not link to impressum.html"
fi

echo ""
echo "Testing Accessibility..."

if grep -q 'lang=' "impressum.html"; then
    pass "Language attribute present"
else
    fail "Language attribute missing"
fi

if grep -q '<main' "impressum.html"; then
    pass "Main landmark present"
else
    fail "Main landmark missing"
fi

if grep -q '<section' "impressum.html"; then
    pass "Section elements present"
else
    fail "Section elements missing"
fi

# Test: External links have security attributes
if grep -q 'target="_blank"' "impressum.html" && grep -q 'rel="noopener noreferrer"' "impressum.html"; then
    pass "External links have security attributes"
else
    fail "External links missing security attributes"
fi

echo ""
echo "=== Test Results ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "✓ All impressum component tests passed!"
    exit 0
else
    echo "✗ Some tests failed"
    exit 1
fi
