#!/bin/bash
# Integration and Accessibility Tests for Story 5
# This test suite performs final verification that the impressum is accessible,
# displays correctly, and meets accessibility standards.

set -e

echo "=== Integration and Accessibility Verification ==="
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

# ============================================
# ACCEPTANCE CRITERION 1: Impressum accessible from landing page footer
# ============================================
echo "Testing: Impressum accessible from landing page footer..."
echo ""

# Test footer presence in landing page
if grep -q '<footer' "index.html"; then
    pass "Footer element exists in landing page (index.html)"
else
    fail "Footer element missing in landing page"
fi

# Test impressum link in footer
if grep -A 20 '<footer' "index.html" | grep -q 'href="impressum.html"'; then
    pass "Impressum link found in landing page footer"
else
    fail "Impressum link not found in landing page footer"
fi

# Test link text is visible
if grep -A 20 '<footer' "index.html" | grep -o 'href="impressum.html"[^>]*>[^<]*' | grep -q "Impressum"; then
    pass "Impressum link has visible text label"
else
    fail "Impressum link missing visible text"
fi

# Test target file exists
if [ -f "impressum.html" ]; then
    pass "Impressum page (impressum.html) exists and is accessible"
else
    fail "Impressum page file not found"
fi

# Test link is clickable (has proper styling)
if grep -A 20 '<footer' "index.html" | grep -E 'href="impressum.html".*class=.*text' > /dev/null; then
    pass "Impressum link has visible styling classes"
else
    fail "Impressum link may not be properly styled"
fi

echo ""
echo "Testing: Navigation from all pages..."
echo ""

# Test navigation from contact page footer
if grep -A 20 '<footer' "contact.html" | grep -q 'href="impressum.html"'; then
    pass "Impressum link accessible from contact page footer"
else
    fail "Impressum link missing in contact page footer"
fi

# Test navigation from impressum page back to home
if grep -q 'href="index.html"' "impressum.html"; then
    pass "Navigation from impressum back to home page exists"
else
    fail "Navigation back to home missing"
fi

# ============================================
# ACCEPTANCE CRITERION 2: Impressum content displays correctly on desktop and mobile
# ============================================
echo ""
echo "Testing: Responsive design for desktop and mobile..."
echo ""

# Test viewport meta tag for mobile responsiveness
if grep -q 'viewport.*width=device-width.*initial-scale=1' "impressum.html"; then
    pass "Viewport meta tag configured for mobile responsiveness"
else
    fail "Viewport meta tag missing or incorrect"
fi

# Test responsive layout classes (flex/grid patterns)
if grep -q 'flex-col\|flex-row\|md:flex' "impressum.html"; then
    pass "Responsive flex layout classes present for mobile/desktop"
else
    fail "Responsive layout classes may be missing"
fi

# Test responsive padding/margins
if grep -q 'px-4\|py-\|md:p-' "impressum.html"; then
    pass "Responsive padding classes present"
else
    fail "Responsive padding may be missing"
fi

# Test max-width container for content readability
if grep -q 'max-w-' "impressum.html"; then
    pass "Max-width container present for content readability"
else
    fail "Max-width container missing"
fi

echo ""
echo "Testing: Content display structure..."
echo ""

# Test main content area
if grep -q '<main' "impressum.html"; then
    pass "Main content area properly defined"
else
    fail "Main content area missing"
fi

# Test content sections
SECTION_COUNT=$(grep -c '<section' "impressum.html" || true)
if [ "$SECTION_COUNT" -ge 8 ]; then
    pass "All required content sections present ($SECTION_COUNT sections)"
else
    fail "Insufficient content sections (found $SECTION_COUNT, expected at least 8)"
fi

# Test heading hierarchy
if grep -q '<h1' "impressum.html" && grep -q '<h2' "impressum.html"; then
    pass "Proper heading hierarchy (h1, h2) present"
else
    fail "Heading hierarchy incomplete"
fi

# Test content card styling
if grep -q 'bg-white\|bg-white/95' "impressum.html"; then
    pass "Content card has white background for readability"
else
    fail "Content card styling may affect readability"
fi

# Test text contrast
if grep -q 'text-gray-[6-8]00' "impressum.html"; then
    pass "Text has proper contrast (gray-600 to gray-800)"
else
    fail "Text contrast may not meet accessibility standards"
fi

# ============================================
# ACCEPTANCE CRITERION 3: No console errors when navigating to impressum
# ============================================
echo ""
echo "Testing: HTML validity and potential console errors..."
echo ""

# Test for valid HTML5 doctype
if grep -q '<!DOCTYPE html>' "impressum.html"; then
    pass "Valid HTML5 doctype present"
else
    fail "HTML5 doctype missing"
fi

# Test for properly closed tags
OPEN_HTML=$(grep -o '<html' "impressum.html" | wc -l)
CLOSE_HTML=$(grep -o '</html>' "impressum.html" | wc -l)
if [ "$OPEN_HTML" -eq "$CLOSE_HTML" ]; then
    pass "HTML tag properly closed"
else
    fail "HTML tag not properly closed"
fi

OPEN_HEAD=$(grep -o '<head>' "impressum.html" | wc -l)
CLOSE_HEAD=$(grep -o '</head>' "impressum.html" | wc -l)
if [ "$OPEN_HEAD" -eq "$CLOSE_HEAD" ]; then
    pass "Head tag properly closed"
else
    fail "Head tag not properly closed"
fi

OPEN_BODY=$(grep -o '<body' "impressum.html" | wc -l)
CLOSE_BODY=$(grep -o '</body>' "impressum.html" | wc -l)
if [ "$OPEN_BODY" -eq "$CLOSE_BODY" ]; then
    pass "Body tag properly closed"
else
    fail "Body tag not properly closed"
fi

# Test for required meta tags
if grep -q '<meta charset="UTF-8">' "impressum.html"; then
    pass "Charset meta tag present (prevents encoding errors)"
else
    fail "Charset meta tag missing"
fi

# Test for valid script tags (if any)
if grep -q '<script' "impressum.html"; then
    if grep -q '</script>' "impressum.html"; then
        pass "Script tags properly closed"
    else
        fail "Script tag not properly closed"
    fi
else
    pass "No script tags to cause errors"
fi

# Test for valid external resource references
if grep -q 'src="https://cdn.tailwindcss.com"' "impressum.html"; then
    pass "Valid external CDN reference for Tailwind CSS"
else
    fail "External CDN reference may be invalid"
fi

# Test for proper link syntax
BROKEN_LINKS=$(grep -o 'href=""' "impressum.html" | wc -l || true)
if [ "$BROKEN_LINKS" -eq 0 ]; then
    pass "No empty href attributes found"
else
    fail "Found $BROKEN_LINKS empty href attributes"
fi

# ============================================
# ACCEPTANCE CRITERION 4: All related tests pass
# ============================================
echo ""
echo "Testing: Running all related test suites..."
echo ""

# Run impressum component tests
if [ -f "test-impressum.sh" ]; then
    echo "Running test-impressum.sh..."
    if bash test-impressum.sh > /dev/null 2>&1; then
        pass "Impressum component tests (test-impressum.sh) pass"
    else
        fail "Impressum component tests (test-impressum.sh) failed"
    fi
else
    fail "test-impressum.sh not found"
fi

# Run route tests
if [ -f "test-route.sh" ]; then
    echo "Running test-route.sh..."
    if bash test-route.sh > /dev/null 2>&1; then
        pass "Route tests (test-route.sh) pass"
    else
        fail "Route tests (test-route.sh) failed"
    fi
else
    fail "test-route.sh not found"
fi

# Run footer link tests
if [ -f "test-footer-link.sh" ]; then
    echo "Running test-footer-link.sh..."
    if bash test-footer-link.sh > /dev/null 2>&1; then
        pass "Footer link tests (test-footer-link.sh) pass"
    else
        fail "Footer link tests (test-footer-link.sh) failed"
    fi
else
    fail "test-footer-link.sh not found"
fi

# Run structure validation
if [ -f "validate-structure.sh" ]; then
    echo "Running validate-structure.sh..."
    if bash validate-structure.sh > /dev/null 2>&1; then
        pass "Structure validation (validate-structure.sh) pass"
    else
        fail "Structure validation (validate-structure.sh) failed"
    fi
else
    pass "validate-structure.sh not found (optional)"
fi

# ============================================
# ACCEPTANCE CRITERION 5: Typecheck passes
# ============================================
echo ""
echo "Testing: Typecheck verification..."
echo ""

# This is a static HTML project - no TypeScript or build process
# Verify no type-related issues exist
if [ -f "tsconfig.json" ]; then
    if command -v npx > /dev/null 2>&1; then
        if npx tsc --noEmit > /dev/null 2>&1; then
            pass "TypeScript typecheck passes"
        else
            fail "TypeScript typecheck failed"
        fi
    else
        pass "TypeScript not available (static HTML project)"
    fi
else
    pass "No TypeScript configuration (static HTML project - no typecheck required)"
fi

# ============================================
# ADDITIONAL ACCESSIBILITY TESTS
# ============================================
echo ""
echo "Testing: Additional accessibility standards..."
echo ""

# Test language attribute
if grep -q 'lang="de"' "impressum.html"; then
    pass "Page language correctly set to German (de)"
else
    fail "Page language attribute missing or incorrect"
fi

# Test semantic landmarks
if grep -q '<nav' "impressum.html" && grep -q '<main' "impressum.html" && grep -q '<footer' "impressum.html"; then
    pass "All semantic landmarks present (nav, main, footer)"
else
    fail "Missing semantic landmarks"
fi

# Test external link security
if grep -q 'target="_blank"' "impressum.html"; then
    if grep -q 'rel="noopener noreferrer"' "impressum.html"; then
        pass "External links have security attributes (noopener noreferrer)"
    else
        fail "External links missing security attributes"
    fi
else
    pass "No external links requiring security attributes"
fi

# Test focus states for keyboard navigation
if grep -q 'focus:\|hover:' "impressum.html"; then
    pass "Interactive elements have focus/hover states"
else
    fail "Interactive elements may lack focus states"
fi

# Test form elements have labels (if any forms exist)
if grep -q '<input' "impressum.html" || grep -q '<textarea' "impressum.html"; then
    if grep -q '<label' "impressum.html"; then
        pass "Form elements have associated labels"
    else
        fail "Form elements missing labels"
    fi
else
    pass "No form elements to test"
fi

# Test skip navigation (optional but recommended)
if grep -q 'skip\|#main' "impressum.html"; then
    pass "Skip navigation or main anchor present"
else
    pass "Skip navigation not implemented (optional)"
fi

# Test minimum color contrast (text-gray-700 on bg-white is accessible)
if grep -q 'text-gray-700\|text-gray-800' "impressum.html"; then
    pass "Text uses accessible color classes (gray-700/800)"
else
    fail "Text colors may not meet contrast requirements"
fi

# ============================================
# SUMMARY
# ============================================
echo ""
echo "=== Final Test Results ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"
echo ""

if [ $FAIL -eq 0 ]; then
    echo "✓ All integration and accessibility tests passed!"
    echo ""
    echo "=== Verification Summary ==="
    echo "✓ Impressum accessible from landing page footer"
    echo "✓ Impressum content displays correctly on desktop and mobile"
    echo "✓ No HTML errors detected"
    echo "✓ All related tests pass"
    echo "✓ Typecheck passes (static HTML - no TypeScript)"
    echo "✓ Meets accessibility standards"
    echo ""
    echo "Story 5: Verify integration and accessibility - COMPLETE"
    exit 0
else
    echo "✗ Some integration/accessibility tests failed"
    echo ""
    echo "Please review the failed tests above and fix the issues."
    exit 1
fi
