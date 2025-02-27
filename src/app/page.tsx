import { Wrapper } from '../components';

const HomePage = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) => {
  const { page = '1', search = '' } = await searchParams;

  return <Wrapper page={page} search={search} />;
};

export default HomePage;
