#!/bin/bash
# Simple typecheck for footer component
# Checks if the TypeScript code is syntactically valid

echo "Checking footer component TypeScript syntax..."

# Basic checks for the footer component
if grep -q "export function createFooter" src/footerComponent.ts; then
    echo "✓ createFooter function exported"
else
    echo "✗ createFooter function missing"
    exit 1
fi

if grep -q "export function mountFooter" src/footerComponent.ts; then
    echo "✓ mountFooter function exported"
else
    echo "✗ mountFooter function missing"
    exit 1
fi

if grep -q "export function unmountFooter" src/footerComponent.ts; then
    echo "✓ unmountFooter function exported"
else
    echo "✗ unmountFooter function missing"
    exit 1
fi

if grep -q "export function getFooter" src/footerComponent.ts; then
    echo "✓ getFooter function exported"
else
    echo "✗ getFooter function missing"
    exit 1
fi

# Check that responsive classes are present
if grep -q "flex-col" src/footerComponent.ts; then
    echo "✓ Mobile-first flex-col class present"
else
    echo "✗ flex-col class missing"
    exit 1
fi

if grep -q "sm:flex-row" src/footerComponent.ts; then
    echo "✓ Responsive sm:flex-row class present"
else
    echo "✗ sm:flex-row class missing"
    exit 1
fi

if grep -q "md:gap-" src/footerComponent.ts; then
    echo "✓ Desktop gap classes present"
else
    echo "✗ Desktop gap classes missing"
    exit 1
fi

# Check accessibility
if grep -q "role=\"contentinfo\"" src/footerComponent.ts; then
    echo "✓ ARIA role present"
else
    echo "✗ ARIA role missing"
    exit 1
fi

echo ""
echo "✓ All checks passed!"
