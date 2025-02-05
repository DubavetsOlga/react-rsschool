import { ReactElement, useState } from 'react';
import { Button } from '../button/Button';

export const ErrorButton = (): ReactElement => {
  const [error, setError] = useState(false);

  const handleClick = (): void => {
    setError(true);
  };

  if (error) {
    throw new Error('An error occurred!');
  }

  return <Button onClick={handleClick}>Error</Button>;
};
