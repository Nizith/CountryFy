import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import CountryName from '../CountryName';

/**
 * Mixed Test Suite for CountryName Component
 * This test suite contains both unit and integration tests:
 *
 * Integration aspects:
 * - React Router integration (useParams)
 * - External REST Countries API integration
 * - Data fetching and state management
 *
 * Unit test aspects:
 * - Component rendering
 * - Error state handling
 * - Loading state management
 */

// Mock useParams for routing integration
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock fetch API
global.fetch = jest.fn();

describe('CountryName Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useParams.mockReturnValue({ name: 'IND' });
    
    // Setup the default successful response
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => [{
        name: {
          common: 'India',
          official: 'Republic of India'
        },
        flags: {
          png: 'india-flag.png',
          alt: 'Flag of India'
        },
        capital: ['New Delhi'],
        population: 1380004385,
        languages: { hin: 'Hindi', eng: 'English' },
        region: 'Asia',
        subregion: 'Southern Asia',
        continents: ['Asia'],
        area: 3287590,
        borders: ['BGD', 'BTN', 'MMR', 'CHN', 'NPL', 'PAK'],
        timezones: ['UTC+05:30'],
        landlocked: false,
        startOfWeek: 'monday',
        unMember: true,
        independent: true,
        tld: ['.in'],
        idd: { root: '+9', suffixes: ['1'] },
        maps: {
          googleMaps: 'https://goo.gl/maps/india',
          openStreetMaps: 'https://www.openstreetmap.org/india'
        }
      }]
    });
  });

  /**
   * Integration Test: Country Data Fetching and Display
   * Tests the integration between:
   * - External API calls
   * - Data transformation
   * - Component rendering with real data structure
   */
  test('renders basic country information', async () => {
    render(
      <BrowserRouter>
        <CountryName />
      </BrowserRouter>
    );

    // Check loading state
    expect(screen.getByText('Loading country data...')).toBeInTheDocument();

    // Wait for and verify data
    await waitFor(() => {
      expect(screen.getByText('India')).toBeInTheDocument();
      expect(screen.getByText('Republic of India')).toBeInTheDocument();
      expect(screen.getByText(/New Delhi/i)).toBeInTheDocument();
      expect(screen.getByText(/1,380,004,385/)).toBeInTheDocument();
    });
    
    // Verify API was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/name/IND'),
      expect.any(Object)
    );
  });

  /**
   * Unit Test: Error State Handling
   * Tests the component's ability to:
   * - Handle API errors
   * - Display error messages
   * - Manage error states
   */
  test('handles error state', async () => {
    // Override the default mock for this specific test
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <BrowserRouter>
        <CountryName />
      </BrowserRouter>
    );

    // Check loading state
    expect(screen.getByText('Loading country data...')).toBeInTheDocument();

    // Check error state
    await waitFor(() => {
      expect(screen.getByText('Failed to fetch country data')).toBeInTheDocument();
    });
  });
});