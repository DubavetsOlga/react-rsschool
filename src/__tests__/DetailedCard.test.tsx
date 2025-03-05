import { render, screen, fireEvent } from '@testing-library/react';
import {
  BrowserRouter as Router,
  useSearchParams,
  useNavigate,
  redirect,
} from 'react-router';
import fetchMock from 'jest-fetch-mock';
import DetailedCard, {
  loader,
} from '../common/components/detailedCard/DetailedCard';
import { PlanetItem } from '../store/planetsApi.types';
import '@testing-library/jest-dom';

fetchMock.enableMocks();

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
  redirect: jest.fn(),
}));

global.fetch = jest.fn() as jest.Mock;

describe('DetailedCard Component', () => {
  const mockNavigate = jest.fn();
  const mockSetSearchParams = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();

    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams('detail=1'),
      mockSetSearchParams,
    ]);

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test('renders DetailedCard with data', () => {
    const mockData: PlanetItem = {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: [],
      films: [],
      created: '',
      edited: '',
      url: '',
    };

    render(
      <Router>
        <DetailedCard loaderData={mockData} />
      </Router>
    );

    expect(screen.getByText('Planet Details')).toBeInTheDocument();
    expect(screen.getByText('Name: Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Rotation Period: 23')).toBeInTheDocument();
    expect(screen.getByText('Orbital Period: 304')).toBeInTheDocument();
    expect(screen.getByText('Diameter: 10465')).toBeInTheDocument();
    expect(screen.getByText('Climate: arid')).toBeInTheDocument();
    expect(screen.getByText('Gravity: 1 standard')).toBeInTheDocument();
    expect(screen.getByText('Terrain: desert')).toBeInTheDocument();
    expect(screen.getByText('Surface Water: 1')).toBeInTheDocument();
    expect(screen.getByText('Population: 200000')).toBeInTheDocument();
  });

  test('calls navigate when Close Details button is clicked', () => {
    const mockData: PlanetItem = {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: [],
      films: [],
      created: '',
      edited: '',
      url: '',
    };

    render(
      <Router>
        <DetailedCard loaderData={mockData} />
      </Router>
    );

    const closeButton = screen.getByText('Close Details');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: '',
    });
  });

  it('should redirect when planetId is empty', async () => {
    const mockRequest = new Request('https://some-domain.com/detailed/?page=2');

    await loader({ request: mockRequest });

    expect(redirect).toHaveBeenCalledWith('https://some-domain.com/?page=2');
  });

  it('should redirect when fetch fails (non-2xx response)', async () => {
    const mockRequest = new Request(
      'https://some-domain.com/detailed/?detail=1'
    );

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await loader({ request: mockRequest });

    expect(redirect).toHaveBeenCalledWith('https://some-domain.com/');
  });

  it('should return data when fetch is successful', async () => {
    const mockRequest = new Request(
      'https://some-domain.com/detailed/?detail=1'
    );

    const mockPlanetData = {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPlanetData,
    });

    const result = await loader({ request: mockRequest });

    expect(result).toEqual(mockPlanetData);
  });
});
