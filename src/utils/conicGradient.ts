/**
 * Conic gradient utility module
 * Generates CSS conic-gradient strings with configurable colors and angle parameters
 */

export interface ConicGradientOptions {
  colors: string[];
  angle?: number;
}

/**
 * Validates a hex color string
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color) || /^#[0-9A-Fa-f]{3}$/.test(color);
}

/**
 * Validates an array of color strings
 */
export function validateColors(colors: string[]): boolean {
  if (!Array.isArray(colors) || colors.length === 0) {
    return false;
  }
  return colors.every(isValidHexColor);
}

/**
 * Interpolates between two hex colors
 * @param color1 - Starting color in hex format
 * @param color2 - Ending color in hex format
 * @param factor - Interpolation factor between 0 and 1
 * @returns Interpolated color in hex format
 */
export function interpolateColor(color1: string, color2: string, factor: number): string {
  // Normalize 3-digit hex to 6-digit
  const normalizeHex = (hex: string): string => {
    if (hex.length === 4) {
      return '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    return hex;
  };

  const hex1 = normalizeHex(color1);
  const hex2 = normalizeHex(color2);

  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);

  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);

  const clampedFactor = Math.max(0, Math.min(1, factor));

  const r = Math.round(r1 + (r2 - r1) * clampedFactor);
  const g = Math.round(g1 + (g2 - g1) * clampedFactor);
  const b = Math.round(b1 + (b2 - b1) * clampedFactor);

  const toHex = (n: number): string => n.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generates color stops for conic gradient
 * @param colors - Array of hex color strings
 * @returns Array of color stop strings with positions
 */
export function generateColorStops(colors: string[]): string[] {
  if (colors.length === 0) return [];
  if (colors.length === 1) return [`${colors[0]} 0%`, `${colors[0]} 100%`];

  const stops: string[] = [];
  const step = 100 / colors.length;

  colors.forEach((color, index) => {
    const position = Math.round(index * step);
    stops.push(`${color} ${position}%`);
  });

  // Add final stop at 100% to close the loop
  stops.push(`${colors[0]} 100%`);

  return stops;
}

/**
 * Creates a CSS conic-gradient string
 * @param options - Configuration options for the gradient
 * @returns Valid CSS conic-gradient string
 * @throws Error if colors array is empty or contains invalid colors
 */
export function createConicGradient(options: ConicGradientOptions): string {
  const { colors, angle = 0 } = options;

  if (!validateColors(colors)) {
    throw new Error('Invalid colors: must provide non-empty array of valid hex colors');
  }

  const colorStops = generateColorStops(colors);
  const normalizedAngle = ((angle % 360) + 360) % 360;

  return `conic-gradient(from ${normalizedAngle}deg, ${colorStops.join(', ')})`;
}

/**
 * Creates a conic gradient with interpolated intermediate colors
 * @param colors - Base colors to interpolate between
 * @param angle - Starting angle in degrees
 * @param steps - Number of steps between each color pair
 * @returns CSS conic-gradient string with interpolated colors
 */
export function createInterpolatedConicGradient(
  colors: string[],
  angle: number = 0,
  steps: number = 2
): string {
  if (!validateColors(colors)) {
    throw new Error('Invalid colors: must provide non-empty array of valid hex colors');
  }

  if (steps < 0) {
    throw new Error('Steps must be a non-negative number');
  }

  if (steps === 0) {
    return createConicGradient({ colors, angle });
  }

  const interpolatedColors: string[] = [];

  for (let i = 0; i < colors.length; i++) {
    const currentColor = colors[i];
    const nextColor = colors[(i + 1) % colors.length];

    interpolatedColors.push(currentColor);

    for (let j = 1; j <= steps; j++) {
      const factor = j / (steps + 1);
      interpolatedColors.push(interpolateColor(currentColor, nextColor, factor));
    }
  }

  return createConicGradient({ colors: interpolatedColors, angle });
}
