import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { BrowserRouter } from 'react-router';
import { CardList } from '../components/cardList/CardList';
import '@testing-library/jest-dom';
import { useFetchPlanets } from '../hooks/useFetchPlanets';

jest.mock('../hooks/useFetchPlanets');
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
}));
jest.mock('../hooks/useFetchPlanets', () => ({
  useFetchPlanets: jest.fn(),
}));

describe('CardList Component', () => {
  const mockNavigate = jest.fn();
  const mockUseSearchParams = useSearchParams as jest.Mock;
  const mockUseFetchPlanets = useFetchPlanets as jest.Mock;

  beforeEach(() => {
    mockNavigate.mockClear();
    mockUseSearchParams.mockClear();
    mockUseFetchPlanets.mockClear();
  });

  it('displays an error message if fetching fails', () => {
    mockUseFetchPlanets.mockReturnValue({
      result: {},
      loading: false,
      error: 'Something went wrong',
    });

    mockUseSearchParams.mockReturnValue([new URLSearchParams('page=1')]);

    render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );

    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  it('displays a message when no results are found', () => {
    mockUseFetchPlanets.mockReturnValue({
      result: { results: [] },
      loading: false,
      error: null,
    });

    mockUseSearchParams.mockReturnValue([new URLSearchParams('page=1')]);

    render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders the list of planets when data is loaded', () => {
    const mockPlanetData = {
      results: [
        { name: 'Earth', terrain: 'varied', url: '1' },
        { name: 'Mars', terrain: 'rocky', url: '2' },
      ],
      count: 2,
    };

    mockUseFetchPlanets.mockReturnValue({
      result: mockPlanetData,
      loading: false,
      error: null,
    });

    mockUseSearchParams.mockReturnValue([new URLSearchParams('page=1')]);

    render(
      <BrowserRouter>
        <CardList />
      </BrowserRouter>
    );

    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Mars')).toBeInTheDocument();
  });
});
