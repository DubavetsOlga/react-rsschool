import { useNavigate } from 'react-router';
import { Path } from '../Routing';
import { Button } from '../button/Button';

export const ErrorFallback = ({ resetError }: { resetError: () => void }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(Path.Main);
    resetError();
  };

  return (
    <Button onClick={handleGoHome} style={{ marginTop: '10px' }}>
      Retry
    </Button>
  );
};
