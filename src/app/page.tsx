import { Wrapper } from '../components';
import { ResponseType } from '../common/types';
import { fetchData } from '../common/utils';

const HomePage = async ({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) => {
  const { page = '1', search = '' } = await searchParams;

  let planetsData: ResponseType | null = null;
  let error: string | undefined = undefined;

  try {
    planetsData = await fetchData<ResponseType>(
      `https://swapi.dev/api/planets/?search=${encodeURIComponent(search)}&page=${page}`
    );
  } catch (e) {
    console.error(e);
    error = 'Failed to fetch planets data';
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!planetsData) {
    return <div>No planets data available.</div>;
  }

  return <Wrapper planetsData={planetsData} />;
};

export default HomePage;
