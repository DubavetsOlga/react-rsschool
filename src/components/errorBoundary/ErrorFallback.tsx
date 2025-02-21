import { useNavigate } from 'react-router';
import { Path } from '../../app/Routing';
import { Button } from '../button/Button';

export const ErrorFallback = ({ resetError }: { resetError: () => void }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(Path.Main);
    resetError();
  };

  return <Button onClick={handleGoHome}>Retry</Button>;
};
