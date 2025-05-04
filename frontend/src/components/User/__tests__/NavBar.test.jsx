import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';

// Mock the useNavigate hook
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock fetch API
global.fetch = jest.fn((url) => {
  if (url.includes('/name/India')) {
    return Promise.resolve({
      ok: true,
      json: async () => [
        {
          name: { common: 'India' },
          flags: { png: 'india-flag.png', alt: 'Flag of India' },
          cca3: 'IND'
        }
      ]
    });
  }
  return Promise.reject(new Error('Unknown API endpoint'));
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div data-testid="motion-div" {...props}>{children}</div>,
    nav: ({ children, ...props }) => <nav data-testid="motion-nav" {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }) => <div data-testid="animate-presence">{children}</div>,
}));

describe('NavBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // Setup default localStorage items
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('name', 'Test User');
    localStorage.setItem('email', 'test@example.com');
  });

  test('renders navigation elements and handles search', async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Verify navigation elements
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Independants')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search By Name...')).toBeInTheDocument();

    // Test search functionality
    const searchInput = screen.getByPlaceholderText('Search By Name...');
    fireEvent.change(searchInput, { target: { value: 'India' } });

    // Use a more specific selector for the search button
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/name/India'),
        expect.any(Object)
      );
    });

    // Verify search results
    await waitFor(() => {
      expect(screen.getByText('India')).toBeInTheDocument();
      expect(screen.getByAltText('Flag of India')).toBeInTheDocument();
    });
  });

  test('handles user profile and logout', async () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Test profile menu - use a more specific selector
    const profileButton = screen.getByRole('button', { name: /profile/i });
    fireEvent.click(profileButton);

    // Check if the profile menu is shown
    expect(screen.getByText('Profile Menu')).toBeInTheDocument();

    // Test logout - use a more specific selector
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('handles mobile menu toggle', () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Use a more specific selector for the mobile menu button
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    // Verify mobile menu appears
    expect(screen.getByText('Mobile Menu')).toBeInTheDocument();
  });
});