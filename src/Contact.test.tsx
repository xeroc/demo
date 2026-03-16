/**
 * Tests for Contact page component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock scrollTo
window.scrollTo = vi.fn();

describe('Contact', () => {
  beforeEach(() => {
    mockFetch.mockClear();
    window.scrollTo.mockClear();
  });

  it('should render contact form with all fields', () => {
    render(<Contact />);
    
    expect(screen.getByText('Contact Us')).toBeDefined();
    expect(screen.getByLabelText(/full name/i)).toBeDefined();
    expect(screen.getByLabelText(/email address/i)).toBeDefined();
    expect(screen.getByLabelText(/subject/i)).toBeDefined();
    expect(screen.getByLabelText(/message/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /send message/i })).toBeDefined();
  });

  it('should submit form with valid data', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email address/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/subject/i), { 
      target: { value: 'Test Subject' } 
    });
    fireEvent.change(screen.getByLabelText(/message/i), { 
      target: { value: 'This is a test message content' } 
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          body: 'This is a test message content'
        })
      });
    });
  });

  it('should show success message after successful submission', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email address/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/subject/i), { 
      target: { value: 'Test Subject' } 
    });
    fireEvent.change(screen.getByLabelText(/message/i), { 
      target: { value: 'This is a test message content' } 
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you for your message/i)).toBeDefined();
    });
  });

  it('should clear form after successful submission', async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });
    
    render(<Contact />);
    
    const fullNameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email address/i) as HTMLInputElement;
    const subjectInput = screen.getByLabelText(/subject/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(/message/i) as HTMLTextAreaElement;

    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(subjectInput, { target: { value: 'Test Subject' } });
    fireEvent.change(messageInput, { target: { value: 'This is a test message content' } });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fullNameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(subjectInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('should handle submission errors gracefully', async () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    mockFetch.mockRejectedValueOnce(new Error('Network error'));
    
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email address/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/subject/i), { 
      target: { value: 'Test Subject' } 
    });
    fireEvent.change(screen.getByLabelText(/message/i), { 
      target: { value: 'This is a test message content' } 
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Error: Unable to send message. Please try again later.');
    });
    
    alertSpy.mockRestore();
  });

  it('should show loading state during submission', async () => {
    mockFetch.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ ok: true }), 100)));
    
    render(<Contact />);
    
    fireEvent.change(screen.getByLabelText(/full name/i), { 
      target: { value: 'John Doe' } 
    });
    fireEvent.change(screen.getByLabelText(/email address/i), { 
      target: { value: 'john@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/subject/i), { 
      target: { value: 'Test Subject' } 
    });
    fireEvent.change(screen.getByLabelText(/message/i), { 
      target: { value: 'This is a test message content' } 
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sending/i })).toBeDefined();
    });
  });

  it('should have required fields marked', () => {
    render(<Contact />);
    
    const fullNameInput = screen.getByLabelText(/full name/i);
    const emailInput = screen.getByLabelText(/email address/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);
    
    expect(fullNameInput.hasAttribute('required')).toBe(true);
    expect(emailInput.hasAttribute('required')).toBe(true);
    expect(subjectInput.hasAttribute('required')).toBe(true);
    expect(messageInput.hasAttribute('required')).toBe(true);
  });
});
