import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { DetailedCard } from '../components';
import { planetReducer, planetSlice } from '../common/store/planetSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const mockPlanetData = {
  name: 'Earth',
  rotation_period: '24 hours',
  orbital_period: '365 days',
  diameter: '12742 km',
  climate: 'Temperate',
  gravity: '9.8 m/s²',
  terrain: 'Mountain, Desert',
  surface_water: '70%',
  population: '7 billion',
  residents: ['Luke Skywalker'],
  films: ['A New Hope'],
  created: '2023-02-06',
  edited: '2023-02-06',
  url: 'https://swapi.dev/api/planets/1/',
};

const store = configureStore({
  reducer: {
    [planetSlice.name]: planetReducer,
  },
});

describe('DetailedCard Component', () => {
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: mockPush,
    });
  });

  test('renders planet details when data is loaded', async () => {
    render(
      <Provider store={store}>
        <DetailedCard planet={mockPlanetData} error={null} />
      </Provider>
    );

    expect(screen.getByText('Name: Earth')).toBeInTheDocument();
    expect(screen.getByText('Rotation Period: 24 hours')).toBeInTheDocument();
    expect(screen.getByText('Orbital Period: 365 days')).toBeInTheDocument();
    expect(screen.getByText('Diameter: 12742 km')).toBeInTheDocument();
    expect(screen.getByText('Climate: Temperate')).toBeInTheDocument();
    expect(screen.getByText('Gravity: 9.8 m/s²')).toBeInTheDocument();
    expect(screen.getByText('Terrain: Mountain, Desert')).toBeInTheDocument();
    expect(screen.getByText('Surface Water: 70%')).toBeInTheDocument();
    expect(screen.getByText('Population: 7 billion')).toBeInTheDocument();
  });

  test('calls navigate to close details when the close button is clicked', async () => {
    render(
      <Provider store={store}>
        <DetailedCard planet={mockPlanetData} error={null} />
      </Provider>
    );

    const closeButton = screen.getByText('Close Details');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith('/?');
  });

  test('renders error message when there is an error', () => {
    const errorMessage = 'Planet not found';

    render(
      <Provider store={store}>
        <DetailedCard planet={null} error={errorMessage} />
      </Provider>
    );

    expect(screen.getByText('Planet Details')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText('Close Details')).toBeInTheDocument();
  });

  test('renders without planet', () => {
    render(
      <Provider store={store}>
        <DetailedCard planet={null} error={null} />
      </Provider>
    );

    expect(screen.getByText('Planet Details')).toBeInTheDocument();
    expect(screen.getByText('Close Details')).toBeInTheDocument();
  });
});
