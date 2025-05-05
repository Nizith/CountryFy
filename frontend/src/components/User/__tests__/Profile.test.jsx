import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../Profile';

/**
 * Integration Test Suite for Profile Component
 * This test suite focuses on testing the Profile component's integration with:
 * - Backend API (user operations)
 * - React Router (navigation)
 * - Local Storage (user data persistence)
 * - State Management (form handling and updates)
 */

// Mock fetch API
global.fetch = jest.fn();

// Mock the useNavigate hook
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div data-testid="motion-div" {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <div data-testid="animate-presence">{children}</div>,
}));

describe('Profile Component', () => {
  const mockUser = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();

    // Setup mock localStorage data
    localStorage.setItem('token', 'dummy-token-123');
    localStorage.setItem('name', mockUser.name);
    localStorage.setItem('email', mockUser.email);
    localStorage.setItem('id', mockUser.id);
    localStorage.setItem('role', mockUser.role);

    // Store user in users array if needed by component
    const users = [mockUser];
    localStorage.setItem('users', JSON.stringify(users));
    
    // Setup default fetch response for profile data
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: mockUser
      })
    });
  });

  /**
   * Integration Test: Profile Data Management
   * Tests the integration between:
   * - API data fetching
   * - Form state management
   * - User data updates
   * - UI feedback
   */
  test('renders profile data and handles name update', async () => {
    const mockClosePopup = jest.fn();
    
    // Mock successful update response
    global.fetch.mockImplementation((url, options) => {
      if (url.includes('/profile') && options.method === 'PUT') {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            success: true,
            data: {
              ...mockUser,
              name: 'Updated Name'
            }
          })
        });
      }
      
      return Promise.resolve({
        ok: true,
        json: async () => ({ data: mockUser })
      });
    });

    render(
      <BrowserRouter>
        <Profile closePopup={mockClosePopup} />
      </BrowserRouter>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    // Verify initial render
    expect(screen.getByText(mockUser.name)).toBeInTheDocument();
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();

    // Test name update
    const editNameButton = screen.getByTitle('Edit Name');
    fireEvent.click(editNameButton);

    const nameInput = screen.getByPlaceholderText('Name');
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

    const saveButton = screen.getByTitle('Save Name');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText('Updated Name')).toBeInTheDocument();
      expect(localStorage.getItem('name')).toBe('Updated Name');
    });
    
    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/profile'),
      expect.objectContaining({
        method: 'PUT',
        body: expect.any(String)
      })
    );
  });

  test('handles account deletion', async () => {
    const mockClosePopup = jest.fn();
    
    // Mock successful deletion response
    global.fetch.mockImplementation((url, options) => {
      if (url.includes('/profile') && options.method === 'DELETE') {
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: true })
        });
      }
      
      return Promise.resolve({
        ok: true,
        json: async () => ({ data: mockUser })
      });
    });

    render(
      <BrowserRouter>
        <Profile closePopup={mockClosePopup} />
      </BrowserRouter>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    const deleteButton = screen.getByTitle('Delete Account');
    fireEvent.click(deleteButton);

    // Verify confirmation dialog
    const confirmDialog = screen.getByText('Are you sure you want to delete your account?');
    expect(confirmDialog).toBeInTheDocument();

    // Confirm deletion
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
    });

    expect(mockClosePopup).toHaveBeenCalled();
    
    // Verify API call
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/profile'),
      expect.objectContaining({
        method: 'DELETE'
      })
    );
  });
});