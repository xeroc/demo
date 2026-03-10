/**
 * Random Joke Component
 * 
 * Fetches and displays a random joke from the JokeAPI below the dancing robot.
 * Includes loading state and error handling.
 */

const JOKE_API_URL = 'https://jokeapi.swastikdan.in/api/jokes';

interface JokeResponse {
  joke?: string;
  setup?: string;
  delivery?: string;
  error?: boolean;
  message?: string;
}

/**
 * Fetches a random joke from the API
 * @returns Promise<string> The joke text
 */
async function fetchJoke(): Promise<string> {
  try {
    const response = await fetch(JOKE_API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: JokeResponse = await response.json();
    
    // Handle different joke formats (single line or setup/delivery)
    if (data.error) {
      throw new Error(data.message || 'API returned an error');
    }
    
    if (data.joke) {
      return data.joke;
    }
    
    if (data.setup && data.delivery) {
      return `${data.setup} ${data.delivery}`;
    }
    
    throw new Error('Invalid joke format received');
  } catch (error) {
    console.error('Error fetching joke:', error);
    throw error;
  }
}

/**
 * Creates the joke display container element
 * @returns HTMLElement The joke container
 */
export function createJokeContainer(): HTMLElement {
  const container = document.createElement('div');
  container.id = 'joke-container';
  container.className = 'mt-6 sm:mt-8 md:mt-8 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-8 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl';
  
  // Header
  const header = document.createElement('h3');
  header.className = 'text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 text-center';
  header.innerHTML = '😄 Random Joke';
  
  // Joke text container
  const jokeText = document.createElement('p');
  jokeText.id = 'joke-text';
  jokeText.className = 'text-sm sm:text-base md:text-lg text-gray-100 text-center leading-relaxed';
  jokeText.textContent = 'Loading joke...';
  
  container.appendChild(header);
  container.appendChild(jokeText);
  
  return container;
}

/**
 * Loads and displays a random joke
 */
async function loadJoke(): Promise<void> {
  const jokeText = document.getElementById('joke-text');
  
  if (!jokeText) {
    console.error('Joke text element not found');
    return;
  }
  
  try {
    // Show loading state
    jokeText.textContent = 'Loading joke...';
    jokeText.className = 'text-sm sm:text-base md:text-lg text-gray-400 text-center leading-relaxed italic';
    
    // Fetch joke
    const joke = await fetchJoke();
    
    // Display joke
    jokeText.textContent = joke;
    jokeText.className = 'text-sm sm:text-base md:text-lg text-gray-100 text-center leading-relaxed';
  } catch (error) {
    // Show error state
    jokeText.textContent = 'Failed to load joke. Please try again later.';
    jokeText.className = 'text-sm sm:text-base md:text-lg text-red-300 text-center leading-relaxed';
  }
}

/**
 * Mounts the joke component to the specified container
 * @param containerId - The ID of the container element to mount the joke into
 */
export function mountJoke(containerId: string): void {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container with ID "${containerId}" not found`);
    return;
  }
  
  // Create and append joke container
  const jokeContainer = createJokeContainer();
  container.appendChild(jokeContainer);
  
  // Load joke after mounting
  loadJoke();
}

/**
 * Unmounts the joke component from the DOM
 */
export function unmountJoke(): void {
  const jokeContainer = document.getElementById('joke-container');
  if (jokeContainer) {
    jokeContainer.remove();
  }
}

/**
 * Gets the current joke container element
 * @returns HTMLElement | null The joke container element or null
 */
export function getJoke(): HTMLElement | null {
  return document.getElementById('joke-container');
}
