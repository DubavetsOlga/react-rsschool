import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page404 from '../pages/404';

describe('Page404 Component', () => {
  it('should render the 404 page correctly', () => {
    render(<Page404 />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('should have the correct CSS classes applied', () => {
    const { container } = render(<Page404 />);

    expect(container.firstChild).toHaveClass('container');

    const title = screen.getByText('404');
    expect(title).toHaveClass('title');

    const subTitle = screen.getByText('Page Not Found');
    expect(subTitle).toHaveClass('subTitle');
  });
});
