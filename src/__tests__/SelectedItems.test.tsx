import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { SelectedItems } from '../components';
import { Theme } from '../components/context/Theme';
import { removeAllPlanetsFromSelected } from '../store/planetSlice.ts';

jest.mock('../hooks/useAppSelector');
jest.mock('../hooks/useAppDispatch');

global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

describe('SelectedItems', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useAppSelector as jest.Mock).mockClear();
  });

  test('renders correctly when planets are selected', () => {
    const selectedPlanets = {
      planet1: {
        name: 'Earth',
        rotation_period: 24,
        diameter: 12742,
        climate: 'Temperate',
        gravity: 9.8,
        population: 7800000000,
      },
      planet2: {
        name: 'Mars',
        rotation_period: 24.6,
        diameter: 6779,
        climate: 'Arid',
        gravity: 3.7,
        population: 0,
      },
    };

    (useAppSelector as jest.Mock).mockReturnValue(selectedPlanets);

    render(
      <Theme>
        <SelectedItems />
      </Theme>
    );

    expect(screen.getByText('2 planets are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('does not render when no planets are selected', () => {
    (useAppSelector as jest.Mock).mockReturnValue({});

    render(
      <Theme>
        <SelectedItems />
      </Theme>
    );

    expect(screen.queryByText(/planets are selected/)).toBeNull();
  });

  test('unselects all planets when "Unselect all" is clicked', () => {
    const selectedPlanets = {
      planet1: {
        name: 'Earth',
        rotation_period: 24,
        diameter: 12742,
        climate: 'Temperate',
        gravity: 9.8,
        population: 7800000000,
      },
    };

    (useAppSelector as jest.Mock).mockReturnValue(selectedPlanets);

    render(
      <Theme>
        <SelectedItems />
      </Theme>
    );

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(mockDispatch).toHaveBeenCalledWith(removeAllPlanetsFromSelected());
  });

  test('downloads CSV when "Download" is clicked', () => {
    const selectedPlanets = {
      planet1: {
        name: 'Earth',
        rotation_period: 24,
        diameter: 12742,
        climate: 'Temperate',
        gravity: 9.8,
        population: 7800000000,
      },
      planet2: {
        name: 'Mars',
        rotation_period: 24.6,
        diameter: 6779,
        climate: 'Arid',
        gravity: 3.7,
        population: 0,
      },
    };

    (useAppSelector as jest.Mock).mockReturnValue(selectedPlanets);

    render(
      <Theme>
        <SelectedItems />
      </Theme>
    );

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));

    const hiddenLink = screen.getByText('Download link').closest('a');
    expect(hiddenLink).toHaveAttribute('href', 'mock-url');
    expect(hiddenLink).toHaveAttribute(
      'download',
      expect.stringContaining('_planets.csv')
    );
  });
});
