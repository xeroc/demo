/**
 * Tests for Joke React Component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Joke from './Joke';

// Mock fetch
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('Joke Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state initially', () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    
    render(<Joke />);
    
    expect(screen.getByText('Loading joke...')).toBeTruthy();
  });

  it('should fetch and display a single-line joke', async () => {
    const mockJoke = {
      success: true,
      jokes: [{
        _id: '1',
        joke: 'Why did the scarecrow win an award? Because he was outstanding in his field!',
        type: 'single',
        category: 'Misc',
        flags: { nsfw: false, religious: false, political: false, racist: false, sexist: false, explicit: false },
        id: 1,
        lang: 'en',
        safe: true
      }]
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockJoke
    });

    render(<Joke />);

    await waitFor(() => {
      expect(screen.getByText(mockJoke.jokes[0].joke!)).toBeTruthy();
    });
  });

  it('should fetch and display a two-part joke (setup + punchline)', async () => {
    const mockJoke = {
      success: true,
      jokes: [{
        _id: '2',
        setup: 'Why don\'t scientists trust atoms?',
        punchline: 'Because they make up everything!',
        type: 'twopart',
        category: 'Science',
        flags: { nsfw: false, religious: false, political: false, racist: false, sexist: false, explicit: false },
        id: 2,
        lang: 'en',
        safe: true
      }]
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockJoke
    });

    render(<Joke />);

    await waitFor(() => {
      expect(screen.getByText(`${mockJoke.jokes[0].setup} ${mockJoke.jokes[0].punchline}`)).toBeTruthy();
    });
  });

  it('should display error message when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<Joke />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load joke. Please try again later.')).toBeTruthy();
    });
  });

  it('should display error when API returns unsuccessful response', async () => {
    const mockResponse = {
      success: false,
      jokes: []
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    });

    render(<Joke />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load joke. Please try again later.')).toBeTruthy();
    });
  });

  it('should have a refresh button', () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    
    render(<Joke />);
    
    expect(screen.getByRole('button', { name: /get new joke/i })).toBeTruthy();
  });

  it('should fetch new joke when refresh button is clicked', async () => {
    const mockJoke1 = {
      success: true,
      jokes: [{
        _id: '1',
        joke: 'First joke',
        type: 'single',
        category: 'Misc',
        flags: { nsfw: false, religious: false, political: false, racist: false, sexist: false, explicit: false },
        id: 1,
        lang: 'en',
        safe: true
      }]
    };

    const mockJoke2 = {
      success: true,
      jokes: [{
        _id: '2',
        joke: 'Second joke',
        type: 'single',
        category: 'Misc',
        flags: { nsfw: false, religious: false, political: false, racist: false, sexist: false, explicit: false },
        id: 2,
        lang: 'en',
        safe: true
      }]
    };

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockJoke1
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockJoke2
      });

    render(<Joke />);

    await waitFor(() => {
      expect(screen.getByText('First joke')).toBeTruthy();
    });

    const refreshButton = screen.getByRole('button', { name: /get new joke/i });
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(screen.getByText('Second joke')).toBeTruthy();
    });
  });

  it('should disable refresh button while loading', async () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    
    render(<Joke />);
    
    const refreshButton = screen.getByRole('button', { name: /get new joke/i });
    expect((refreshButton as HTMLButtonElement).disabled).toBe(true);
  });

  it('should render the header with emoji', () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    
    render(<Joke />);
    
    expect(screen.getByText(/😄 Random Joke/)).toBeTruthy();
  });
});
