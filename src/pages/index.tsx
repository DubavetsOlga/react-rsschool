import { Layout } from '../components';
import { ResponseType } from '../common/types';
import { getServerSidePropsIndex } from '../common/utils';
import { GetServerSideProps } from 'next';

type HomePageProps = {
  planetsData: ResponseType | null;
  page: string;
  search: string;
  error?: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getServerSidePropsIndex(context);
};

const HomePage = ({ planetsData, error }: HomePageProps) => {
  if (error) {
    return <div>{error}</div>;
  }

  if (!planetsData) {
    return <div>No planets data available.</div>;
  }

  return <Layout planetsData={planetsData} />;
};

export default HomePage;
