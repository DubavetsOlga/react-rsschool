import { GetServerSideProps } from 'next';
import { fetchData } from './fetchData';

export const getServerSidePropsIndex: GetServerSideProps = async (context) => {
  const { page = '1', search = '' } = context.query;

  const planetsData = await fetchData<ResponseType>(
    `https://swapi.dev/api/planets/?search=${encodeURIComponent(search as string)}&page=${page}`
  );

  if (!planetsData) {
    return {
      props: {
        planetsData: null,
        page,
        search,
        error: 'Failed to load planets data. Please try again later.',
      },
    };
  }

  return {
    props: {
      planetsData,
      page,
      search,
    },
  };
};
