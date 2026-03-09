/**
 * Joke Service
 *
 * Fetches a random joke from the JokeAPI and displays it in the DOM.
 * API: https://jokeapi.swastikdan.in/api/jokes
 * Response: { success: boolean, jokes: [{ _id, setup, punchline, category, flags }] }
 */

export interface Joke {
  _id: string;
  setup: string;
  punchline: string;
  category: string;
  flags: Record<string, boolean>;
}

export interface JokeApiResponse {
  success: boolean;
  jokes: Joke[];
}

/**
 * Fetches a random joke from the JokeAPI
 */
export async function fetchRandomJoke(): Promise<Joke> {
  const response = await fetch('https://jokeapi.swastikdan.in/api/jokes');
  if (!response.ok) {
    throw new Error(`JokeAPI error: ${response.status} ${response.statusText}`);
  }
  const data: JokeApiResponse = await response.json();
  if (!data.success || !data.jokes || data.jokes.length === 0) {
    throw new Error('JokeAPI returned no jokes');
  }
  // Pick a random joke from the returned list
  const randomIndex = Math.floor(Math.random() * data.jokes.length);
  return data.jokes[randomIndex];
}

/**
 * Renders a joke into the container element.
 * Shows loading state while fetching, then displays setup + punchline.
 * On error, shows a fallback message.
 */
export async function mountJoke(containerId: string): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`Joke container with ID "${containerId}" not found`);
    return;
  }

  // Loading state
  container.innerHTML = `
    <div class="joke-loading text-white/60 text-sm animate-pulse">
      🤖 Loading a joke...
    </div>
  `;

  try {
    const joke = await fetchRandomJoke();
    container.innerHTML = `
      <div class="joke-card">
        <p class="joke-setup">${escapeHtml(joke.setup)}</p>
        <p class="joke-punchline">${escapeHtml(joke.punchline)}</p>
      </div>
    `;
  } catch (err) {
    console.error('Failed to fetch joke:', err);
    container.innerHTML = `
      <div class="joke-error text-white/50 text-sm italic">
        😅 Couldn't load a joke right now. The robot is working on it!
      </div>
    `;
  }
}

/**
 * Escapes HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
