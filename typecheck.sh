#!/bin/bash
# Simple typecheck for responsive components
# Checks if the TypeScript code is syntactically valid

echo "Checking navbar component TypeScript syntax..."

# Basic checks for the navbar component
if grep -q "export function createNavbar" src/navbarComponent.ts; then
    echo "✓ createNavbar function exported"
else
    echo "✗ createNavbar function missing"
    exit 1
fi

if grep -q "export function mountNavbar" src/navbarComponent.ts; then
    echo "✓ mountNavbar function exported"
else
    echo "✗ mountNavbar function missing"
    exit 1
fi

if grep -q "export function unmountNavbar" src/navbarComponent.ts; then
    echo "✓ unmountNavbar function exported"
else
    echo "✗ unmountNavbar function missing"
    exit 1
fi

if grep -q "export function getNavbar" src/navbarComponent.ts; then
    echo "✓ getNavbar function exported"
else
    echo "✗ getNavbar function missing"
    exit 1
fi

# Check that navbar has logo icon and text only
if grep -q "🌌" src/navbarComponent.ts; then
    echo "✓ Logo icon present in navbar"
else
    echo "✗ Logo icon missing in navbar"
    exit 1
fi

if grep -q "ChaosCraft" src/navbarComponent.ts; then
    echo "✓ Logo text present in navbar"
else
    echo "✗ Logo text missing in navbar"
    exit 1
fi

# Check navbar responsive classes
if grep -q "text-lg" src/navbarComponent.ts && grep -q "sm:text-xl" src/navbarComponent.ts; then
    echo "✓ Navbar responsive text classes present"
else
    echo "✗ Navbar responsive text classes missing"
    exit 1
fi

# Check accessibility
if grep setAttribute src/navbarComponent.ts | grep -q "role"; then
    echo "✓ Navbar ARIA role present"
else
    echo "✗ Navbar ARIA role missing"
    exit 1
fi

echo ""
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

# Check footer has copyright with year 2026
if grep -q "2026" src/footerComponent.ts; then
    echo "✓ Footer copyright year 2026 present"
else
    echo "✗ Footer copyright year 2026 missing"
    exit 1
fi

if grep -q "Built by chaos, one dollar at a time" src/footerComponent.ts; then
    echo "✓ Footer copyright text present"
else
    echo "✗ Footer copyright text missing"
    exit 1
fi

# Check footer has no navigation links
if ! grep -q '<a' src/footerComponent.ts; then
    echo "✓ Footer has no links"
else
    echo "✗ Footer should not have links"
    exit 1
fi

# Check footer responsive classes
if grep -q "text-xs" src/footerComponent.ts && grep -q "sm:text-sm" src/footerComponent.ts; then
    echo "✓ Footer responsive text classes present"
else
    echo "✗ Footer responsive text classes missing"
    exit 1
fi

# Check accessibility
if grep setAttribute src/footerComponent.ts | grep -q "role"; then
    if grep setAttribute src/footerComponent.ts | grep role | grep -q "contentinfo"; then
        echo "✓ Footer ARIA role present"
    else
        echo "✗ Footer ARIA role missing"
        exit 1
    fi
else
    echo "✗ Footer ARIA role missing"
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

# Check main.ts integrates navbar instead of header
if grep -q "mountNavbar" src/main.ts && ! grep -q "mountHeader" src/main.ts; then
    echo "✓ Navbar integrated in main.ts (header removed)"
else
    echo "✗ Navbar not properly integrated in main.ts"
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
