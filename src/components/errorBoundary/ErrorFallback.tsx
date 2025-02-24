import { useRouter } from 'next/router';
import { Button } from '../button/Button';

export const ErrorFallback = ({ resetError }: { resetError: () => void }) => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
    resetError();
  };

  return <Button onClick={handleGoHome}>Retry</Button>;
};
