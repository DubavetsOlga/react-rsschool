import { render } from '@testing-library/react';
import { Spinner } from '../common/components';
import '@testing-library/jest-dom';

describe('Spinner component', () => {
  it('renders the loader inside the spinner', () => {
    const { container } = render(<Spinner />);

    const loaderElement = container.querySelector('.loader');
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass('loader');
  });
});
