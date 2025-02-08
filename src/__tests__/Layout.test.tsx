import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { Layout } from '../components/layout/Layout';
import '@testing-library/jest-dom';

describe('Layout Component', () => {
  test('renders Search component', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    expect(
      screen.getByPlaceholderText('Enter search term')
    ).toBeInTheDocument();
  });
});
