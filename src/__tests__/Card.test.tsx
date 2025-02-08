import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router';
import { Card, CardItem } from '../components/card/Card';
import '@testing-library/jest-dom';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

const mockNavigate = useNavigate as jest.Mock;

describe('Card Component', () => {
  const mockCardItem: CardItem = {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1',
    terrain: 'desert',
    surface_water: '1',
    population: '200000',
    residents: ['Luke Skywalker'],
    films: ['A New Hope'],
    created: '2023-02-06',
    edited: '2023-02-06',
    url: 'https://swapi.dev/api/planets/1/',
  };

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders card data correctly', () => {
    render(
      <BrowserRouter>
        <table>
          <tbody>
            <Card item={mockCardItem} />
          </tbody>
        </table>
      </BrowserRouter>
    );

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('desert')).toBeInTheDocument();
  });

  it('calls navigate with the correct parameters when row is clicked', () => {
    const mockNavigate = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <table>
          <tbody>
            <Card item={mockCardItem} />
          </tbody>
        </table>
      </BrowserRouter>
    );

    const rowElement = screen.getByText('Tatooine').closest('tr');
    if (rowElement) {
      fireEvent.click(rowElement);
    }

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/detailed',
      search: 'detail=1',
    });
  });
});
