import { render, screen } from '@testing-library/react';
import { Page404 } from '../components';
import '@testing-library/jest-dom';

describe('Page404 component', () => {
  it('renders 404 and page not found text correctly', () => {
    render(<Page404 />);

    expect(screen.getByText('404')).toBeInTheDocument();

    expect(screen.getByText('page not found')).toBeInTheDocument();
  });

  it('has correct class names applied', () => {
    render(<Page404 />);

    const title = screen.getByText('404');
    expect(title).toHaveClass('title');

    const subTitle = screen.getByText('page not found');
    expect(subTitle).toHaveClass('subTitle');
  });
});
