/**
 * Random Joke React Component
 *
 * Fetches and displays a random joke from the JokeAPI.
 * Includes loading state, error handling, and refresh functionality.
 */

import React, { useState, useEffect, useCallback } from 'react';

const JOKE_API_URL = "https://jokeapi.swastikdan.in/api/jokes";

interface JokeResponse {
  success: boolean;
  jokes: Joke[];
}

interface Joke {
  _id: string;
  setup?: string;
  punchline?: string;
  joke?: string;
  type: string;
  category: string | null;
  flags: {
    nsfw: boolean | null;
    religious: boolean | null;
    political: boolean | null;
    racist: boolean | null;
    sexist: boolean | null;
    explicit: boolean | null;
  };
  id: number;
  lang: string;
  safe: boolean | null;
}

async function fetchJoke(): Promise<string> {
  try {
    const response = await fetch(JOKE_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: JokeResponse = await response.json();

    if (!data.success || !data.jokes || data.jokes.length === 0) {
      throw new Error("Invalid API response");
    }

    const jokeData = data.jokes[0];

    if (jokeData.joke) {
      return jokeData.joke;
    }

    if (jokeData.setup && jokeData.punchline) {
      return `${jokeData.setup} ${jokeData.punchline}`;
    }

    throw new Error("Invalid joke format received");
  } catch (error) {
    console.error("Error fetching joke:", error);
    throw error;
  }
}

const Joke: React.FC = () => {
  const [joke, setJoke] = useState<string>("Loading joke...");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadJoke = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedJoke = await fetchJoke();
      setJoke(fetchedJoke);
      setError(null);
    } catch (err) {
      setError("Failed to load joke. Please try again later.");
      setJoke("");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJoke();
  }, [loadJoke]);

  const handleRefresh = () => {
    loadJoke();
  };

  return (
    <div className="mt-6 sm:mt-8 md:mt-8 w-full max-w-2xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-8 bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 rounded-2xl backdrop-blur-sm border border-white/10 shadow-xl">
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 text-center">
        😄 Random Joke
      </h3>
      
      <p className={`text-sm sm:text-base md:text-lg text-center leading-relaxed mb-4 ${
        isLoading 
          ? 'text-gray-400 italic' 
          : error 
            ? 'text-red-300' 
            : 'text-gray-100'
      }`}>
        {isLoading ? "Loading joke..." : error || joke}
      </p>

      <div className="flex justify-center">
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg"
          aria-label="Get new joke"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading...
            </span>
          ) : (
            '🔄 New Joke'
          )}
        </button>
      </div>
    </div>
  );
};

export default Joke;
