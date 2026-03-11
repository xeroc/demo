/**
 * Countries Component
 *
 * Displays a section listing participating countries at the bottom of the page.
 */

export interface CountriesConfig {
  title?: string;
  countries?: string[];
}

export const DEFAULT_COUNTRIES_CONFIG: Required<CountriesConfig> = {
  title: '🌍 Participating Countries',
  countries: [
    'United States',
    'Germany',
    'United Kingdom',
    'Canada',
    'Australia',
    'Japan',
    'France',
    'Brazil',
    'India',
    'Netherlands'
  ]
};

/**
 * Creates a responsive countries section element
 */
export function createCountries(config: Partial<CountriesConfig> = {}): HTMLElement {
  const finalConfig = { ...DEFAULT_COUNTRIES_CONFIG, ...config };
  
  // Create container
  const container = document.createElement('section');
  container.id = 'countries-container';
  container.className = 'mt-6 sm:mt-8 md:mt-8 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-8 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl';
  
  // Header
  const header = document.createElement('h3');
  header.className = 'text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center';
  header.textContent = finalConfig.title;
  
  // Countries list
  const listContainer = document.createElement('div');
  listContainer.className = 'flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4';
  
  finalConfig.countries.forEach(country => {
    const badge = document.createElement('span');
    badge.className = 'px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 text-gray-200 rounded-full text-xs sm:text-sm md:text-base border border-white/20 transition-all duration-200 cursor-default';
    badge.textContent = country;
    listContainer.appendChild(badge);
  });
  
  container.appendChild(header);
  container.appendChild(listContainer);
  
  return container;
}

/**
 * Mounts the countries section to the specified container
 * @param containerId - The ID of the container element to mount the countries section into
 */
export function mountCountries(containerId: string = 'countries-wrapper'): void {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container with ID "${containerId}" not found`);
    return;
  }
  
  const countriesSection = createCountries();
  container.appendChild(countriesSection);
}

/**
 * Unmounts the countries component from the DOM
 */
export function unmountCountries(): void {
  const countriesContainer = document.getElementById('countries-container');
  if (countriesContainer) {
    countriesContainer.remove();
  }
}

/**
 * Gets the current countries container element
 * @returns HTMLElement | null The countries container element or null
 */
export function getCountries(): HTMLElement | null {
  return document.getElementById('countries-container');
}
