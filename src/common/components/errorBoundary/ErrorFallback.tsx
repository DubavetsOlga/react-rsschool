import { useNavigate } from 'react-router';
import { Button } from '../button/Button';

export const ErrorFallback = ({ resetError }: { resetError: () => void }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    resetError();
  };

  return <Button onClick={handleGoHome}>Retry</Button>;
};
