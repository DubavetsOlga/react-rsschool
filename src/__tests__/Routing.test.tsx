import { render, screen } from '@testing-library/react';
import { Routing } from '../components/Routing';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';

const renderWithRouter = (initialRoute: string) => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routing />
    </MemoryRouter>
  );
};

describe('Routing Component', () => {
  it('renders the Page404 component for unknown routes', async () => {
    renderWithRouter('/nonexistent-path');

    expect(screen.getByText('page not found')).toBeInTheDocument();
  });
});
