import { GetServerSideProps } from 'next';
import { Layout } from '../components';
import { ResponseType } from '../api/planetsApi.types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { page = '1', search = '' } = context.query;

  try {
    const res = await fetch(
      `https://swapi.dev/api/planets/?search=${encodeURIComponent(search as string)}&page=${page}`
    );
    const planetsData: ResponseType = await res.json();

    return {
      props: {
        planetsData,
        page,
        search,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        planetsData: null,
        page,
        search,
      },
    };
  }
};

type HomePageProps = {
  planetsData: ResponseType;
  page: string;
  search: string;
};

const HomePage = ({ planetsData }: HomePageProps) => {
  return <Layout planetsData={planetsData} />;
};

export default HomePage;
