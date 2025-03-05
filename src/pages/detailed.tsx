import { GetServerSideProps } from 'next';
import { Layout, DetailedCard } from '../components';
import { PlanetItem, ResponseType } from '../common/types';
import { getServerSidePropsDetailed } from '../common/utils';

export type DetailedPageProps = {
  planet: PlanetItem | null;
  error: string | null;
  planetsData: ResponseType | null;
};

export const getServerSideProps: GetServerSideProps<DetailedPageProps> = async (
  context
) => {
  return getServerSidePropsDetailed(context);
};

export default function DetailedPage({
  planet,
  error,
  planetsData,
}: DetailedPageProps) {
  return (
    <Layout planetsData={planetsData as ResponseType}>
      <DetailedCard planet={planet ?? ({} as PlanetItem)} error={error} />
    </Layout>
  );
}
