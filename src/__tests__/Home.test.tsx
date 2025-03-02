import { render } from '@testing-library/react';
import Home from '../routes/main/home';
import '@testing-library/jest-dom';

describe('Home component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Home />);

    expect(container).toBeEmptyDOMElement();
  });
});
