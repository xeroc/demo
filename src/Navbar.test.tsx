/**
 * Tests for Navbar component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

const renderWithRouter = (component: React.ReactNode, initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      {component}
    </MemoryRouter>
  );
};

describe('Navbar', () => {
  it('should render logo with default props', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('ChaosCraft')).toBeDefined();
    expect(screen.getByText('🌌')).toBeDefined();
  });

  it('should render custom logo text', () => {
    renderWithRouter(<Navbar logoText="CustomApp" />);
    
    expect(screen.getByText('CustomApp')).toBeDefined();
  });

  it('should render custom logo icon', () => {
    renderWithRouter(<Navbar logoIcon="🚀" />);
    
    expect(screen.getByText('🚀')).toBeDefined();
  });

  it('should render navigation links', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByRole('link', { name: /home/i })).toBeDefined();
    expect(screen.getByRole('link', { name: /contact/i })).toBeDefined();
  });

  it('should have link to home page', () => {
    renderWithRouter(<Navbar />);
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('should have link to contact page', () => {
    renderWithRouter(<Navbar />);
    
    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink.getAttribute('href')).toBe('/contact');
  });

  it('should highlight home link when on home page', () => {
    renderWithRouter(<Navbar />, '/');
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink.className).toContain('text-cyan-400');
  });

  it('should highlight contact link when on contact page', () => {
    renderWithRouter(<Navbar />, '/contact');
    
    const contactLink = screen.getByRole('link', { name: /contact/i });
    expect(contactLink.className).toContain('text-cyan-400');
  });

  it('should render with proper navigation role', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByRole('navigation')).toBeDefined();
  });
});
