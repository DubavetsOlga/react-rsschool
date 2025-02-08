import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router';
import '@testing-library/jest-dom';
import { useFetchPlanets } from '../hooks/useFetchPlanets';
import { DetailedCard } from '../components/detailedCard/DetailedCard';

jest.mock('../hooks/useFetchPlanets');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('DetailedCard Component', () => {
  const mockNavigate = useNavigate as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    mockNavigate.mockClear();
    mockNavigate.mockReturnValue(mockNavigate);
    mockUseSearchParams.mockReturnValue([new URLSearchParams()]);
  });

  it('renders a loading spinner when data is loading', () => {
    (useFetchPlanets as jest.Mock).mockReturnValue({
      result: {},
      loading: true,
      error: null,
    });

    const { container } = render(<DetailedCard />);

    const loaderElement = container.querySelector('.loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });

  it('renders planet details when data is loaded', async () => {
    const mockData = {
      name: 'Earth',
      rotation_period: '24 hours',
      orbital_period: '365 days',
      diameter: '12742 km',
      climate: 'Temperate',
      gravity: '9.8 m/s²',
      terrain: 'Mountain, Desert',
      surface_water: '70%',
      population: '7 billion',
    };

    (useFetchPlanets as jest.Mock).mockReturnValue({
      result: mockData,
      loading: false,
      error: null,
    });

    render(<DetailedCard />);

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

  it('displays error message if there is an error', () => {
    (useFetchPlanets as jest.Mock).mockReturnValue({
      result: {},
      loading: false,
      error: 'Error fetching data',
    });

    render(<DetailedCard />);

    expect(screen.getByText('Error: Error fetching data')).toBeInTheDocument();
  });

  it('calls navigate to close details when the close button is clicked', async () => {
    const mockData = {
      name: 'Earth',
      rotation_period: '24 hours',
      orbital_period: '365 days',
      diameter: '12742 km',
      climate: 'Temperate',
      gravity: '9.8 m/s²',
      terrain: 'Mountain, Desert',
      surface_water: '70%',
      population: '7 billion',
    };

    (useFetchPlanets as jest.Mock).mockReturnValue({
      result: mockData,
      loading: false,
      error: null,
    });

    render(<DetailedCard />);

    const closeButton = screen.getByText('Close Details');

    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: '',
    });
  });
});
