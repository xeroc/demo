#!/bin/bash
# Simple typecheck for responsive components
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

# Check accessibility - using setAttribute
if grep setAttribute src/footerComponent.ts | grep -q "role"; then
    if grep setAttribute src/footerComponent.ts | grep role | grep -q "contentinfo"; then
        echo "✓ ARIA role present"
    else
        echo "✗ ARIA role missing"
        exit 1
    fi
else
    echo "✗ ARIA role missing"
    exit 1
fi

echo ""
echo "Checking responsive utilities..."

# Check responsive utilities module
if [ -f "src/responsiveUtils.ts" ]; then
    if grep -q "export function injectResponsiveUtilities" src/responsiveUtils.ts; then
        echo "✓ injectResponsiveUtilities function exported"
    else
        echo "✗ injectResponsiveUtilities function missing"
        exit 1
    fi
    
    if grep -q "export function validateTouchTarget" src/responsiveUtils.ts; then
        echo "✓ validateTouchTarget function exported"
    else
        echo "✗ validateTouchTarget function missing"
        exit 1
    fi
    
    if grep -q "export function hasHorizontalScroll" src/responsiveUtils.ts; then
        echo "✓ hasHorizontalScroll function exported"
    else
        echo "✗ hasHorizontalScroll function missing"
        exit 1
    fi
    
    if grep -q "touch-target" src/responsiveUtils.ts; then
        echo "✓ Touch target utility class present"
    else
        echo "✗ Touch target utility class missing"
        exit 1
    fi
    
    if grep -q "text-readable" src/responsiveUtils.ts; then
        echo "✓ Text readability utility class present"
    else
        echo "✗ Text readability utility class missing"
        exit 1
    fi
    
    if grep -q "prevent-overflow-x" src/responsiveUtils.ts; then
        echo "✓ Overflow prevention utility class present"
    else
        echo "✗ Overflow prevention utility class missing"
        exit 1
    fi
else
    echo "✗ responsiveUtils.ts file not found"
    exit 1
fi

# Check main.ts integrates responsive utilities
if grep -q "injectResponsiveUtilities" src/main.ts; then
    echo "✓ Responsive utilities integrated in main.ts"
else
    echo "✗ Responsive utilities not integrated in main.ts"
    exit 1
fi

echo ""
echo "✓ All checks passed!"
